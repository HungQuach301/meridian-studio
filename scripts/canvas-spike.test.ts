import { test } from 'vitest';
import assert from 'node:assert/strict';
import { BENCHMARK_SPEC, BROWSER_VERSION, BROWSER_ARCHIVE_URL, PREFLIGHT_REQUIREMENTS, classifyMemory, evaluateBenchmarkAcceptance, evaluateFrameCadence, parseFfprobeVideo, parseProcStat, parseProcStatus, parseProcessRssObservation, validateBenchmarkConfig, validateBenchmarkPreflight, validateRunAuthorization, reconcileObserverEvents, verifyObserverCapability, singleLocalNavigation, observeActiveProcessRestarts } from './canvas-spike.js';
import type { BenchmarkAcceptanceEvidence, BenchmarkPreflight, EvidenceReference, MemoryEvidence, MemorySample, ProcessChange, ProcessRss, RenderAcceptanceEvidence } from './canvas-spike.js';

const MiB = 1024 * 1024;

test('a navigation failure cannot trigger a second request through Remotion retry tokens', async () => {
  for (const message of ['ECONNRESET', 'ERR_CONNECTION_TIMED_OUT', 'Target closed']) {
    let calls = 0;
    const failures: string[] = [];
    const navigate = singleLocalNavigation(async (_options: {url: string}) => {calls++; throw new Error(message);}, reason => failures.push(reason));
    await assert.rejects(navigate({url: 'http://localhost:3000'}), /cannot be retried/);
    await assert.rejects(navigate({url: 'http://localhost:3000'}), /policy stopped/);
    assert.equal(calls, 1); assert.equal(failures.length, 2);
  }
});

test('navigation rejects external destinations and HTTP 503 before renderer retry logic', async () => {
  let calls = 0;
  const navigate = singleLocalNavigation(async (_options: {url: string}) => {calls++; return {status: () => 503};}, () => undefined);
  await assert.rejects(navigate({url: 'https://example.com'}), /policy stopped/);
  assert.equal(calls, 0);
  await assert.rejects(navigate({url: 'http://127.0.0.1:3000'}), /cannot be retried/);
  await assert.rejects(navigate({url: 'http://127.0.0.1:3000'}), /policy stopped/);
  assert.equal(calls, 1);
});

test('successful local navigation still prohibits a second page load', async () => {
  let calls = 0;
  const navigate = singleLocalNavigation(async (_options: {url: string}) => {calls++; return {status: () => 200};}, () => undefined);
  assert.equal((await navigate({url: 'http://localhost:3000'})).status(), 200);
  await assert.rejects(navigate({url: 'http://localhost:3000'}), /policy stopped/);
  assert.equal(calls, 1);
});

test('active process replacement cannot be recorded as zero restarts', () => {
  const process = (pid: number): ProcessRss => ({pid, startTimeTicks: String(pid * 10), parentPid: 1, role: 'renderer', rssBytes: MiB});
  const samples: MemorySample[] = [1, 300, 301].map((frame, i) => ({timestampMs: i * 250, completedFrames: frame,
    rootProcess: {pid: 1, startTimeTicks: '10'}, treeComplete: true, processes: [process(20)]}));
  assert.deepEqual(observeActiveProcessRestarts(samples), {complete: true, count: 0, reasons: []});
  assert.equal(observeActiveProcessRestarts([...samples.slice(0, 2), {...samples[2]!, processes: [process(21)]}]).count, 1);
  assert.equal(observeActiveProcessRestarts(samples.map(sample => ({...sample, processes: []}))).complete, false);
  assert.equal(observeActiveProcessRestarts([]).complete, false);
});

const dispatchContext = {repository: 'HungQuach301/meridian-studio', actor: 'HungQuach301',
  eventName: 'workflow_dispatch', attempt: '1', sourceCommitSha: 'a'.repeat(40), ref: 'refs/heads/main'};
function runtimeAuthorization(): Record<string, unknown> {
  const approval = {id: 'owner-reviewed-evidence', sha256: 'b'.repeat(64)};
  return {schema: 'WP-004a-run-v1', repository: dispatchContext.repository, sourceCommitSha: dispatchContext.sourceCommitSha,
    benchmarkId: 'wp004a-reviewed-attempt', configuration: BENCHMARK_SPEC, attempt: 1,
    limits: {maximumJobMinutes: 75, maximumCostUsd: 10}, costUpperBoundUsd: 8,
    approvals: {benchmark: approval, browser: approval, license: approval, cost: approval, storage: approval},
    browser: {archiveUrl: BROWSER_ARCHIVE_URL, archiveSha256: 'c'.repeat(64), version: BROWSER_VERSION, sha256: 'd'.repeat(64)},
    releaseId: 1, lockfileSha256: 'e'.repeat(64)};
}

test('runtime admission requires the owner manual event, main source and first attempt', () => {
  assert.equal(validateRunAuthorization(runtimeAuthorization(), dispatchContext).valid, true);
  for (const override of [{actor: 'another-user'}, {repository: 'HungQuach301/another-repo'},
    {eventName: 'push'}, {attempt: '2'}, {ref: 'refs/heads/wp/WP-004a-canvas-spike'}, {sourceCommitSha: 'f'.repeat(40)}]) {
    assert.equal(validateRunAuthorization(runtimeAuthorization(), {...dispatchContext, ...override}).valid, false);
  }
});

test('runtime admission rejects changed scene, missing approvals, substituted browser and uncovered cost', () => {
  const cases: Record<string, unknown>[] = [
    {configuration: {...BENCHMARK_SPEC, blurPx: 0}}, {attempt: 2}, {releaseId: 0},
    {lockfileSha256: 'unverified'}, {approvals: {}}, {costUpperBoundUsd: 11},
    {limits: {maximumJobMinutes: 76, maximumCostUsd: 10}},
    {limits: {maximumJobMinutes: 1.5, maximumCostUsd: 10}},
    {browser: {archiveUrl: 'https://example.com/browser.zip', version: BROWSER_VERSION, sha256: 'a'.repeat(64), archiveSha256: 'a'.repeat(64)}},
  ];
  for (const override of cases) assert.equal(validateRunAuthorization({...runtimeAuthorization(), ...override}, dispatchContext).valid, false);
  assert.equal(validateRunAuthorization(null, dispatchContext).valid, false);
});

function observerEvents(): Record<string, unknown>[] {
  return [
    {type: 'change', timestampMs: 10, pid: 100, startTimeTicks: '1000', change: 'start', reason: 'kernel exec'},
    {type: 'sample', timestampMs: 11, completedFrames: 0, rootProcess: {pid: 100, startTimeTicks: '1000'}, treeComplete: true,
      processes: [{pid: 100, startTimeTicks: '1000', parentPid: 50, role: 'browser', rssBytes: 100 * MiB}]},
    {type: 'ready', timestampMs: 12, pid: 100},
    {type: 'sample', timestampMs: 19, completedFrames: 5400, rootProcess: {pid: 100, startTimeTicks: '1000'}, treeComplete: true,
      processes: [{pid: 100, startTimeTicks: '1000', parentPid: 50, role: 'browser', rssBytes: 100 * MiB}]},
    {type: 'closing', timestampMs: 20, expectedFinalClose: true},
    {type: 'cleanup-signal', timestampMs: 21, pid: 100, startTimeTicks: '1000', signal: 9},
    {type: 'exit-pending', timestampMs: 22, pid: 100, startTimeTicks: '1000', waitStatus: 9, exitCode: null, signal: 9},
    {type: 'exit', timestampMs: 23, pid: 100, startTimeTicks: '1000', waitStatus: 9, exitCode: null, signal: 9, expected: true},
    {type: 'summary', timestampMs: 24, complete: true, crashedProcesses: 0, expectedFinalCloseExcluded: true},
  ];
}

test('lifecycle reconciliation distinguishes deliberate final close from crashes', () => {
  assert.equal(reconcileObserverEvents(observerEvents()).complete, true);
  const events = observerEvents().map(event => event.type === 'closing' ? {...event, expectedFinalClose: false}
    : event.type === 'exit' ? {...event, expected: false}
      : event.type === 'summary' ? {...event, crashedProcesses: 1, expectedFinalCloseExcluded: false} : event);
  const result = reconcileObserverEvents(events);
  assert.equal(result.complete, true); assert.equal(result.crashedProcesses, 1); assert.equal(result.expectedFinalCloseExcluded, false);
});

test('lifecycle reconciliation rejects missing, duplicate, mismatched and late events', () => {
  const original = observerEvents();
  for (const events of [original.slice(0, -1), original.filter(e => e.type !== 'ready'),
    original.map(e => e.type === 'exit' ? {...e, startTimeTicks: 'different'} : e),
    [...original.slice(0, -1), original.find(e => e.type === 'exit'), original.at(-1)],
    [...original, {type: 'fatal', timestampMs: 25, reason: 'observer lost coverage'}],
    original.map(e => e.type === 'summary' ? {...e, crashedProcesses: 1} : e),
    original.map(e => e.type === 'closing' ? {...e, expectedFinalClose: false} : e),
    original.filter(e => !(e.type === 'sample' && e.completedFrames === 5400)),
  ]) assert.equal(reconcileObserverEvents(events).complete, false);
});

/** Authored events exercise bookkeeping only; these are not Chromium measurements. */
function fullObserverEvents(): Record<string, unknown>[] {
  const samples = evidence().samples.map(sample => ({...sample, type: 'sample', timestampMs: sample.timestampMs + 10}));
  const processes = samples[0]!.processes;
  const events: Record<string, unknown>[] = processes.map((process, index) => ({type: 'change', timestampMs: index + 1,
    pid: process.pid, startTimeTicks: process.startTimeTicks, change: 'start', reason: 'synthetic initial identity'}));
  events.push({type: 'ready', timestampMs: 5, pid: 100}, ...samples);
  let time = samples.at(-1)!.timestampMs;
  events.push({type: 'closing', timestampMs: ++time, expectedFinalClose: true});
  for (const process of processes) events.push({type: 'cleanup-signal', timestampMs: ++time,
    pid: process.pid, startTimeTicks: process.startTimeTicks, signal: 9});
  // Children exit first while the root is still observable.
  for (const process of [...processes.slice(1), processes[0]!]) {
    const terminal = {pid: process.pid, startTimeTicks: process.startTimeTicks, waitStatus: 9, exitCode: null, signal: 9};
    events.push({type: 'exit-pending', timestampMs: ++time, ...terminal},
      {type: 'exit', timestampMs: ++time, ...terminal, expected: true});
  }
  events.push({type: 'summary', timestampMs: ++time, complete: true, crashedProcesses: 0, expectedFinalCloseExcluded: true});
  return events;
}

test('expected multi-process cleanup keeps the complete pre-close RAM timeline unchanged', () => {
  const events = fullObserverEvents();
  const result = reconcileObserverEvents(events);
  assert.equal(result.complete, true, result.reasons.join('; '));
  assert.equal(result.crashedProcesses, 0);
  assert.equal(result.expectedFinalCloseExcluded, true);
  assert.equal(result.memory.samples.length, 541);
  assert.equal(result.memory.samples[0]!.completedFrames, 0);
  assert.equal(result.memory.samples.at(-1)!.completedFrames, 5400);
  const ram = classifyMemory(result.memory);
  assert.equal(ram.classification, 'PASS', ram.reasons.join('; '));
  assert.equal(ram.windows.length, 18);
});

test('a post-close RSS sample cannot contaminate RAM or silently establish valid coverage', () => {
  const events = fullObserverEvents();
  const exitIndex = events.findIndex(event => event.type === 'exit');
  const finalSample = reconcileObserverEvents(events).memory.samples.at(-1)!;
  events.splice(exitIndex + 1, 0, {...finalSample, type: 'sample', timestampMs: Number(events[exitIndex]!.timestampMs) + 0.5,
    processes: finalSample.processes.filter(process => process.pid !== 101)});
  const result = reconcileObserverEvents(events);
  assert.equal(result.complete, false);
  assert.match(result.reasons.join('; '), /RSS sample appeared after/);
  assert.equal(result.memory.samples.length, 541);
  assert.equal(classifyMemory(result.memory).classification, 'PASS');
});

test('a final-close label cannot exempt SIGSEGV or a nonzero exit code', () => {
  for (const termination of [{waitStatus: 11, signal: 11, exitCode: null}, {waitStatus: 7 << 8, signal: null, exitCode: 7}]) {
    const events = fullObserverEvents().map(event => event.pid === 101 && (event.type === 'exit' || event.type === 'exit-pending')
      ? {...event, ...termination} : event);
    const result = reconcileObserverEvents(events);
    assert.equal(result.complete, false);
    assert.equal(result.crashedProcesses, 1);
    assert.match(result.reasons.join('; '), /Exit exclusion disagrees/);
  }
});

test('an exit committed before cleanup remains a crash even when both signals are SIGKILL', () => {
  for (const terminal of [{waitStatus: 9, signal: 9, exitCode: null}, {waitStatus: 11, signal: 11, exitCode: null},
    {waitStatus: 7 << 8, signal: null, exitCode: 7}]) {
    const events = fullObserverEvents().filter(event => !(event.type === 'exit-pending' && event.pid === 101));
    const closeIndex = events.findIndex(event => event.type === 'closing');
    events.splice(closeIndex, 0, {type: 'exit-pending', timestampMs: Number(events[closeIndex]!.timestampMs) - 0.5,
      pid: 101, startTimeTicks: '1210', ...terminal});
    const result = reconcileObserverEvents(events.map(event => event.type === 'exit' && event.pid === 101
      ? {...event, ...terminal, expected: false} : event.type === 'summary' ? {...event, crashedProcesses: 1} : event));
    assert.equal(result.complete, true, result.reasons.join('; '));
    assert.equal(result.crashedProcesses, 1);
    assert.equal(classifyMemory(result.memory).classification, 'PASS');
  }
});

test('a kernel exit cause stays visible if the later terminal event is missing or disagrees', () => {
  const events = fullObserverEvents().map(event => event.type === 'exit-pending' && event.pid === 101
    ? {...event, waitStatus: 11, signal: 11} : event);
  for (const candidate of [events, events.filter(event => !(event.type === 'exit' && event.pid === 101))]) {
    const result = reconcileObserverEvents(candidate);
    assert.equal(result.complete, false);
    assert.equal(result.crashedProcesses, 1);
  }
});

test('cleanup exclusion requires matching identity, signal receipt, exit stop and terminal wait word', () => {
  const original = observerEvents();
  const cases = [original.filter(event => event.type !== 'cleanup-signal'), original.filter(event => event.type !== 'exit-pending'),
    original.map(event => event.type === 'cleanup-signal' ? {...event, startTimeTicks: '1001'} : event),
    original.map(event => event.type === 'exit-pending' ? {...event, waitStatus: 11} : event),
    original.map(event => event.type === 'exit' ? {...event, waitStatus: 0, exitCode: 0, signal: null} : event),
    original.map(event => event.type === 'exit' ? {...event, waitStatus: 65536} : event),
    original.map(event => event.type === 'cleanup-signal' ? {...event, timestampMs: 9} : event),
  ];
  for (const events of cases) assert.equal(reconcileObserverEvents(events).complete, false);
});

test.runIf(process.env.GITHUB_ACTIONS === 'true')('Linux observer captures Node fork/exec roles, a deliberate crash and multi-process final cleanup without browser', async () => {
  const result = await verifyObserverCapability();
  assert.equal(result.complete, true);
  assert.equal(result.crashedProcesses, 1);
  assert.equal(result.expectedFinalCloseExcluded, true);
  assert.ok(result.memory.processChanges.some(change => change.change === 'exec' && change.previousRole === 'other' && change.role === 'renderer'));
  assert.ok(result.memory.processChanges.some(change => change.change === 'exec' && change.previousRole === 'other' && change.role === 'gpu'));
}, 10000);

test('all 5400 scene models retain object identities and the authored dataset', async () => {
  const {getFrameModel} = await import('../genres/data-explainer/canvas-spike.js');
  const first = getFrameModel(0, 'dynamic');
  const identities = first.marks.map(mark => ({id: mark.id, valueId: mark.valueId, value: mark.value}));
  assert.equal(new Set(identities.map(mark => mark.id)).size, 15);
  for (let frame = 0; frame < 5400; frame++) {
    const model = getFrameModel(frame, 'dynamic');
    assert.deepEqual(model.marks.map(mark => ({id: mark.id, valueId: mark.valueId, value: mark.value})), identities);
    assert.ok(model.marks.every(mark => Number.isFinite(mark.x) && Number.isFinite(mark.y) && mark.width > 0 && mark.height > 0));
    assert.ok(Number.isFinite(model.camera.x) && Number.isFinite(model.camera.y) && model.camera.scale > 0);
  }
});

test('static models freeze geometry, while only the morph region changes chart geometry', async () => {
  const {getFrameModel} = await import('../genres/data-explainer/canvas-spike.js');
  assert.deepEqual(getFrameModel(5399, 'static'), getFrameModel(0, 'static'));
  const before = getFrameModel(3000, 'dynamic'); const after = getFrameModel(3300, 'dynamic');
  assert.equal(before.morphProgress, 0); assert.equal(after.morphProgress, 1);
  for (const mark of after.marks) {
    const original = before.marks.find(candidate => candidate.id === mark.id);
    assert.ok(original);
    if (mark.id.startsWith('morph-')) {
      assert.equal(mark.width, 24); assert.equal(mark.height, 24); assert.equal(mark.value, original.value);
    } else assert.deepEqual(mark, original);
  }
});

function procStat(state = 'S', start = '9007199254740993123', parent = 50, pid = 100): string {
  const fields = Array.from({ length: 50 }, () => '0');
  fields[0] = state; fields[1] = String(parent); fields[19] = start; fields[20] = '1048576'; fields[21] = '99';
  return `${pid} (chrome ) worker) ${fields.join(' ')}\n`;
}

function procStatus(state = 'S', rss = '1234 kB', parent = 50, pid = 100): string {
  return `Name:\tchrome\nState:\t${state} (synthetic)\nTgid:\t${pid}\nPid:\t${pid}\nPPid:\t${parent}\nVmHWM:\t999999 kB\nVmRSS:\t${rss}\n`;
}

function procObservation(): Record<string, unknown> {
  return { expectedIdentity: { pid: 100, startTimeTicks: '9007199254740993123' }, role: 'browser',
    statBefore: procStat(), status: procStatus(), statAfter: procStat('R') };
}

function ffprobeFixture(includeFrames = true): Record<string, unknown> {
  return { streams: [{ index: 0, codec_type: 'video', width: 1920, height: 1080, nb_read_frames: '5400',
    avg_frame_rate: '30/1', r_frame_rate: '30/1', time_base: '1/15360', duration_ts: 2764800 }],
  format: { duration: '180.000000' },
  ...(includeFrames ? { frames: Array.from({ length: 5400 }, (_, index) => ({ media_type: 'video', stream_index: 0, pts: index * 512, duration: 512 })) } : {}) };
}

test('proc stat preserves spaced commands with closing parentheses and exact large start times', () => {
  const parsed = parseProcStat(procStat());
  assert.equal(parsed.valid, true);
  assert.equal(parsed.value?.command, 'chrome ) worker');
  assert.equal(parsed.value?.startTimeTicks, '9007199254740993123');
  assert.equal(parsed.value?.rssPages, '99');
  for (const invalid of [null, '', '100 chrome S 50', procStat().replace(' 9007199254740993123 ', ' NaN '),
    procStat().replace('100 (', '9007199254740993 ('), procStat().slice(0, 40)]) assert.equal(parseProcStat(invalid).valid, false);
});

test('proc status measures current VmRSS only with exact binary kB conversion', () => {
  assert.equal(parseProcStatus(procStatus()).value?.rssBytes, 1234 * 1024);
  for (const invalid of [procStatus().replace('VmRSS:', 'VmPeak:'), procStatus('S', '1 MB'), procStatus('S', '1.5 kB'),
    procStatus('S', '9007199254740991 kB'), procStatus() + 'VmRSS:\t5 kB\n', procStatus().replace('Pid:\t100', 'Pid:\t-1')]) {
    assert.equal(parseProcStatus(invalid).valid, false);
  }
});

test('cross-read proc identity allows sleeping/running transitions without claiming tree or crash coverage', () => {
  const result = parseProcessRssObservation(procObservation());
  assert.equal(result.valid, true);
  assert.equal(result.value?.process.rssBytes, 1234 * 1024);
  assert.equal(result.value?.treeComplete, false);
  assert.equal(result.value?.crashObservationComplete, false);
});

test('cross-read proc PID reuse, parent races, thread identities and missing reads are inconclusive evidence', () => {
  for (const change of [
    { statAfter: procStat('S', '9007199254740993124') }, { statBefore: procStat('S', '9007199254740993122') },
    { statAfter: procStat('S', undefined, 51) }, { status: procStatus('S', undefined, 51) },
    { status: procStatus().replace('Tgid:\t100', 'Tgid:\t99') }, { status: procStatus('S', undefined, 50, 101) },
    { statAfter: null }, { status: null }, { expectedIdentity: { pid: 100, startTimeTicks: '1200' } },
  ]) assert.equal(parseProcessRssObservation({ ...procObservation(), ...change }).valid, false);
});

test('proc zombie/dead states at any read and zero-RSS browser roots never become live samples', () => {
  for (const state of ['Z', 'X', 'x']) {
    for (const change of [{ statBefore: procStat(state) }, { status: procStatus(state) }, { statAfter: procStat(state) }]) {
      assert.equal(parseProcessRssObservation({ ...procObservation(), ...change }).valid, false);
    }
  }
  assert.equal(parseProcessRssObservation({ ...procObservation(), status: procStatus('S', '0 kB') }).valid, false);
  assert.equal(parseProcessRssObservation({ ...procObservation(), role: 'utility', status: procStatus('S', '0 kB') }).valid, true);
});

test('ffprobe retains exact rates, stream ticks and separately parsed whole-container duration', () => {
  const result = parseFfprobeVideo(JSON.stringify(ffprobeFixture()), 0, '');
  assert.equal(result.valid, true);
  assert.equal(result.value?.decodedFrameCount, 5400);
  assert.deepEqual(result.value?.duration, { numerator: '2764800', denominator: '15360' });
  assert.deepEqual(result.value?.containerDuration, { numerator: '180000000', denominator: '1000000' });
  assert.equal(result.value?.containerDurationMatchesVideo, true);
  assert.equal(result.value?.cadenceVerified, true);
});

test('average FPS and stream duration without decoded frame records cannot prove cadence or container duration', () => {
  const input = ffprobeFixture(false);
  delete input.format;
  const result = parseFfprobeVideo(JSON.stringify(input), 0, '');
  assert.equal(result.valid, true);
  assert.equal(result.value?.cadenceVerified, false);
  assert.equal(result.value?.cadence.classification, 'INCONCLUSIVE');
  assert.equal(result.value?.containerDuration, null);
  const inconsistent = parseFfprobeVideo(JSON.stringify({ ...input, format: { duration: '181.000000' } }), 0, '');
  assert.equal(inconsistent.value?.containerDurationMatchesVideo, false);
});

test('ffprobe failures, diagnostics, malformed JSON and ambiguous streams cannot establish inspection', () => {
  const text = JSON.stringify(ffprobeFixture(false));
  for (const [stdout, exitCode, stderr] of [[text, 1, ''], [text, null, ''], [text, 0, 'decode warning'], ['{', 0, ''],
    [JSON.stringify({ ...ffprobeFixture(false), error: {} }), 0, ''], [JSON.stringify({ streams: [] }), 0, ''],
    [JSON.stringify({ streams: [{ codec_type: 'video' }, { codec_type: 'video' }] }), 0, '']] as const) {
    assert.equal(parseFfprobeVideo(stdout, exitCode, stderr).valid, false);
  }
});

test('ffprobe never substitutes metadata frame count, rounded durations or unsafe numeric integers', () => {
  const fixture = ffprobeFixture(false);
  const streams = fixture.streams as Record<string, unknown>[];
  const stream = streams[0];
  assert.ok(stream);
  for (const change of [{ nb_read_frames: undefined, nb_frames: '5400' }, { avg_frame_rate: '0/0' },
    { duration_ts: undefined, duration: '180.000000' }, { duration_ts: Number.MAX_SAFE_INTEGER + 1 }, { time_base: '1/0' }]) {
    assert.equal(parseFfprobeVideo(JSON.stringify({ ...fixture, streams: [{ ...stream, ...change }] }), 0, '').valid, false);
  }
});

test('ffprobe rejects wrong-stream frames, missing PTS, count disagreement and unknown frame duration', () => {
  const fixture = ffprobeFixture();
  const frames = fixture.frames as Record<string, unknown>[];
  const first = frames[0];
  assert.ok(first);
  for (const change of [{ stream_index: 1 }, { pts: undefined, best_effort_timestamp: 0 }, { duration: undefined }]) {
    assert.equal(parseFfprobeVideo(JSON.stringify({ ...fixture, frames: [{ ...first, ...change }, ...frames.slice(1)] }), 0, '').valid, false);
  }
  assert.equal(parseFfprobeVideo(JSON.stringify({ ...fixture, frames: frames.slice(1) }), 0, '').valid, false);
  const unknown = parseFfprobeVideo(JSON.stringify({ ...fixture, frames: [{ ...first, duration: 0 }, ...frames.slice(1)] }), 0, '');
  assert.equal(unknown.value?.cadence.classification, 'INCONCLUSIVE');
});

test('cadence validates exact large integer presentation timestamps independently of clock origin', () => {
  const timing = acceptanceRecord().renders[0]?.mp4.frameTiming;
  assert.ok(timing);
  const shifted = { ...timing, presentationTimestamps: timing.presentationTimestamps.map((pts) => String(BigInt(pts) + 9007199254740993123n)) };
  assert.equal(evaluateFrameCadence(shifted).classification, 'PASS');
  const equivalentBase = { ...timing, timeBase: { numerator: '2', denominator: '30720' } };
  assert.equal(evaluateFrameCadence(equivalentBase).classification, 'PASS');
});

test('constant average FPS cannot hide duplicate, reversed or variable presentation gaps or frame durations', () => {
  const input = acceptanceRecord();
  for (const change of [
    (timing: RenderAcceptanceEvidence['mp4']['frameTiming']) => ({ ...timing, presentationTimestamps: timing.presentationTimestamps.map((pts, index) => index === 2 ? '512' : pts) }),
    (timing: RenderAcceptanceEvidence['mp4']['frameTiming']) => ({ ...timing, presentationTimestamps: timing.presentationTimestamps.map((pts, index) => index === 2 ? '0' : pts) }),
    (timing: RenderAcceptanceEvidence['mp4']['frameTiming']) => ({ ...timing, presentationTimestamps: timing.presentationTimestamps.map((pts, index) => index === 2 ? '1025' : pts) }),
    (timing: RenderAcceptanceEvidence['mp4']['frameTiming']) => ({ ...timing, durations: timing.durations.map((duration, index) => index === 5399 ? '511' : duration) }),
  ]) {
    const changed = changeRender(input, 'dynamic', (render) => ({ ...render, mp4: { ...render.mp4, frameTiming: change(render.mp4.frameTiming) } }));
    const result = evaluateBenchmarkAcceptance(changed);
    assert.equal(result.classification, 'FAIL');
    assert.equal(result.gates.find((gate) => gate.name === 'dynamic.frame-cadence')?.classification, 'FAIL');
    assert.equal(result.opensWp005, false);
  }
});

test('missing or malformed per-frame evidence leaves acceptance inconclusive despite matching metadata', () => {
  const input = acceptanceRecord();
  const first = input.renders[0];
  assert.ok(first);
  const timing = first.mp4.frameTiming;
  for (const frameTiming of [undefined, { ...timing, presentationTimestamps: timing.presentationTimestamps.slice(1) },
    { ...timing, presentationTimestamps: Array(5400) }, { ...timing, durations: timing.durations.map((value, index) => index === 0 ? '0' : value) },
    { ...timing, timeBase: { numerator: '1', denominator: '0' } }]) {
    const result = evaluateBenchmarkAcceptance({ ...input, renders: [{ ...first, mp4: { ...first.mp4, frameTiming } }, ...input.renders.slice(1)] });
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.equal(result.gates.find((gate) => gate.name === 'static.frame-cadence')?.classification, 'INCONCLUSIVE');
  }
});

/** Synthetic observations test the classifier; these are not Chromium measurements. */
function evidence(rss: (window: number, sampleInWindow: number) => number = () => 400): MemoryEvidence {
  const samples: MemorySample[] = [];
  for (let frame = 0; frame <= 5400; frame += 10) {
    const window = Math.max(0, Math.ceil(frame / 300) - 1);
    const totalRss = rss(window, (frame % 300) / 10) * MiB;
    samples.push({
      timestampMs: frame * 25, completedFrames: frame,
      rootProcess: { pid: 100, startTimeTicks: '1200' }, treeComplete: true,
      processes: [
        { pid: 100, parentPid: 50, startTimeTicks: '1200', role: 'browser', rssBytes: 40 * MiB },
        { pid: 101, parentPid: 100, startTimeTicks: '1210', role: 'renderer', rssBytes: totalRss - 100 * MiB },
        { pid: 102, parentPid: 100, startTimeTicks: '1220', role: 'gpu', rssBytes: 40 * MiB },
        { pid: 103, parentPid: 100, startTimeTicks: '1230', role: 'utility', rssBytes: 20 * MiB },
      ],
    });
  }
  return { samples, processChanges: [] };
}

function replaceSample(input: MemoryEvidence, index: number, change: (sample: MemorySample) => MemorySample): MemoryEvidence {
  return { ...input, samples: input.samples.map((sample, current) => current === index ? change(sample) : sample) };
}

test('a retained fork-to-exec role transition preserves identity, warm-up samples and all RAM windows', () => {
  const original = evidence();
  const input = replaceSample(original, 0, sample => ({...sample,
    processes: sample.processes.map(process => process.pid === 101 ? {...process, role: 'other'} : process)}));
  const exec: ProcessChange = {pid: 101, startTimeTicks: '1210', timestampMs: 125,
    change: 'exec', previousRole: 'other', role: 'renderer', reason: 'synthetic kernel exec before child resume'};
  const result = classifyMemory({...input, processChanges: [exec]});
  assert.equal(result.classification, 'PASS', result.reasons.join('; '));
  assert.deepEqual(result.windows, classifyMemory(original).windows);
  assert.deepEqual(result.metrics, classifyMemory(original).metrics);
  assert.equal(input.samples[0]!.processes[1]!.role, 'other');
  assert.equal(input.samples.length, original.samples.length);

  const events = fullObserverEvents();
  const first = events.findIndex(event => event.type === 'sample');
  events[first] = {...events[first], processes: input.samples[0]!.processes};
  events.splice(first + 1, 0, {...exec, type: 'change', timestampMs: 135});
  const reconciled = reconcileObserverEvents(events);
  assert.equal(reconciled.complete, true, reconciled.reasons.join('; '));
  assert.ok(reconciled.memory.processChanges.some(change => change.change === 'exec'));
  assert.equal(classifyMemory(reconciled.memory).classification, 'PASS');
});

test('exec evidence cannot excuse a missing event, wrong identity, wrong prior role, ancestry change or root restart', () => {
  const input = replaceSample(evidence(), 0, sample => ({...sample,
    processes: sample.processes.map(process => process.pid === 101 ? {...process, role: 'other'} : process)}));
  const exec: ProcessChange = {pid: 101, startTimeTicks: '1210', timestampMs: 125,
    change: 'exec', previousRole: 'other', role: 'renderer', reason: 'synthetic kernel exec'};
  for (const processChanges of [[], [{...exec, startTimeTicks: '1211'}], [{...exec, previousRole: 'gpu'}],
    [{...exec, role: undefined}], [{...exec, timestampMs: 251}], [exec, exec]]) {
    assert.equal(classifyMemory({...input, processChanges}).classification, 'INCONCLUSIVE');
  }
  const ancestry = replaceSample(input, 1, sample => ({...sample,
    processes: sample.processes.map(process => process.pid === 101 ? {...process, parentPid: 102} : process)}));
  assert.equal(classifyMemory({...ancestry, processChanges: [exec]}).classification, 'INCONCLUSIVE');
  assert.equal(classifyMemory({...evidence(), processChanges: [{...exec, pid: 100, startTimeTicks: '1200',
    previousRole: 'browser', role: 'browser'}]}).classification, 'INCONCLUSIVE');
});

test('accepting exec identity evidence cannot hide a same-role renderer restart during active frames', () => {
  const input = evidence();
  const exec: ProcessChange = {pid: 101, startTimeTicks: '1210', timestampMs: 1250,
    change: 'exec', previousRole: 'renderer', role: 'renderer', reason: 'synthetic image replacement'};
  assert.equal(observeActiveProcessRestarts(input.samples, [exec]).count, 1);
  assert.equal(observeActiveProcessRestarts(input.samples, [{...exec, timestampMs: 125}]).count, 0);
  assert.equal(observeActiveProcessRestarts(input.samples, [{...exec, timestampMs: 135001}]).count, 0);
});

test('accepts only the fixed benchmark configuration, including full static rendering and no restart', () => {
  assert.equal(validateBenchmarkConfig(structuredClone(BENCHMARK_SPEC)).valid, true);
  for (const invalid of [
    { ...BENCHMARK_SPEC, canvas: { width: 4000, height: 2250 } },
    { ...BENCHMARK_SPEC, concurrency: 2 },
    { ...BENCHMARK_SPEC, frameCount: 5399 },
    { ...BENCHMARK_SPEC, renderOrder: ['dynamic', 'static'] },
    { ...BENCHMARK_SPEC, staticRendersEveryFrame: false },
    { ...BENCHMARK_SPEC, restartDuringRender: true },
    { ...BENCHMARK_SPEC, blurPx: 0 },
    { ...BENCHMARK_SPEC, parallax: [0.3, 1, 1] },
    { ...BENCHMARK_SPEC, output: { ...BENCHMARK_SPEC.output, fps: Number.NaN } },
    { ...BENCHMARK_SPEC, chunkFrames: 500 },
    null,
  ]) assert.equal(validateBenchmarkConfig(invalid).valid, false);
  assert.equal(Object.isFrozen(BENCHMARK_SPEC), true);
  assert.equal(Object.isFrozen(BENCHMARK_SPEC.canvas), true);
  assert.equal(Object.isFrozen(BENCHMARK_SPEC.parallax), true);
});

test('stable current RSS passes with all 18 windows and the whole process tree included', () => {
  const result = classifyMemory(evidence((_window, sample) => 400 + sample % 3));
  assert.equal(result.classification, 'PASS');
  assert.equal(result.windows.length, 18);
  assert.equal(result.windows[0]?.medianRssBytes, 401 * MiB);
  assert.equal(result.windows.at(-1)?.lastFrame, 5399);
  assert.equal(result.windows.at(-1)?.lastCompletedFrames, 5400);
  assert.equal(result.metrics?.epsilonBytes, 32 * MiB);
});

test('completed300 and301 map to the source-frame windows ending299 and599', () => {
  const input = replaceSample(evidence(), 31, (sample) => ({ ...sample, completedFrames: 301 }));
  const result = classifyMemory(input);
  assert.equal(result.classification, 'PASS');
  assert.deepEqual(
    result.windows.slice(0, 2).map((window) => ({
      first: window.firstFrame, last: window.lastFrame,
      firstObserved: window.firstCompletedFrames, lastObserved: window.lastCompletedFrames,
    })),
    [
      { first: 0, last: 299, firstObserved: 0, lastObserved: 300 },
      { first: 300, last: 599, firstObserved: 301, lastObserved: 600 },
    ],
  );
  assert.equal(result.windows.at(-1)?.lastFrame, 5399);
  assert.equal(result.windows.at(-1)?.lastCompletedFrames, 5400);
});

test('monotonic renderer RSS growth fails although browser-process RSS stays flat', () => {
  const result = classifyMemory(evidence((window) => 400 + window * 10));
  assert.equal(result.classification, 'FAIL');
  assert.equal(result.metrics?.growthBytes, 150 * MiB);
});

test('one short dip does not hide a sustained leak', () => {
  const result = classifyMemory(evidence((window, sample) => 400 + window * 12 - (sample === 10 ? 100 : 0)));
  assert.equal(result.classification, 'FAIL');
});

test('isolated rising RSS spikes do not substitute cumulative maxima for current RSS statistics', () => {
  const result = classifyMemory(evidence((window, sample) => 400 + (sample === 10 ? (window + 1) * 50 : 0)));
  assert.equal(result.classification, 'PASS');
  assert.equal(result.metrics?.growthBytes, 0);
  assert.equal(result.metrics?.finalP95RangeBytes, 0);
});

test('a moderate rising trend between thresholds is inconclusive', () => {
  assert.equal(classifyMemory(evidence((window) => 400 + window * 3)).classification, 'INCONCLUSIVE');
});

test('relative epsilon cannot turn the 678-to-712 MiB monotonic regression into PASS', () => {
  const result = classifyMemory(evidence((window) => 678 + 2 * window));
  assert.equal(result.metrics?.epsilonBytes, 34 * MiB);
  assert.equal(result.metrics?.growthBytes, 30 * MiB);
  assert.equal(result.metrics?.theilSenGrowthBytes, 34 * MiB);
  assert.equal(result.classification, 'INCONCLUSIVE');
});

test('small monotonic growth below epsilon stays inconclusive at different baselines', () => {
  for (const baseline of [400, 800]) {
    for (const increase of [1 / MiB, 0.25, 1]) {
      assert.equal(classifyMemory(evidence((window) => baseline + increase * window)).classification, 'INCONCLUSIVE');
    }
  }
});

test('one brief sample dip or one whole-window dip cannot clear a small rising trend', () => {
  for (const rss of [
    (window: number, sample: number) => 400 + window - (window === 8 && sample === 10 ? 20 : 0),
    (window: number) => 400 + window - (window === 8 ? 20 : 0),
    (window: number) => 400 + window - (window === 17 ? 20 : 0),
  ]) assert.equal(classifyMemory(evidence(rss)).classification, 'INCONCLUSIVE');
});

test('early or late monotonic steps cannot hide in robust window aggregation', () => {
  for (const rss of [
    (window: number) => 400 + (window > 0 ? 1 : 0),
    (window: number) => 400 + (window === 17 ? 1 : 0),
  ]) {
    const result = classifyMemory(evidence(rss));
    assert.equal(result.metrics?.growthBytes, 0);
    assert.equal(result.metrics?.theilSenGrowthBytes, 0);
    assert.equal(result.classification, 'INCONCLUSIVE');
  }
  const rawStep = replaceSample(evidence(), 540, (sample) => ({ ...sample,
    processes: sample.processes.map((process) => ({ ...process, rssBytes: process.rssBytes + 1 })),
  }));
  const result = classifyMemory(rawStep);
  assert.equal(result.metrics?.growthBytes, 0);
  assert.equal(result.metrics?.theilSenGrowthBytes, 0);
  assert.equal(result.classification, 'INCONCLUSIVE');
});

test('flat and decreasing bounded RSS controls still pass without positive-drift allowance', () => {
  for (const rss of [() => 400, (window: number, sample: number) => 440 - window + sample % 3]) {
    assert.equal(classifyMemory(evidence(rss)).classification, 'PASS');
  }
});

test('FAIL requires both growth metrics strictly above twice epsilon', () => {
  const boundary = classifyMemory(evidence((window) => 256 + 4 * window + (window >= 15 ? 4 : 0)));
  assert.equal(boundary.metrics?.epsilonBytes, 32 * MiB);
  assert.equal(boundary.metrics?.growthBytes, 64 * MiB);
  assert.equal(boundary.metrics?.theilSenGrowthBytes, 68 * MiB);
  assert.equal(boundary.classification, 'INCONCLUSIVE');
  const beyond = classifyMemory(evidence((window) => 256 + 4 * window + (window >= 15 ? 5 : 0)));
  assert.equal(beyond.metrics?.growthBytes, 65 * MiB);
  assert.equal(beyond.classification, 'FAIL');
});

test('late tail spikes prevent a pass even when the median stays flat', () => {
  const result = classifyMemory(evidence((window, sample) => 400 + (window % 2 === 0 && sample < 6 ? 150 : 0)));
  assert.equal(result.metrics?.growthBytes, 0);
  assert.equal(result.classification, 'INCONCLUSIVE');
});

test('missing final progress or a complete 300-frame window cannot pass', () => {
  const input = evidence();
  assert.equal(classifyMemory({ ...input, samples: input.samples.slice(0, -1) }).classification, 'INCONCLUSIVE');
  assert.equal(classifyMemory({ ...input, samples: input.samples.filter((sample) => sample.completedFrames <= 2400 || sample.completedFrames > 2700) }).classification, 'INCONCLUSIVE');
});

test('timestamps must progress and sampling gaps cannot exceed one second', () => {
  const input = evidence();
  const gap = { ...input, samples: input.samples.map((sample, index) => ({ ...sample, timestampMs: sample.timestampMs + (index >= 30 ? 1001 : 0) })) };
  assert.equal(classifyMemory(gap).classification, 'INCONCLUSIVE');
  for (const timestampMs of [0, 250]) {
    assert.equal(classifyMemory(replaceSample(input, 2, (sample) => ({ ...sample, timestampMs }))).classification, 'INCONCLUSIVE');
  }
});

test('a 1000 ms interval is allowed and a 1001 ms interval is inconclusive', () => {
  const input = evidence();
  for (const [extraMs, expected] of [[750, 'PASS'], [751, 'INCONCLUSIVE']] as const) {
    const changed = { ...input, samples: input.samples.map((sample, index) => ({
      ...sample, timestampMs: sample.timestampMs + (index >= 20 ? extraMs : 0),
    })) };
    assert.equal(classifyMemory(changed).classification, expected);
  }
});

test('unchanged frame progress during a stall is valid while regressing progress is not', () => {
  const input = evidence();
  const stalled = { ...input, samples: input.samples.flatMap((sample, index) => [
    { ...sample, timestampMs: index * 500 },
    { ...sample, timestampMs: index * 500 + 250 },
  ]) };
  assert.equal(classifyMemory(stalled).classification, 'PASS');
  const regressed = replaceSample(input, 30, (sample) => ({ ...sample, completedFrames: 280 }));
  assert.equal(classifyMemory(regressed).classification, 'INCONCLUSIVE');
});

test('fast render progress can exceed 30 frames per sample when every window is represented', () => {
  const input = evidence();
  const sparse = input.samples.filter((sample) => sample.completedFrames % 100 === 0)
    .map((sample, index) => ({ ...sample, timestampMs: index * 250 }));
  const result = classifyMemory({ ...input, samples: sparse });
  assert.equal(result.classification, 'PASS');
  assert.equal(result.windows[0]?.sampleCount, 4);
  assert.equal(result.windows[0]?.distinctProgressCount, 4);
});

test('missing tree observations, detached children and duplicate PIDs invalidate evidence', () => {
  const input = evidence();
  const changes: ((sample: MemorySample) => MemorySample)[] = [
    (sample) => ({ ...sample, treeComplete: false }),
    (sample) => ({ ...sample, processes: sample.processes.filter((process) => process.role !== 'renderer') }),
    (sample) => ({ ...sample, processes: sample.processes.map((process) => process.role === 'utility' ? { ...process, parentPid: 999 } : process) }),
    (sample) => ({ ...sample, processes: sample.processes.map((process) => process.role === 'browser' ? { ...process, parentPid: 101 } : process) }),
    (sample) => ({ ...sample, processes: [...sample.processes, sample.processes[0] as ProcessRss] }),
  ];
  for (const change of changes) assert.equal(classifyMemory(replaceSample(input, 50, change)).classification, 'INCONCLUSIVE');
});

test('same PID with a different starttime requires both observed exit and start explanations', () => {
  const input = evidence();
  const reused = { ...input, samples: input.samples.map((sample, index) => ({
    ...sample,
    processes: sample.processes.map((process) => index >= 50 && process.pid === 103 ? { ...process, startTimeTicks: '9999' } : process),
  })) };
  assert.equal(classifyMemory(reused).classification, 'INCONCLUSIVE');
  const explained = { ...reused, processChanges: [
    { pid: 103, startTimeTicks: '1230', timestampMs: 12400, change: 'exit', reason: 'Observed normal utility shutdown' },
    { pid: 103, startTimeTicks: '9999', timestampMs: 12450, change: 'start', reason: 'Observed new utility process' },
  ] };
  assert.equal(classifyMemory(explained).classification, 'PASS');
});

test('a root browser replacement remains inconclusive even with a supplied explanation', () => {
  const input = evidence();
  const restarted = { ...input, samples: input.samples.map((sample, index) => index < 50 ? sample : ({
    ...sample, rootProcess: { pid: 100, startTimeTicks: '9000' },
    processes: sample.processes.map((process) => process.pid === 100 ? { ...process, startTimeTicks: '9000' } : process),
  })), processChanges: [
    { pid: 100, startTimeTicks: '1200', timestampMs: 12400, change: 'exit', reason: 'Observed exit' },
    { pid: 100, startTimeTicks: '9000', timestampMs: 12450, change: 'start', reason: 'Observed replacement' },
  ] };
  assert.equal(classifyMemory(restarted).classification, 'INCONCLUSIVE');
});

test('a root exit cannot be hidden by an otherwise unchanged RSS timeline', () => {
  const input = evidence();
  const changed = { ...input, processChanges: [
    { pid: 100, startTimeTicks: '1200', timestampMs: 12400, change: 'exit', reason: 'Observed root exit' },
  ] };
  assert.equal(classifyMemory(changed).classification, 'INCONCLUSIVE');
});

test('initial start records are optional and must refer to the initially observed identities', () => {
  const initial = evidence();
  const input = { ...initial, samples: initial.samples.map((sample) => ({ ...sample, timestampMs: sample.timestampMs + 1000 })) };
  for (const timestampMs of [500, 1000]) {
    const changed = { ...input, processChanges: [
      { pid: 100, startTimeTicks: '1200', timestampMs, change: 'start', reason: 'Observed initial root start' },
    ] };
    assert.equal(classifyMemory(changed).classification, 'PASS');
  }
  const unrelated = { ...input, processChanges: [
    { pid: 999, startTimeTicks: '7777', timestampMs: 500, change: 'start', reason: 'Process absent from initial inventory' },
  ] };
  assert.equal(classifyMemory(unrelated).classification, 'INCONCLUSIVE');
});

test('unused and contradictory child lifecycle events cannot pass', () => {
  const input = evidence();
  const eventLists = [
    [{ pid: 103, startTimeTicks: '1230', timestampMs: 12400, change: 'exit', reason: 'Exit contradicts later same identity' }],
    [{ pid: 103, startTimeTicks: '1230', timestampMs: 12400, change: 'start', reason: 'Start contradicts already present identity' }],
    [
      { pid: 999, startTimeTicks: '7777', timestampMs: 12400, change: 'start', reason: 'Unobserved short-lived process' },
      { pid: 999, startTimeTicks: '7777', timestampMs: 12450, change: 'exit', reason: 'No sampled RSS for this process' },
    ],
  ];
  for (const processChanges of eventLists) assert.equal(classifyMemory({ ...input, processChanges }).classification, 'INCONCLUSIVE');
});

test('out-of-order or repeated lifecycle records invalidate otherwise explained child turnover', () => {
  const input = evidence();
  const samples = input.samples.map((sample, index) => ({
    ...sample,
    processes: sample.processes.map((process) => index >= 50 && process.pid === 103 ? { ...process, startTimeTicks: '9999' } : process),
  }));
  const exitEvent = { pid: 103, startTimeTicks: '1230', timestampMs: 12400, change: 'exit', reason: 'Observed utility shutdown' };
  const startEvent = { pid: 103, startTimeTicks: '9999', timestampMs: 12450, change: 'start', reason: 'Observed utility start' };
  assert.equal(classifyMemory({ samples, processChanges: [exitEvent, startEvent] }).classification, 'PASS');
  assert.equal(classifyMemory({ samples, processChanges: [startEvent, exitEvent] }).classification, 'INCONCLUSIVE');
  assert.equal(classifyMemory({ samples, processChanges: [exitEvent, { ...exitEvent, timestampMs: 12425 }, startEvent] }).classification, 'INCONCLUSIVE');
});

test('a reused PID cannot start its new identity before the old identity exits', () => {
  const input = evidence();
  const samples = input.samples.map((sample, index) => ({
    ...sample,
    processes: sample.processes.map((process) => index >= 50 && process.pid === 103 ? { ...process, startTimeTicks: '9999' } : process),
  }));
  const processChanges = [
    { pid: 103, startTimeTicks: '9999', timestampMs: 12400, change: 'start', reason: 'Start precedes exit of old identity' },
    { pid: 103, startTimeTicks: '1230', timestampMs: 12450, change: 'exit', reason: 'Old identity exits too late' },
  ];
  assert.equal(classifyMemory({ samples, processChanges }).classification, 'INCONCLUSIVE');
});

test('an exited identity cannot be resurrected in later samples', () => {
  const input = evidence();
  const samples = input.samples.map((sample, index) => ({
    ...sample,
    processes: sample.processes.map((process) => index >= 50 && index < 100 && process.pid === 103 ? { ...process, startTimeTicks: '9999' } : process),
  }));
  const processChanges = [
    { pid: 103, startTimeTicks: '1230', timestampMs: 12400, change: 'exit', reason: 'Old utility exits' },
    { pid: 103, startTimeTicks: '9999', timestampMs: 12450, change: 'start', reason: 'New utility starts' },
    { pid: 103, startTimeTicks: '9999', timestampMs: 24900, change: 'exit', reason: 'New utility exits' },
    { pid: 103, startTimeTicks: '1230', timestampMs: 24950, change: 'start', reason: 'Impossible resurrection of exited identity' },
  ];
  assert.equal(classifyMemory({ samples, processChanges }).classification, 'INCONCLUSIVE');
});

test('sparse samples, process lists and lifecycle lists return inconclusive without throwing', () => {
  const input = evidence();
  const sparseSamples = [...input.samples];
  delete sparseSamples[50];
  const sparseProcesses = replaceSample(input, 50, (sample) => {
    const processes = [...sample.processes];
    delete processes[1];
    return { ...sample, processes };
  });
  const sparseChanges: unknown[] = new Array<unknown>(1);
  for (const invalid of [{ ...input, samples: sparseSamples }, sparseProcesses, { ...input, processChanges: sparseChanges }]) {
    assert.doesNotThrow(() => classifyMemory(invalid));
    assert.equal(classifyMemory(invalid).classification, 'INCONCLUSIVE');
  }
});

test('zero RSS cannot establish a measured live root and is not treated as stable memory', () => {
  const input = evidence();
  const allZero = { ...input, samples: input.samples.map((sample) => ({
    ...sample, processes: sample.processes.map((process) => ({ ...process, rssBytes: 0 })),
  })) };
  const rootZero = replaceSample(input, 50, (sample) => ({
    ...sample, processes: sample.processes.map((process) => process.role === 'browser' ? { ...process, rssBytes: 0 } : process),
  }));
  for (const invalid of [allZero, rootZero]) {
    const result = classifyMemory(invalid);
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.equal(result.metrics, null);
  }
  const childZero = { ...input, samples: input.samples.map((sample) => ({
    ...sample, processes: sample.processes.map((process) => process.role === 'utility' ? { ...process, rssBytes: 0 } : process),
  })) };
  assert.equal(classifyMemory(childZero).classification, 'PASS');
});

test('malformed fields and incomplete evidence take priority over an apparent measured leak', () => {
  const input = evidence((window) => 400 + window * 15);
  const malformed = [
    null, {}, { samples: [], processChanges: [] }, { ...input, processChanges: null },
    replaceSample(input, 20, (sample) => ({ ...sample, timestampMs: Number.NaN })),
    replaceSample(input, 20, (sample) => ({ ...sample, completedFrames: -1 })),
    replaceSample(input, 20, (sample) => ({ ...sample, completedFrames: 5401 })),
    replaceSample(input, 20, (sample) => ({ ...sample, treeComplete: false })),
    replaceSample(input, 20, (sample) => ({ ...sample, processes: sample.processes.map((process) => ({ ...process, rssBytes: Number.POSITIVE_INFINITY })) })),
    replaceSample(input, 20, (sample) => ({ ...sample, processes: sample.processes.map((process) => ({ ...process, rssBytes: -1 })) })),
    replaceSample(input, 20, (sample) => ({ ...sample, rootProcess: { pid: 0, startTimeTicks: 'bad' } })),
  ];
  for (const invalid of malformed) {
    const result = classifyMemory(invalid);
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.equal(result.metrics, null);
  }
});

test('classification does not mutate the supplied evidence', () => {
  const input = evidence();
  const original = structuredClone(input);
  classifyMemory(input);
  assert.deepEqual(input, original);
});

function reference(id: string): EvidenceReference {
  return { id: `synthetic-test:${id}`, sha256: 'a'.repeat(64) };
}

/** Complete synthetic records exercise admission logic; none is actual approval or render evidence. */
function preflightRecord(): BenchmarkPreflight {
  const binding = {
    repository: 'HungQuach301/meridian-studio' as const, benchmarkId: 'synthetic-unit-test',
    sourceCommitSha: 'b'.repeat(40), fixtureSha256: 'c'.repeat(64), lockfileSha256: 'd'.repeat(64),
    browserSha256: 'e'.repeat(64), fontManifestSha256: 'f'.repeat(64), encodingSha256: '1'.repeat(64),
    environmentSha256: '2'.repeat(64), runnerJobId: 'synthetic-job', clockId: 'synthetic-monotonic-clock',
  };
  const limits = { maximumJobMinutes: 75, maximumCostUsd: 1 };
  return {
    configuration: structuredClone(BENCHMARK_SPEC), binding,
    requirements: Object.fromEntries(PREFLIGHT_REQUIREMENTS.map((name) => [name, { resolved: true, evidence: reference(name) }])) as BenchmarkPreflight['requirements'],
    unresolvedDependencyCount: 0, unapprovedDependencyCount: 0, limits,
    benchmarkAuthorization: {
      scope: 'WP-004a-benchmark', approved: true, repository: binding.repository,
      benchmarkId: binding.benchmarkId, sourceCommitSha: binding.sourceCommitSha,
      configuration: structuredClone(BENCHMARK_SPEC), benchmarkCount: 1, renderCount: 2, attempt: 1,
      limits, evidence: reference('synthetic-authorization-record'),
    },
  };
}

function acceptanceRecord(): BenchmarkAcceptanceEvidence {
  const preflight = preflightRecord();
  const renders: RenderAcceptanceEvidence[] = (['static', 'dynamic'] as const).map((variant) => {
    const start = variant === 'static' ? 0 : 600000;
    const raw = evidence();
    return {
      variant, binding: preflight.binding, browserInstanceId: `synthetic-browser-${variant}`,
      progress: { evidence: reference(`${variant}-progress`), renderedFrames: 5400, encodedFrames: 5400, concurrency: 1, everyFrameRendered: true },
      timing: { evidence: reference(`${variant}-timing`), startedAtMs: start, completedAtMs: variant === 'static' ? 600000 : 2100000,
        boundary: 'browser-open-to-mp4-and-browser-close' },
      mp4: { evidence: reference(`${variant}-decode-report`), mp4: { id: `${variant}.mp4`, sha256: (variant === 'static' ? '3' : '4').repeat(64) },
        decodedFrameCount: 5400, fpsNumerator: 30, fpsDenominator: 1, width: 1920, height: 1080, durationNumerator: 180, durationDenominator: 1,
        frameTiming: { timeBase: { numerator: '1', denominator: '15360' },
          presentationTimestamps: Array.from({ length: 5400 }, (_, index) => String(index * 512)), durations: Array.from({ length: 5400 }, () => '512') } },
      memory: { evidence: reference(`${variant}-raw-ram`), raw: { ...raw, samples: raw.samples.map((sample) => ({
        ...sample, timestampMs: sample.timestampMs + start,
        rootProcess: variant === 'static' ? sample.rootProcess : { pid: sample.rootProcess.pid + 1000, startTimeTicks: '101200' },
        processes: variant === 'static' ? sample.processes : sample.processes.map((process) => ({
          ...process, pid: process.pid + 1000, startTimeTicks: String(Number(process.startTimeTicks) + 100000),
          parentPid: process.parentPid === 100 ? 1100 : process.parentPid,
        })),
      })) } },
      crashObservation: { evidence: reference(`${variant}-lifecycle`), independent: true, complete: true, method: 'process-lifecycle',
        crashedProcesses: 0, unexpectedRestarts: 0, expectedFinalCloseExcluded: true },
    };
  });
  return { preflight, renders, jobTiming: {
    evidence: reference('complete-job-timing'), binding: preflight.binding,
    boundary: 'job-start-through-final-cleanup', complete: true, startedAtMs: 0, completedAtMs: 2400000,
  }, visualReview: {
    evidence: reference('synthetic-owner-review'), reviewedBy: 'owner', basedOn: 'both-full-mp4s',
    staticMp4Sha256: '3'.repeat(64), dynamicMp4Sha256: '4'.repeat(64),
    continuity: true, fiveRegions: true, parallax: true, morph: true, blur: true,
  } };
}

function changeRender(input: BenchmarkAcceptanceEvidence, variant: 'static' | 'dynamic',
  change: (render: RenderAcceptanceEvidence) => unknown): unknown {
  return { ...input, renders: input.renders.map((render) => render.variant === variant ? change(render) : render) };
}

test('complete preflight records are reviewable but never authorize execution', () => {
  const result = validateBenchmarkPreflight(preflightRecord());
  assert.equal(result.readyForReview, true);
  assert.equal(result.authorizesExecution, false);
  assert.equal(validateBenchmarkPreflight({ configuration: BENCHMARK_SPEC }).readyForReview, false);
});

test('unresolved dependencies, browser, fonts, license, cost and evidence storage each block preflight', () => {
  const input = preflightRecord();
  for (const name of PREFLIGHT_REQUIREMENTS) {
    const unresolved = { ...input, requirements: { ...input.requirements, [name]: { ...input.requirements[name], resolved: false } } };
    assert.equal(validateBenchmarkPreflight(unresolved).readyForReview, false);
  }
  for (const invalid of [
    { ...input, unapprovedDependencyCount: 1 }, { ...input, unresolvedDependencyCount: 1 },
    { ...input, benchmarkAuthorization: { ...input.benchmarkAuthorization, scope: 'WP-004a-PR-preparation' } },
    { ...input, benchmarkAuthorization: { ...input.benchmarkAuthorization, approved: false } },
    { ...input, benchmarkAuthorization: { ...input.benchmarkAuthorization, attempt: 2 } },
    { ...input, benchmarkAuthorization: { ...input.benchmarkAuthorization, sourceCommitSha: '0'.repeat(40) } },
    { ...input, limits: { maximumJobMinutes: 75, maximumCostUsd: Number.NaN } },
    { ...input, limits: { ...input.limits, maximumCostUsd: 2 } },
  ]) assert.equal(validateBenchmarkPreflight(invalid).readyForReview, false);
});

test('only complete consistent synthetic evidence can satisfy all acceptance gates', () => {
  const input = acceptanceRecord();
  const original = structuredClone(input);
  const result = evaluateBenchmarkAcceptance(input);
  assert.equal(result.classification, 'PASS');
  assert.equal(result.memory.static?.classification, 'PASS');
  assert.equal(result.memory.dynamic?.classification, 'PASS');
  assert.equal(result.authorizesExecution, false);
  assert.equal(result.opensWp005, false);
  assert.deepEqual(input, original);
});

test('both decoded MP4s must match exact frame, rational fps, dimensions and duration', () => {
  const input = acceptanceRecord();
  for (const variant of ['static', 'dynamic'] as const) {
    for (const change of [
      { decodedFrameCount: 5399 }, { fpsNumerator: 30000, fpsDenominator: 1001 },
      { width: 1280 }, { height: 720 }, { durationNumerator: 179 },
    ]) {
      const changed = changeRender(input, variant, (render) => ({ ...render, mp4: { ...render.mp4, ...change } }));
      assert.equal(evaluateBenchmarkAcceptance(changed).classification, 'FAIL');
    }
  }
  const equivalent = changeRender(input, 'dynamic', (render) => ({ ...render,
    mp4: { ...render.mp4, fpsNumerator: 60000, fpsDenominator: 2000, durationNumerator: 180000, durationDenominator: 1000 } }));
  assert.equal(evaluateBenchmarkAcceptance(equivalent).classification, 'PASS');
  const invalid = changeRender(input, 'static', (render) => ({ ...render, mp4: { ...render.mp4, fpsDenominator: 0 } }));
  assert.equal(evaluateBenchmarkAcceptance(invalid).classification, 'INCONCLUSIVE');
});

test('25 minute and three-times ratio boundaries are inclusive without hidden tolerance', () => {
  const input = acceptanceRecord();
  const boundary = changeRender(input, 'static', (render) => ({ ...render, timing: { ...render.timing, completedAtMs: 500000 } }));
  assert.equal(evaluateBenchmarkAcceptance(boundary).classification, 'PASS');
  const ratioFail = changeRender(input, 'static', (render) => ({ ...render, timing: { ...render.timing, completedAtMs: 499999 } }));
  assert.equal(evaluateBenchmarkAcceptance(ratioFail).classification, 'FAIL');
  const timeFail = changeRender(input, 'dynamic', (render) => ({ ...render, timing: { ...render.timing, completedAtMs: 2100001 } }));
  assert.equal(evaluateBenchmarkAcceptance(timeFail).classification, 'FAIL');
});

test('static image looping and changed concurrency are measured failures', () => {
  const input = acceptanceRecord();
  for (const change of [{ everyFrameRendered: false }, { renderedFrames: 1 }, { encodedFrames: 5399 }, { concurrency: 2 }]) {
    assert.equal(evaluateBenchmarkAcceptance(changeRender(input, 'static', (render) => ({ ...render, progress: { ...render.progress, ...change } }))).classification, 'FAIL');
  }
});

test('crash=0 needs independent complete lifecycle evidence and excludes deliberate final close', () => {
  const input = acceptanceRecord();
  for (const change of [{ independent: false }, { complete: false }, { method: 'browser-console' }, { expectedFinalCloseExcluded: false }]) {
    assert.equal(evaluateBenchmarkAcceptance(changeRender(input, 'dynamic', (render) => ({ ...render, crashObservation: { ...render.crashObservation, ...change } }))).classification, 'INCONCLUSIVE');
  }
  for (const change of [{ crashedProcesses: 1 }, { unexpectedRestarts: 1 }]) {
    assert.equal(evaluateBenchmarkAcceptance(changeRender(input, 'dynamic', (render) => ({ ...render, crashObservation: { ...render.crashObservation, ...change } }))).classification, 'FAIL');
  }
});

test('raw RAM must be supplied for both renders; a fabricated PASS label is ignored', () => {
  const input = acceptanceRecord();
  const missing = changeRender(input, 'static', (render) => ({ ...render, memory: { evidence: reference('ram'), classification: 'PASS' } }));
  assert.equal(evaluateBenchmarkAcceptance(missing).classification, 'INCONCLUSIVE');
  const leaked = changeRender(input, 'static', (render) => ({ ...render, memory: { evidence: reference('ram'), raw: evidence((window) => 400 + 10 * window) } }));
  assert.equal(evaluateBenchmarkAcceptance(leaked).classification, 'FAIL');
});

test('small RSS drift in either render keeps the overall benchmark inconclusive', () => {
  for (const variant of ['static', 'dynamic'] as const) {
    const input = acceptanceRecord();
    const result = evaluateBenchmarkAcceptance(changeRender(input, variant, (render) => ({ ...render,
      memory: { ...render.memory, raw: { ...render.memory.raw,
        samples: render.memory.raw.samples.map((sample) => ({ ...sample,
          processes: sample.processes.map((process) => process.role !== 'renderer' ? process : ({ ...process,
            rssBytes: process.rssBytes + Math.max(0, Math.ceil(sample.completedFrames / 300) - 1) * MiB,
          })),
        })),
      } },
    })));
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.equal(result.gates.find((gate) => gate.name === `${variant}.memory`)?.classification, 'INCONCLUSIVE');
  }
});

test('source/environment/runner mismatches and raw RAM outside its clock interval are inconclusive', () => {
  const input = acceptanceRecord();
  for (const change of [{ sourceCommitSha: '0'.repeat(40) }, { environmentSha256: '0'.repeat(64) }, { runnerJobId: 'another-runner' }, { browserSha256: '0'.repeat(64) }]) {
    assert.equal(evaluateBenchmarkAcceptance(changeRender(input, 'dynamic', (render) => ({ ...render, binding: { ...render.binding, ...change } }))).classification, 'INCONCLUSIVE');
  }
  const clock = changeRender(input, 'dynamic', (render) => ({ ...render, memory: { ...render.memory, raw: evidence() } }));
  assert.equal(evaluateBenchmarkAcceptance(clock).classification, 'INCONCLUSIVE');
});

test('different browser labels cannot conceal reuse of the same observed Chromium root', () => {
  const input = acceptanceRecord();
  const reused = changeRender(input, 'dynamic', (render) => {
    const raw = evidence();
    return { ...render, memory: { ...render.memory,
      raw: { ...raw, samples: raw.samples.map((sample) => ({ ...sample, timestampMs: sample.timestampMs + 600000 })) },
    } };
  });
  const result = evaluateBenchmarkAcceptance(reused);
  assert.equal(result.classification, 'INCONCLUSIVE');
  assert.equal(result.gates.find((gate) => gate.name === 'fresh-browsers')?.classification, 'INCONCLUSIVE');
});

test('binding both visual-review fields to copied MP4 bytes cannot establish two outputs', () => {
  const input = acceptanceRecord();
  const changed = { ...input,
    renders: input.renders.map((render) => ({ ...render, mp4: { ...render.mp4, mp4: { ...render.mp4.mp4, sha256: '3'.repeat(64) } } })),
    visualReview: { ...input.visualReview, dynamicMp4Sha256: '3'.repeat(64) },
  };
  assert.equal(evaluateBenchmarkAcceptance(changed).classification, 'INCONCLUSIVE');
});

test('a known observed render span exceeding its declared authorized job limit is a failure', () => {
  const input = acceptanceRecord();
  const limits = { ...input.preflight.limits, maximumJobMinutes: 1 };
  const changed = { ...input, preflight: { ...input.preflight, limits,
    benchmarkAuthorization: { ...input.preflight.benchmarkAuthorization, limits },
  } };
  const result = evaluateBenchmarkAcceptance(changed);
  assert.equal(result.classification, 'FAIL');
  assert.equal(result.gates.find((gate) => gate.name === 'observed-job-span')?.classification, 'FAIL');
});

test('passing render durations cannot conceal a job overrun in setup or final processing', () => {
  const input = acceptanceRecord();
  const maximumMs = input.preflight.limits.maximumJobMinutes * 60000;
  for (const completedAtMs of [maximumMs, maximumMs + 1]) {
    const result = evaluateBenchmarkAcceptance({ ...input, jobTiming: { ...input.jobTiming, completedAtMs } });
    assert.equal(result.gates.find((gate) => gate.name === 'observed-job-span')?.classification, 'PASS');
    assert.equal(result.gates.find((gate) => gate.name === 'dynamic-time')?.classification, 'PASS');
    assert.equal(result.gates.find((gate) => gate.name === 'job-time-limit')?.classification,
      completedAtMs === maximumMs ? 'PASS' : 'FAIL');
    assert.equal(result.classification, completedAtMs === maximumMs ? 'PASS' : 'FAIL');
    assert.equal(result.authorizesExecution, false);
  }
});

test('missing, incomplete or malformed full-job timing cannot be inferred from two renders', () => {
  const input = acceptanceRecord();
  for (const jobTiming of [undefined, {},
    { ...input.jobTiming, complete: false }, { ...input.jobTiming, evidence: undefined },
    { ...input.jobTiming, boundary: 'browser-open-to-mp4-and-browser-close' },
    { ...input.jobTiming, completedAtMs: Number.NaN }, { ...input.jobTiming, startedAtMs: -1 },
    { ...input.jobTiming, completedAtMs: input.jobTiming.startedAtMs },
  ]) {
    const result = evaluateBenchmarkAcceptance({ ...input, jobTiming });
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.equal(result.gates.find((gate) => gate.name === 'job-timing')?.classification, 'INCONCLUSIVE');
  }
});

test('full-job evidence from another source, runner or clock stays inconclusive', () => {
  const input = acceptanceRecord();
  for (const binding of [
    { ...input.jobTiming.binding, sourceCommitSha: '0'.repeat(40) },
    { ...input.jobTiming.binding, runnerJobId: 'different-job' },
    { ...input.jobTiming.binding, clockId: 'different-clock' },
  ]) assert.equal(evaluateBenchmarkAcceptance({ ...input, jobTiming: { ...input.jobTiming, binding } }).classification, 'INCONCLUSIVE');
});

test('a full-job claim that omits part of either render is inconclusive', () => {
  const input = acceptanceRecord();
  for (const jobTiming of [
    { ...input.jobTiming, startedAtMs: 1 },
    { ...input.jobTiming, completedAtMs: 2099999 },
  ]) {
    const result = evaluateBenchmarkAcceptance({ ...input, jobTiming });
    assert.equal(result.classification, 'INCONCLUSIVE');
    assert.ok(result.gates.some((gate) => gate.name.endsWith('.job-coverage') && gate.classification === 'INCONCLUSIVE'));
  }
});

test('a measured job overrun remains visible when a render record is missing', () => {
  const input = acceptanceRecord();
  const result = evaluateBenchmarkAcceptance({ ...input, renders: input.renders.slice(0, 1),
    jobTiming: { ...input.jobTiming, completedAtMs: input.preflight.limits.maximumJobMinutes * 60000 + 1 },
  });
  assert.equal(result.classification, 'INCONCLUSIVE');
  assert.equal(result.gates.find((gate) => gate.name === 'job-time-limit')?.classification, 'FAIL');
});

test('owner acceptance must cover every visual criterion and bind both full MP4s', () => {
  const input = acceptanceRecord();
  for (const field of ['continuity', 'fiveRegions', 'parallax', 'morph', 'blur'] as const) {
    assert.equal(evaluateBenchmarkAcceptance({ ...input, visualReview: { ...input.visualReview, [field]: false } }).classification, 'FAIL');
  }
  for (const change of [{ reviewedBy: 'agent' }, { basedOn: 'sampled-images' }, { dynamicMp4Sha256: '0'.repeat(64) }, { evidence: undefined }]) {
    assert.equal(evaluateBenchmarkAcceptance({ ...input, visualReview: { ...input.visualReview, ...change } }).classification, 'INCONCLUSIVE');
  }
});

test('missing evidence dominates aggregate status while a known failure remains visible', () => {
  const input = acceptanceRecord();
  const failed = changeRender(input, 'dynamic', (render) => ({ ...render, timing: { ...render.timing, completedAtMs: 2100001 } }));
  assert.ok(typeof failed === 'object' && failed !== null);
  const result = evaluateBenchmarkAcceptance({ ...failed, visualReview: undefined });
  assert.equal(result.classification, 'INCONCLUSIVE');
  assert.equal(result.gates.find((gate) => gate.name === 'dynamic-time')?.classification, 'FAIL');
});

test('a missing second render does not erase a known decoded-frame failure in the first', () => {
  const input = acceptanceRecord();
  const staticRender = input.renders.find((render) => render.variant === 'static');
  assert.ok(staticRender);
  const result = evaluateBenchmarkAcceptance({ ...input,
    renders: [{ ...staticRender, mp4: { ...staticRender.mp4, decodedFrameCount: 5399 } }],
  });
  assert.equal(result.classification, 'INCONCLUSIVE');
  assert.equal(result.gates.find((gate) => gate.name === 'static.mp4')?.classification, 'FAIL');
});

test('missing, sparse or reversed render records never produce overall PASS', () => {
  const input = acceptanceRecord();
  const sparse = [...input.renders];
  delete sparse[0];
  for (const invalid of [null, {}, { ...input, renders: [] }, { ...input, renders: sparse }, { ...input, renders: [...input.renders].reverse() }]) {
    assert.doesNotThrow(() => evaluateBenchmarkAcceptance(invalid));
    assert.equal(evaluateBenchmarkAcceptance(invalid).classification, 'INCONCLUSIVE');
  }
});
