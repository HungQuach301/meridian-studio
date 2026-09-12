/**
 * WP-004a analysis and explicitly invoked benchmark controller.
 * Importing this module performs no I/O. Offline tests never open a browser.
 */

export const BENCHMARK_SPEC = Object.freeze({
  canvas: Object.freeze({ width: 6000, height: 3400 }),
  output: Object.freeze({ width: 1920, height: 1080, fps: 30, durationSeconds: 180 }),
  frameCount: 5400,
  renderOrder: Object.freeze(['static', 'dynamic'] as const),
  concurrency: 1,
  parallax: Object.freeze([0.3, 1, 1.3] as const),
  blurPx: 3,
  regionCount: 5,
  morphCount: 1,
  staticRendersEveryFrame: true,
  sequentialOnSameRunner: true,
  freshBrowserPerRender: true,
  restartDuringRender: false,
});

export const MEMORY_POLICY = Object.freeze({
  targetSampleIntervalMs: 250,
  maximumSampleGapMs: 1000,
  windowFrames: 300,
  windowCount: 18,
  minimumEpsilonBytes: 32 * 1024 * 1024,
  relativeEpsilon: 0.05,
});

/** Read from the integrity-verified @remotion/renderer 4.0.523 package. */
export const BROWSER_VERSION = '149.0.7790.0';
export const BROWSER_ARCHIVE_URL = `https://storage.googleapis.com/chrome-for-testing-public/${BROWSER_VERSION}/linux64/chrome-headless-shell-linux64.zip`;
export const OBSERVER_PYTHON = '/usr/bin/python3';
export const OBSERVER_PYTHON_VERSION = 'Python 3.12.3';
export const ENCODING = Object.freeze({ codec: 'h264', crf: 18, x264Preset: 'medium',
  pixelFormat: 'yuv420p', imageFormat: 'png', disallowParallelEncoding: true,
  everyNthFrame: 1, scale: 1, muted: true, concurrency: 1 } as const);

/**
 * Linux observer uses Python's standard library and the kernel ptrace API.
 * It traces only its own child and descendants, before exec; no system-wide
 * attachment, privilege escalation, installation or fallback is permitted.
 * The child is not executed if ptrace is unavailable. EXITKILL prevents orphan
 * browsers if the observer dies. Frame progress is input, never invented here.
 * Kept in this scoped file; no extra tracked helper or npm dependency.
 */
export const LINUX_OBSERVER_SOURCE = String.raw`
import os,sys,json,time,signal,ctypes,selectors
libc=ctypes.CDLL(None,use_errno=True)
libc.ptrace.restype=ctypes.c_long
def ptrace(request,pid=0,address=0,data=0):
    ctypes.set_errno(0)
    result=libc.ptrace(request,pid,ctypes.c_void_p(address),ctypes.c_void_p(data))
    if result==-1 and ctypes.get_errno(): raise OSError(ctypes.get_errno(), 'ptrace denied or unavailable')
    return result
def emit(kind,**data):
    print(json.dumps(dict(type=kind,timestampMs=time.monotonic_ns()/1000000,**data)),flush=True)
def stat(pid):
    raw=open('/proc/'+str(pid)+'/stat').read();fields=raw[raw.rfind(')')+2:].split()
    return dict(pid=pid,parentPid=int(fields[1]),startTimeTicks=fields[19])
def status(pid):
    return dict(line.split(':',1) for line in open('/proc/'+str(pid)+'/status') if ':' in line)
target=sys.argv[1];args=sys.argv[2:]
controller=os.getppid();ffmpeg_path=os.environ.get('WP004A_FFMPEG_PATH');last_auxiliary=0
root=os.fork()
if root==0:
    try:
        ptrace(0);os.kill(os.getpid(),signal.SIGSTOP)
        os.dup2(2,1)
        os.execv(target,[target]+args)
    except BaseException:
        os._exit(99)
_,first=os.waitpid(root,0)
if not os.WIFSTOPPED(first):
    emit('fatal',reason='Observer capability unavailable; target was not executed')
    sys.exit(2)
try: ptrace(0x4200,root,0,2|4|8|16|64|0x00100000)
except BaseException:
    os.kill(root,signal.SIGKILL);os.waitpid(root,0)
    emit('fatal',reason='Required lifecycle trace options unavailable; target was not executed')
    sys.exit(2)
threads={root};pending=set();stopped_seen=set();processes={};progress=0;closing=False;expected_close=False
exit_stops={};cleanup_sent={}
complete=True;crashes=0;exec_seen=False;changes=[];last_sample=0
root_identity=stat(root)
selector=selectors.DefaultSelector();selector.register(sys.stdin,selectors.EVENT_READ)
os.set_blocking(sys.stdin.fileno(),False);input_buffer=b''
def sample():
    global complete,last_sample
    # The final pre-close sample ends RAM measurement. Keep tracing exits below.
    if closing or not exec_seen or root not in processes or pending: return
    result=[];valid=True
    for pid,identity in list(processes.items()):
        try:
            before=stat(pid);s=status(pid);after=stat(pid)
            if before!=after or before['startTimeTicks']!=identity['startTimeTicks']: valid=False;continue
            if int(s['Tgid'])!=pid: valid=False;continue
            rss=s.get('VmRSS','').split()
            if len(rss)!=2 or rss[1]!='kB': valid=False;continue
            # Roles change only when a retained exec event establishes them.
            result.append(dict(before,rssBytes=int(rss[0])*1024,role=identity['role']))
        except (OSError,ValueError,KeyError): valid=False
    emit('sample',completedFrames=progress,rootProcess=dict(pid=root,startTimeTicks=root_identity['startTimeTicks']),treeComplete=valid,processes=result)
    last_sample=time.monotonic()
def observe_start(pid):
    global complete
    try:
        s=status(pid)
        if int(s['Tgid'])!=pid:return
        if pid in processes:return
        identity=dict(stat(pid),role='browser' if pid==root else 'other');processes[pid]=identity
        emit('change',change='start',pid=pid,startTimeTicks=identity['startTimeTicks'],reason='kernel lifecycle event before child resume')
        sample()
        if closing:
            complete=False
            kill_for_cleanup(pid)
    except (OSError,ValueError,KeyError):complete=False
def observe_exec(pid):
    identity=processes.get(pid)
    if identity is None or stat(pid)['startTimeTicks']!=identity['startTimeTicks']:
        raise ValueError('Exec lacks its original process identity')
    argv=open('/proc/'+str(pid)+'/cmdline','rb').read().split(b'\0')
    role='browser' if pid==root else 'renderer' if b'--type=renderer' in argv else 'gpu' if b'--type=gpu-process' in argv else 'utility' if b'--type=utility' in argv else 'other'
    previous=identity['role'];identity['role']=role
    emit('change',change='exec',pid=pid,startTimeTicks=identity['startTimeTicks'],previousRole=previous,role=role,reason='kernel exec event before new program resume')
    sample()
def auxiliary_sample():
    global last_auxiliary
    result=[];valid=True
    try:
        children=set()
        for task in os.listdir('/proc/'+str(controller)+'/task'):
            try:children.update(int(pid) for pid in open('/proc/'+str(controller)+'/task/'+task+'/children').read().split())
            except FileNotFoundError:pass
        selected=[(controller,'node')]
        if ffmpeg_path:
            for pid in children:
                try:
                    if os.readlink('/proc/'+str(pid)+'/exe')==ffmpeg_path:selected.append((pid,'ffmpeg'))
                except FileNotFoundError:pass
        for pid,role in selected:
            before=stat(pid);rss=status(pid).get('VmRSS','').split();after=stat(pid)
            if before!=after or len(rss)!=2 or rss[1]!='kB':valid=False;continue
            result.append(dict(before,role=role,rssBytes=int(rss[0])*1024))
    except (OSError,ValueError,KeyError):valid=False
    emit('auxiliary',completedFrames=progress,complete=valid,processes=result)
    last_auxiliary=time.monotonic()
def kill_for_cleanup(pid):
    identity=processes.get(pid)
    # A previously observed exit is already committed; a later kill cannot
    # turn its cause into an expected cleanup, even when both signals are 9.
    eligible=expected_close and identity is not None and pid not in exit_stops
    try:os.kill(pid,signal.SIGKILL)
    except ProcessLookupError:return
    if identity is not None:
        cleanup_sent[pid]=(identity['startTimeTicks'],eligible)
        emit('cleanup-signal',pid=pid,startTimeTicks=identity['startTimeTicks'],signal=signal.SIGKILL)
def close(expected):
    global closing,expected_close
    if closing:return
    sample();closing=True;expected_close=expected and progress==5400
    emit('closing',expectedFinalClose=expected_close)
    for pid in list(threads):kill_for_cleanup(pid)
def termination(state):
    if not (os.WIFEXITED(state) or os.WIFSIGNALED(state)):raise ValueError('Nonterminal exit status')
    return dict(waitStatus=state,exitCode=os.WEXITSTATUS(state) if os.WIFEXITED(state) else None,signal=os.WTERMSIG(state) if os.WIFSIGNALED(state) else None)
def drain_wait_events():
    global complete,crashes,exec_seen
    while True:
        try:pid,state=os.waitpid(-1,os.WNOHANG|0x40000000)
        except ChildProcessError:break
        if pid==0:break
        if os.WIFEXITED(state) or os.WIFSIGNALED(state):
            threads.discard(pid);pending.discard(pid)
            identity=processes.pop(pid,None)
            if identity:
                stopped_status=exit_stops.pop(pid,None)
                if stopped_status!=state:complete=False
                expected=cleanup_sent.pop(pid,None)==(identity['startTimeTicks'],True) and stopped_status==state and os.WIFSIGNALED(state) and os.WTERMSIG(state)==signal.SIGKILL
                if (os.WIFSIGNALED(state) or os.WEXITSTATUS(state)!=0) and not expected:crashes+=1
                emit('exit',pid=pid,startTimeTicks=identity['startTimeTicks'],expected=expected,**termination(state))
                if not closing:
                    emit('change',change='exit',pid=pid,startTimeTicks=identity['startTimeTicks'],reason='kernel wait status')
                    sample()
            if pid==root and not closing:close(False)
            continue
        if not os.WIFSTOPPED(state):complete=False;continue
        threads.add(pid);event=state>>16;sig=os.WSTOPSIG(state)
        if sig==signal.SIGSTOP and pid in stopped_seen and not event:raise ValueError('Unexpected repeated process stop')
        stopped_seen.add(pid)
        if event in (1,2,3):
            new=ctypes.c_ulong();ptrace(0x4201,pid,0,ctypes.addressof(new));threads.add(new.value)
            if new.value not in stopped_seen:pending.add(new.value)
        elif event==4:
            if pid==root and not exec_seen:
                exec_seen=True;observe_start(root);emit('ready',pid=root)
            else:observe_exec(pid)
        elif event==6:
            terminal=ctypes.c_ulong();ptrace(0x4201,pid,0,ctypes.addressof(terminal))
            identity=processes.get(pid)
            if identity:
                if pid in exit_stops:raise ValueError('Duplicate process exit stop')
                exit_stops[pid]=terminal.value
                emit('exit-pending',pid=pid,startTimeTicks=identity['startTimeTicks'],**termination(terminal.value))
            sample()
        elif sig==signal.SIGSTOP:pending.discard(pid);observe_start(pid)
        if sig!=signal.SIGSTOP and not event:emit('signal',pid=pid,signal=sig)
        ptrace(7,pid,0,0 if event or sig==signal.SIGSTOP else sig)
ptrace(7,root)
try:
    while threads:
        # Consume already-observable exit causes before accepting a final close.
        drain_wait_events()
        for key,_ in selector.select(0):
            chunk=os.read(sys.stdin.fileno(),65536)
            if not chunk:close(False);selector.unregister(sys.stdin);break
            input_buffer+=chunk
            while b'\n' in input_buffer:
                line,input_buffer=input_buffer.split(b'\n',1);command=json.loads(line)
                if command.get('type')=='progress':
                    value=command['completedFrames']
                    if type(value)!=int or value<progress or value>5400:raise ValueError('Invalid progress')
                    progress=value
                    if value in (0,5400):sample()
                elif command.get('type')=='close':
                    drain_wait_events()
                    close(command.get('expected') is True)
                else:raise ValueError('Unknown observer command')
        if not closing and time.monotonic()-last_sample>=0.25:sample()
        if not closing and time.monotonic()-last_auxiliary>=0.25:auxiliary_sample()
        time.sleep(0.002)
    emit('summary',complete=complete and exec_seen,crashedProcesses=crashes,expectedFinalCloseExcluded=expected_close)
except BaseException as error:
    complete=False;emit('fatal',reason=type(error).__name__+': '+str(error));close(False)
    sys.exit(2)
`;

export interface ValidationResult {
  readonly valid: boolean;
  readonly reasons: readonly string[];
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sameSpecification(actual: unknown, expected: unknown, path: string, reasons: string[]): void {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) {
      reasons.push(`${path}: expected the fixed benchmark array`);
      return;
    }
    expected.forEach((item: unknown, index: number) => sameSpecification(actual[index], item, `${path}[${index}]`, reasons));
    return;
  }
  if (isRecord(expected)) {
    if (!isRecord(actual)) {
      reasons.push(`${path}: expected an object`);
      return;
    }
    for (const key of Object.keys(expected)) sameSpecification(actual[key], expected[key], `${path}.${key}`, reasons);
    for (const key of Object.keys(actual)) {
      if (!Object.hasOwn(expected, key)) reasons.push(`${path}.${key}: unexpected benchmark setting`);
    }
    return;
  }
  if (actual !== expected) reasons.push(`${path}: differs from the fixed benchmark specification`);
}

/** Validates invariant settings only; matching settings do not authorize a run. */
export function validateBenchmarkConfig(value: unknown): ValidationResult {
  const reasons: string[] = [];
  sameSpecification(value, BENCHMARK_SPEC, 'benchmark', reasons);
  return { valid: reasons.length === 0, reasons };
}

export type Classification = 'PASS' | 'FAIL' | 'INCONCLUSIVE';
export type ChromiumRole = 'browser' | 'renderer' | 'gpu' | 'utility' | 'other';

export interface ProcessIdentity {
  readonly pid: number;
  /** Decimal /proc starttime ticks, retained as text to avoid integer precision loss. */
  readonly startTimeTicks: string;
}

export interface ProcessRss extends ProcessIdentity {
  readonly parentPid: number | null;
  readonly rssBytes: number;
  readonly role: ChromiumRole;
}

export interface MemorySample {
  readonly timestampMs: number;
  /** Completed render frames, including explicit initial 0 and final 5400 observations. */
  readonly completedFrames: number;
  readonly rootProcess: ProcessIdentity;
  /** An assertion from a real tree observer, not inferred from console output. */
  readonly treeComplete: boolean;
  readonly processes: readonly ProcessRss[];
}

export type ProcessChange = ProcessIdentity & {
  readonly timestampMs: number;
  /** Explanation supplied by the actual lifecycle observer. */
  readonly reason: string;
} & ({ readonly change: 'start' | 'exit' }
  | { readonly change: 'exec'; readonly previousRole: ChromiumRole; readonly role: ChromiumRole });

export interface MemoryEvidence {
  readonly samples: readonly MemorySample[];
  /**
   * Chronological lifecycle observations. Optional start records at/before the
   * first sample must name identities in that initial inventory. All later
   * records must match a transition between adjacent sampled inventories.
   * Unobserved short-lived processes require more evidence, not assumed-zero RSS.
   */
  readonly processChanges: readonly ProcessChange[];
}

export interface MemoryWindow {
  readonly index: number;
  /** Declared source-frame bounds, inclusive; these are not progress counters. */
  readonly firstFrame: number;
  readonly lastFrame: number;
  readonly firstCompletedFrames: number;
  readonly lastCompletedFrames: number;
  readonly sampleCount: number;
  readonly distinctProgressCount: number;
  readonly medianRssBytes: number;
  readonly p95RssBytes: number;
}

export interface MemoryMetrics {
  readonly epsilonBytes: number;
  readonly growthBytes: number;
  readonly theilSenGrowthBytes: number;
  readonly finalMedianRangeBytes: number;
  readonly finalP95RangeBytes: number;
}

export interface MemoryResult {
  readonly classification: Classification;
  readonly reasons: readonly string[];
  readonly windows: readonly MemoryWindow[];
  readonly metrics: MemoryMetrics | null;
}

function finiteNonnegative(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function positiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

function isIdentity(value: unknown): value is JsonRecord & ProcessIdentity {
  return isRecord(value) && positiveInteger(value.pid)
    && typeof value.startTimeTicks === 'string' && /^(0|[1-9][0-9]*)$/.test(value.startTimeTicks);
}

function isRole(value: unknown): value is ChromiumRole {
  return value === 'browser' || value === 'renderer' || value === 'gpu' || value === 'utility' || value === 'other';
}

function isProcess(value: unknown): value is JsonRecord & ProcessRss {
  return isIdentity(value) && (value.parentPid === null || positiveInteger(value.parentPid))
    && finiteNonnegative(value.rssBytes) && Number.isSafeInteger(value.rssBytes) && isRole(value.role);
}

function isSample(value: unknown): value is JsonRecord & MemorySample {
  return isRecord(value) && finiteNonnegative(value.timestampMs)
    && finiteNonnegative(value.completedFrames) && Number.isInteger(value.completedFrames)
    && value.completedFrames <= BENCHMARK_SPEC.frameCount && isIdentity(value.rootProcess)
    && typeof value.treeComplete === 'boolean' && Array.isArray(value.processes)
    && value.processes.length > 0 && Array.from(value.processes).every(isProcess);
}

function isProcessChange(value: unknown): value is JsonRecord & ProcessChange {
  return isIdentity(value) && finiteNonnegative(value.timestampMs)
    && (value.change === 'start' || value.change === 'exit'
      || (value.change === 'exec' && isRole(value.previousRole) && isRole(value.role)))
    && typeof value.reason === 'string' && value.reason.trim().length > 0;
}

function identityKey(identity: ProcessIdentity): string {
  return `${identity.pid}:${identity.startTimeTicks}`;
}

function incomplete(reasons: readonly string[]): MemoryResult {
  return { classification: 'INCONCLUSIVE', reasons: [...new Set(reasons)], windows: [], metrics: null };
}

function validateTree(sample: MemorySample, index: number, reasons: string[]): void {
  if (!sample.treeComplete) reasons.push(`sample ${index}: process tree observation is incomplete`);
  const byPid = new Map<number, ProcessRss>();
  for (const process of sample.processes) {
    if (byPid.has(process.pid)) reasons.push(`sample ${index}: duplicate process PID`);
    byPid.set(process.pid, process);
  }
  const root = byPid.get(sample.rootProcess.pid);
  if (!root || identityKey(root) !== identityKey(sample.rootProcess) || root.role !== 'browser') {
    reasons.push(`sample ${index}: identified Chromium root is absent or inconsistent`);
    return;
  }
  if (root.parentPid !== null && byPid.has(root.parentPid)) {
    reasons.push(`sample ${index}: root parent belongs to its own descendant tree`);
  }
  if (root.rssBytes === 0) {
    reasons.push(`sample ${index}: zero RSS cannot establish a readable live Chromium root`);
  }
  for (const process of sample.processes) {
    let current = process;
    const visited = new Set<number>();
    while (current.pid !== root.pid) {
      if (visited.has(current.pid)) {
        reasons.push(`sample ${index}: cyclic process ancestry`);
        break;
      }
      visited.add(current.pid);
      const parent = current.parentPid === null ? undefined : byPid.get(current.parentPid);
      if (!parent) {
        reasons.push(`sample ${index}: child process is detached or its parent is missing`);
        break;
      }
      current = parent;
    }
  }
  const total = sample.processes.reduce((sum, process) => sum + process.rssBytes, 0);
  if (!Number.isSafeInteger(total)) reasons.push(`sample ${index}: total RSS exceeds safe integer precision`);
}

function explainedChange(
  changes: readonly ProcessChange[], process: ProcessIdentity, change: ProcessChange['change'],
  previousMs: number, currentMs: number,
): boolean {
  return changes.some((event) => identityKey(event) === identityKey(process) && event.change === change
    && event.timestampMs > previousMs && event.timestampMs <= currentMs);
}

function validateTransition(
  previous: MemorySample, current: MemorySample, changes: readonly ProcessChange[], index: number, reasons: string[],
): void {
  const elapsed = current.timestampMs - previous.timestampMs;
  if (elapsed <= 0) reasons.push(`sample ${index}: timestamps must increase strictly`);
  if (elapsed > MEMORY_POLICY.maximumSampleGapMs) reasons.push(`sample ${index}: sampling gap exceeds 1000 ms`);
  const progress = current.completedFrames - previous.completedFrames;
  if (progress < 0) reasons.push(`sample ${index}: completed-frame progress regressed`);
  if (identityKey(previous.rootProcess) !== identityKey(current.rootProcess)) {
    reasons.push(`sample ${index}: Chromium root changed during the render`);
  }
  const oldProcesses = new Map(previous.processes.map((process) => [identityKey(process), process]));
  const newProcesses = new Map(current.processes.map((process) => [identityKey(process), process]));
  for (const [key, process] of oldProcesses) {
    const next = newProcesses.get(key);
    if (!next && !explainedChange(changes, process, 'exit', previous.timestampMs, current.timestampMs)) {
      reasons.push(`sample ${index}: unexplained process exit or PID reuse`);
    }
    if (next) {
      let role = process.role;
      for (const event of changes) {
        if (event.change !== 'exec' || identityKey(event) !== key
          || event.timestampMs <= previous.timestampMs || event.timestampMs > current.timestampMs) continue;
        if (event.previousRole !== role) reasons.push(`sample ${index}: exec role does not match its prior observed role`);
        role = event.role;
      }
      if (next.parentPid !== process.parentPid || next.role !== role) {
        reasons.push(`sample ${index}: process ancestry or role changed without stable identity evidence`);
      }
    }
  }
  for (const [key, process] of newProcesses) {
    if (!oldProcesses.has(key) && !explainedChange(changes, process, 'start', previous.timestampMs, current.timestampMs)) {
      reasons.push(`sample ${index}: unexplained process start or PID reuse`);
    }
  }
}

/** Requires a nonempty finite series, enforced at callers after coverage validation. */
function percentile(values: readonly number[], fraction: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * fraction;
  const lower = sorted[Math.floor(position)];
  const upper = sorted[Math.ceil(position)];
  if (lower === undefined || upper === undefined) throw new Error('Internal error: empty percentile series');
  return lower + (upper - lower) * (position - Math.floor(position));
}

function range(values: readonly number[]): number {
  return Math.max(...values) - Math.min(...values);
}

/**
 * Classifies supplied current-RSS evidence, not cumulative peaks. Sum RSS may
 * count shared pages more than once. PASS covers this RAM rubric only and never
 * proves crash=0, MP4 integrity, visual acceptance or permission to open WP-005.
 * Invalid or incomplete evidence takes precedence over a measured leak result.
 * P95 uses linear interpolation at (n-1)*0.95; no warm-up samples are discarded.
 * A sample at completedFrames=N>0 belongs to the window containing source frame
 * N-1: completed300 is in window1 and completed301 in window2. Initial/stalled
 * completed0 samples remain in window1; completed5400 is in window18.
 */
export function classifyMemory(value: unknown): MemoryResult {
  if (!isRecord(value) || !Array.isArray(value.samples) || !Array.isArray(value.processChanges)) {
    return incomplete(['Malformed memory evidence: expected finite timestamps, progress, process identities, RSS and lifecycle records']);
  }
  // Array.from materializes sparse-array holes as undefined so every() cannot
  // silently skip missing records supplied by an in-memory caller.
  const rawSamples: unknown[] = Array.from(value.samples);
  const rawChanges: unknown[] = Array.from(value.processChanges);
  if (!rawSamples.every(isSample) || !rawChanges.every(isProcessChange)) {
    return incomplete(['Malformed memory evidence: expected dense arrays and complete finite measurement records']);
  }
  const samples: MemorySample[] = rawSamples;
  const changes: ProcessChange[] = rawChanges;
  const first = samples[0];
  const last = samples.at(-1);
  if (!first || !last) return incomplete(['Memory timeline is empty']);
  const reasons: string[] = [];
  if (first.completedFrames !== 0) reasons.push('Missing initial frame-progress observation at 0');
  if (last.completedFrames !== BENCHMARK_SPEC.frameCount) reasons.push('Missing final frame-progress observation at 5400');
  for (const [index, sample] of samples.entries()) {
    validateTree(sample, index, reasons);
    const previous = samples[index - 1];
    if (previous) validateTransition(previous, sample, changes, index, reasons);
  }
  const eventKeys = new Set<string>();
  const rootIdentities = new Set(samples.map((sample) => identityKey(sample.rootProcess)));
  const liveIdentitiesByPid = new Map(first.processes.map((process) => [process.pid, identityKey(process)]));
  const exitedIdentities = new Set<string>();
  for (const [eventIndex, event] of changes.entries()) {
    const previousEvent = changes[eventIndex - 1];
    if (previousEvent && event.timestampMs < previousEvent.timestampMs) {
      reasons.push('Lifecycle events are not in chronological order');
    }
    const identity = identityKey(event);
    if (rootIdentities.has(identity) && (event.change !== 'start' || event.timestampMs > first.timestampMs)) {
      reasons.push('Observed root exit, exec or later root start contradicts an uninterrupted live-browser timeline');
    }
    if (event.timestampMs <= first.timestampMs) {
      const initiallyPresent = first.processes.some((process) => identityKey(process) === identity);
      if (event.change !== 'start' || !initiallyPresent) {
        reasons.push('Pre-timeline lifecycle record is not an initial start of an observed process');
      }
      const initialKey = `initial:${identity}:${event.change}`;
      if (eventKeys.has(initialKey)) reasons.push('Repeated lifecycle record for the same initial process');
      eventKeys.add(initialKey);
      continue;
    }
    if (event.timestampMs > last.timestampMs) {
      reasons.push('Lifecycle event lies after the observed timeline');
      continue;
    }
    if (event.change === 'start') {
      if (liveIdentitiesByPid.has(event.pid)) reasons.push('Process start occurs before the previous identity with that PID exited');
      if (exitedIdentities.has(identity)) reasons.push('An exited process identity cannot start or reappear again');
      liveIdentitiesByPid.set(event.pid, identity);
    } else if (event.change === 'exit') {
      if (liveIdentitiesByPid.get(event.pid) !== identity) reasons.push('Process exit does not match the live identity for its PID');
      liveIdentitiesByPid.delete(event.pid);
      exitedIdentities.add(identity);
    } else if (liveIdentitiesByPid.get(event.pid) !== identity) {
      reasons.push('Process exec does not match the live identity for its PID');
    }
    const nextIndex = samples.findIndex((sample) => sample.timestampMs >= event.timestampMs);
    const previousSample = samples[nextIndex - 1];
    const nextSample = samples[nextIndex];
    if (!previousSample || !nextSample) {
      reasons.push('Lifecycle event has no adjacent sampled inventories');
      continue;
    }
    const wasPresent = previousSample.processes.some((process) => identityKey(process) === identity);
    const isPresent = nextSample.processes.some((process) => identityKey(process) === identity);
    const corresponds = event.change === 'start' ? !wasPresent && isPresent
      : event.change === 'exit' ? wasPresent && !isPresent : wasPresent && isPresent;
    if (!corresponds) reasons.push('Lifecycle event contradicts sampled process identities or has no sampled transition');
    const eventKey = `${nextIndex}:${identity}:${event.change}`;
    if (eventKeys.has(eventKey)) reasons.push('Multiple lifecycle records claim the same observed process transition');
    eventKeys.add(eventKey);
  }

  const windows: MemoryWindow[] = [];
  for (let index = 0; index < MEMORY_POLICY.windowCount; index += 1) {
    const windowSamples = samples.filter((sample) => Math.max(
      0, Math.ceil(sample.completedFrames / MEMORY_POLICY.windowFrames) - 1,
    ) === index);
    const start = windowSamples[0];
    const end = windowSamples.at(-1);
    if (!start || !end) {
      reasons.push(`window ${index + 1}: missing all observations`);
      continue;
    }
    const distinctProgressCount = new Set(windowSamples.map((sample) => sample.completedFrames)).size;
    const totals = windowSamples.map((sample) => sample.processes.reduce((sum, process) => sum + process.rssBytes, 0));
    windows.push({
      index: index + 1,
      firstFrame: index * MEMORY_POLICY.windowFrames,
      lastFrame: (index + 1) * MEMORY_POLICY.windowFrames - 1,
      firstCompletedFrames: start.completedFrames, lastCompletedFrames: end.completedFrames,
      sampleCount: windowSamples.length, distinctProgressCount,
      medianRssBytes: percentile(totals, 0.5), p95RssBytes: percentile(totals, 0.95),
    });
  }
  if (reasons.length > 0) return incomplete(reasons);

  const medians = windows.map((window) => window.medianRssBytes);
  const baseline = percentile(medians.slice(0, 3), 0.5);
  const epsilonBytes = Math.max(MEMORY_POLICY.minimumEpsilonBytes, MEMORY_POLICY.relativeEpsilon * baseline);
  const growthBytes = percentile(medians.slice(-3), 0.5) - baseline;
  const slopes: number[] = [];
  for (const [index, left] of medians.entries()) {
    for (let rightIndex = index + 1; rightIndex < medians.length; rightIndex += 1) {
      const right = medians[rightIndex];
      if (right !== undefined) slopes.push((right - left) / (rightIndex - index));
    }
  }
  const theilSenGrowthBytes = percentile(slopes, 0.5) * (MEMORY_POLICY.windowCount - 1);
  const finalMedianRangeBytes = range(medians.slice(-6));
  const finalP95RangeBytes = range(windows.slice(-6).map((window) => window.p95RssBytes));
  const metrics: MemoryMetrics = { epsilonBytes, growthBytes, theilSenGrowthBytes, finalMedianRangeBytes, finalP95RangeBytes };
  if (growthBytes > 2 * epsilonBytes && theilSenGrowthBytes > 2 * epsilonBytes) {
    return { classification: 'FAIL', reasons: ['Sustained RSS growth exceeds both predeclared leak thresholds'], windows, metrics };
  }
  // Epsilon distinguishes a clear failure and bounds tail variability. It is
  // not a budget that permits positive drift to pass the no-monotonic-growth AC.
  // Check both timelines: endpoint steps can be hidden by robust window medians
  // and by the median of pairwise slopes, even when every raw sample increases.
  const rawTotals = samples.map((sample) => sample.processes.reduce((sum, process) => sum + process.rssBytes, 0));
  const nondecreasingGrowth = [medians, rawTotals].some((series) => {
    const start = series[0];
    const end = series.at(-1);
    return start !== undefined && end !== undefined && end > start
      && series.every((current, index) => index === 0 || current >= (series[index - 1] ?? current));
  });
  if (growthBytes > 0 || theilSenGrowthBytes > 0 || nondecreasingGrowth) {
    return { classification: 'INCONCLUSIVE', reasons: ['Positive RSS drift or nondecreasing growth cannot establish stable memory, even below epsilon'], windows, metrics };
  }
  if (growthBytes <= 0 && theilSenGrowthBytes <= 0
    && finalMedianRangeBytes <= epsilonBytes && finalP95RangeBytes <= 2 * epsilonBytes) {
    return { classification: 'PASS', reasons: ['Complete supplied evidence satisfies the predeclared RAM rubric'], windows, metrics };
  }
  return { classification: 'INCONCLUSIVE', reasons: ['Measured RSS falls between the PASS and FAIL criteria'], windows, metrics };
}

export interface EvidenceReference {
  readonly id: string;
  readonly sha256: string;
}

export interface BenchmarkBinding {
  readonly repository: 'HungQuach301/meridian-studio';
  readonly benchmarkId: string;
  readonly sourceCommitSha: string;
  readonly fixtureSha256: string;
  readonly lockfileSha256: string;
  readonly browserSha256: string;
  readonly fontManifestSha256: string;
  readonly encodingSha256: string;
  readonly environmentSha256: string;
  readonly runnerJobId: string;
  readonly clockId: string;
}

export interface ReadinessEvidence {
  readonly resolved: boolean;
  readonly evidence: EvidenceReference;
}

export const PREFLIGHT_REQUIREMENTS = Object.freeze([
  'dependencies', 'browser', 'fonts', 'license', 'cost', 'storage', 'crashObserver', 'mp4Inspector',
] as const);

export interface BenchmarkLimits {
  readonly maximumJobMinutes: number;
  readonly maximumCostUsd: number;
}

export interface BenchmarkPreflight {
  readonly configuration: unknown;
  readonly binding: BenchmarkBinding;
  readonly requirements: Readonly<Record<(typeof PREFLIGHT_REQUIREMENTS)[number], ReadinessEvidence>>;
  readonly unresolvedDependencyCount: number;
  readonly unapprovedDependencyCount: number;
  readonly limits: BenchmarkLimits;
  readonly benchmarkAuthorization: {
    readonly scope: 'WP-004a-benchmark';
    readonly approved: boolean;
    readonly repository: 'HungQuach301/meridian-studio';
    readonly benchmarkId: string;
    readonly sourceCommitSha: string;
    readonly configuration: unknown;
    readonly benchmarkCount: 1;
    readonly renderCount: 2;
    readonly attempt: 1;
    readonly limits: BenchmarkLimits;
    readonly evidence: EvidenceReference;
  };
}

export interface PreflightResult {
  readonly readyForReview: boolean;
  /** Record consistency is never authority to dispatch or spend. */
  readonly authorizesExecution: false;
  readonly reasons: readonly string[];
}

function nonemptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function sha256(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
}

function sha1(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{40}$/.test(value);
}

function isEvidenceReference(value: unknown): value is JsonRecord & EvidenceReference {
  return isRecord(value) && nonemptyText(value.id) && sha256(value.sha256);
}

function isBinding(value: unknown): value is JsonRecord & BenchmarkBinding {
  return isRecord(value) && value.repository === 'HungQuach301/meridian-studio'
    && nonemptyText(value.benchmarkId) && sha1(value.sourceCommitSha)
    && sha256(value.fixtureSha256) && sha256(value.lockfileSha256) && sha256(value.browserSha256)
    && sha256(value.fontManifestSha256) && sha256(value.encodingSha256) && sha256(value.environmentSha256)
    && nonemptyText(value.runnerJobId) && nonemptyText(value.clockId);
}

function isLimits(value: unknown): value is JsonRecord & BenchmarkLimits {
  return isRecord(value) && finiteNonnegative(value.maximumJobMinutes) && value.maximumJobMinutes > 0
    && finiteNonnegative(value.maximumCostUsd);
}

/**
 * Checks a supplied preflight record without resolving dependencies, fetching
 * binaries or authenticating approval/evidence references. A complete record is
 * ready for human review only. Actual owner authority remains outside this core.
 */
export function validateBenchmarkPreflight(value: unknown): PreflightResult {
  const reasons: string[] = [];
  if (!isRecord(value)) return { readyForReview: false, authorizesExecution: false, reasons: ['Preflight record is missing'] };
  reasons.push(...validateBenchmarkConfig(value.configuration).reasons);
  if (!isBinding(value.binding)) reasons.push('Source, asset, environment, runner or clock binding is missing or malformed');
  for (const name of PREFLIGHT_REQUIREMENTS) {
    const requirement = isRecord(value.requirements) ? value.requirements[name] : undefined;
    if (!isRecord(requirement) || requirement.resolved !== true || !isEvidenceReference(requirement.evidence)) {
      reasons.push(`Preflight requirement ${name} is unresolved or lacks evidence`);
    }
  }
  if (value.unresolvedDependencyCount !== 0 || value.unapprovedDependencyCount !== 0) reasons.push('Unresolved or unapproved dependencies remain');
  if (!isLimits(value.limits)) reasons.push('Explicit job and cost limits are missing or malformed');
  const authorization = value.benchmarkAuthorization;
  if (!isRecord(authorization) || authorization.scope !== 'WP-004a-benchmark' || authorization.approved !== true
    || authorization.benchmarkCount !== 1 || authorization.renderCount !== 2 || authorization.attempt !== 1
    || !isEvidenceReference(authorization.evidence) || !validateBenchmarkConfig(authorization.configuration).valid) {
    reasons.push('A separate, evidence-linked authorization for exactly one two-render benchmark attempt is missing');
  } else {
    if (!isBinding(value.binding) || authorization.repository !== value.binding.repository
      || authorization.benchmarkId !== value.binding.benchmarkId || authorization.sourceCommitSha !== value.binding.sourceCommitSha) {
      reasons.push('Benchmark authorization is not bound to this repository, source and benchmark');
    }
    if (!isLimits(authorization.limits) || !isLimits(value.limits)
      || authorization.limits.maximumJobMinutes !== value.limits.maximumJobMinutes
      || authorization.limits.maximumCostUsd !== value.limits.maximumCostUsd) {
      reasons.push('Benchmark authorization and preflight cost/job limits do not match');
    }
  }
  return { readyForReview: reasons.length === 0, authorizesExecution: false, reasons };
}

export interface ExactMp4Evidence {
  readonly evidence: EvidenceReference;
  readonly mp4: EvidenceReference;
  readonly decodedFrameCount: number;
  readonly fpsNumerator: number;
  readonly fpsDenominator: number;
  readonly width: number;
  readonly height: number;
  /** Whole-container duration; the inspector must not substitute video-stream duration. */
  readonly durationNumerator: number;
  readonly durationDenominator: number;
  /** Raw decoded presentation timestamps and durations; average FPS is insufficient. */
  readonly frameTiming: DecodedFrameTiming;
}

export interface RenderAcceptanceEvidence {
  readonly variant: 'static' | 'dynamic';
  readonly binding: BenchmarkBinding;
  readonly browserInstanceId: string;
  readonly progress: {
    readonly evidence: EvidenceReference;
    readonly renderedFrames: number;
    readonly encodedFrames: number;
    readonly concurrency: number;
    readonly everyFrameRendered: boolean;
  };
  readonly timing: {
    readonly evidence: EvidenceReference;
    readonly startedAtMs: number;
    readonly completedAtMs: number;
    readonly boundary: 'browser-open-to-mp4-and-browser-close';
  };
  readonly mp4: ExactMp4Evidence;
  readonly memory: { readonly evidence: EvidenceReference; readonly raw: MemoryEvidence };
  readonly crashObservation: {
    readonly evidence: EvidenceReference;
    readonly independent: boolean;
    readonly complete: boolean;
    readonly method: 'process-lifecycle';
    readonly crashedProcesses: number;
    readonly unexpectedRestarts: number;
    /** A deliberate final close after rendering is excluded from crash counts. */
    readonly expectedFinalCloseExcluded: boolean;
  };
}

export interface OwnerVisualEvidence {
  readonly evidence: EvidenceReference;
  readonly reviewedBy: 'owner';
  readonly basedOn: 'both-full-mp4s';
  readonly staticMp4Sha256: string;
  readonly dynamicMp4Sha256: string;
  readonly continuity: boolean;
  readonly fiveRegions: boolean;
  readonly parallax: boolean;
  readonly morph: boolean;
  readonly blur: boolean;
}

export interface BenchmarkAcceptanceEvidence {
  readonly preflight: BenchmarkPreflight;
  readonly renders: readonly RenderAcceptanceEvidence[];
  readonly jobTiming: {
    readonly evidence: EvidenceReference;
    readonly binding: BenchmarkBinding;
    /** Complete observed job boundary, including setup, inspection, storage and cleanup. */
    readonly boundary: 'job-start-through-final-cleanup';
    readonly complete: boolean;
    readonly startedAtMs: number;
    readonly completedAtMs: number;
  };
  readonly visualReview: OwnerVisualEvidence;
}

export interface AcceptanceGate {
  readonly name: string;
  readonly classification: Classification;
  readonly reason: string;
}

export interface BenchmarkAcceptanceResult {
  readonly classification: Classification;
  readonly gates: readonly AcceptanceGate[];
  readonly memory: Readonly<{ static: MemoryResult | null; dynamic: MemoryResult | null }>;
  readonly authorizesExecution: false;
  readonly opensWp005: false;
}

function nonnegativeInteger(value: unknown): value is number {
  return finiteNonnegative(value) && Number.isSafeInteger(value);
}

function bindingsMatch(actual: unknown, expected: unknown): boolean {
  if (!isBinding(actual) || !isBinding(expected)) return false;
  return Object.keys(expected).every((key) => actual[key] === expected[key]);
}

function isMp4(value: unknown): value is JsonRecord & ExactMp4Evidence {
  return isRecord(value) && isEvidenceReference(value.evidence) && isEvidenceReference(value.mp4)
    && nonnegativeInteger(value.decodedFrameCount) && positiveInteger(value.fpsNumerator)
    && positiveInteger(value.fpsDenominator) && positiveInteger(value.width) && positiveInteger(value.height)
    && positiveInteger(value.durationNumerator) && positiveInteger(value.durationDenominator);
}

function isTiming(value: unknown): value is JsonRecord & RenderAcceptanceEvidence['timing'] {
  return isRecord(value) && isEvidenceReference(value.evidence) && finiteNonnegative(value.startedAtMs)
    && finiteNonnegative(value.completedAtMs) && value.completedAtMs > value.startedAtMs
    && value.boundary === 'browser-open-to-mp4-and-browser-close';
}

function initialRoot(render: JsonRecord): ProcessIdentity | null {
  const memory = render.memory;
  if (!isRecord(memory) || !isRecord(memory.raw) || !Array.isArray(memory.raw.samples)) return null;
  const sample: unknown = memory.raw.samples[0];
  return isSample(sample) ? sample.rootProcess : null;
}

/**
 * Evaluates consistency of supplied records, not their authenticity. Recomputes
 * both RAM results from raw samples; a caller's precomputed PASS is never used.
 * Missing/invalid evidence dominates aggregate status, while known failures stay
 * visible in individual gates. A complete PASS still cannot dispatch, close the
 * WP or open WP-005; owner decisions and ADR-0007 remain separate.
 */
export function evaluateBenchmarkAcceptance(value: unknown): BenchmarkAcceptanceResult {
  const gates: AcceptanceGate[] = [];
  const memory: { static: MemoryResult | null; dynamic: MemoryResult | null } = { static: null, dynamic: null };
  const gate = (name: string, classification: Classification, reason: string): void => { gates.push({ name, classification, reason }); };
  const result = (): BenchmarkAcceptanceResult => ({
    classification: gates.some((item) => item.classification === 'INCONCLUSIVE') ? 'INCONCLUSIVE'
      : gates.some((item) => item.classification === 'FAIL') ? 'FAIL' : 'PASS',
    gates, memory, authorizesExecution: false, opensWp005: false,
  });
  if (!isRecord(value)) {
    gate('evidence', 'INCONCLUSIVE', 'Benchmark evidence is missing');
    return result();
  }
  const preflight = validateBenchmarkPreflight(value.preflight);
  gate('preflight', preflight.readyForReview ? 'PASS' : 'INCONCLUSIVE', preflight.readyForReview
    ? 'Supplied preflight record is complete for review' : preflight.reasons.join('; '));
  const expectedBinding = isRecord(value.preflight) ? value.preflight.binding : undefined;
  const jobTiming = value.jobTiming;
  const jobStart = isRecord(jobTiming) && finiteNonnegative(jobTiming.startedAtMs) ? jobTiming.startedAtMs : NaN;
  const jobEnd = isRecord(jobTiming) && finiteNonnegative(jobTiming.completedAtMs) ? jobTiming.completedAtMs : NaN;
  const jobTimingValid = isRecord(jobTiming) && isEvidenceReference(jobTiming.evidence)
    && bindingsMatch(jobTiming.binding, expectedBinding) && jobTiming.complete === true
    && jobTiming.boundary === 'job-start-through-final-cleanup'
    && finiteNonnegative(jobTiming.startedAtMs) && finiteNonnegative(jobTiming.completedAtMs)
    && jobTiming.completedAtMs > jobTiming.startedAtMs;
  gate('job-timing', jobTimingValid ? 'PASS' : 'INCONCLUSIVE',
    'Complete job timing must include setup, bundle, MP4 inspection, evidence storage and cleanup on the bound runner and clock');
  const jobLimits = isRecord(value.preflight) ? value.preflight.limits : undefined;
  gate('job-time-limit', !jobTimingValid || !isLimits(jobLimits) ? 'INCONCLUSIVE'
    : jobEnd - jobStart <= jobLimits.maximumJobMinutes * 60 * 1000 ? 'PASS' : 'FAIL',
  'The complete observed job duration must fit the separately declared job limit; render duration alone is insufficient');
  const renders: unknown[] = Array.isArray(value.renders) ? Array.from(value.renders) : [];
  if (renders.length !== 2 || !renders.every(isRecord) || renders[0]?.variant !== 'static' || renders[1]?.variant !== 'dynamic') {
    gate('render-pair', 'INCONCLUSIVE', 'Exactly one static record followed by one dynamic record is required');
  }
  const records = renders.filter(isRecord);
  const staticRender = records.find((record) => record.variant === 'static');
  const dynamicRender = records.find((record) => record.variant === 'dynamic');
  for (const render of [staticRender, dynamicRender]) {
    if (!render) continue;
    const variant = render.variant === 'static' ? 'static' : 'dynamic';
    gate(`${variant}.binding`, bindingsMatch(render.binding, expectedBinding) ? 'PASS' : 'INCONCLUSIVE',
      'Render must match the expected source, assets, environment, runner and clock');
    const progress = render.progress;
    const progressValid = isRecord(progress) && isEvidenceReference(progress.evidence)
      && nonnegativeInteger(progress.renderedFrames) && nonnegativeInteger(progress.encodedFrames)
      && positiveInteger(progress.concurrency) && typeof progress.everyFrameRendered === 'boolean';
    gate(`${variant}.progress`, !progressValid ? 'INCONCLUSIVE'
      : progress.renderedFrames === 5400 && progress.encodedFrames === 5400 && progress.concurrency === 1 && progress.everyFrameRendered ? 'PASS' : 'FAIL',
    'Both variants must actually render and encode all 5400 frames with concurrency 1');

    const mp4 = render.mp4;
    const mediaValid = isMp4(mp4);
    const exactMedia = mediaValid && mp4.decodedFrameCount === 5400 && mp4.width === 1920 && mp4.height === 1080
      && BigInt(mp4.fpsNumerator) === 30n * BigInt(mp4.fpsDenominator)
      && BigInt(mp4.durationNumerator) === 180n * BigInt(mp4.durationDenominator);
    gate(`${variant}.mp4`, !mediaValid ? 'INCONCLUSIVE' : exactMedia ? 'PASS' : 'FAIL',
      'Decoded MP4 must contain exactly 5400 frames at 30 fps, 1920x1080 and 180 seconds');
    const cadence = evaluateFrameCadence(isRecord(mp4) ? mp4.frameTiming : undefined);
    gate(`${variant}.frame-cadence`, cadence.classification, cadence.reasons.join('; '));

    gate(`${variant}.timing`, isTiming(render.timing) ? 'PASS' : 'INCONCLUSIVE',
      'Evidence must use the fixed browser-open through MP4-complete and browser-close timer boundary');
    gate(`${variant}.job-coverage`, jobTimingValid && isTiming(render.timing)
      && jobStart <= render.timing.startedAtMs && jobEnd >= render.timing.completedAtMs
      ? 'PASS' : 'INCONCLUSIVE', 'The complete job interval must enclose this render interval on the same bound clock');
    const suppliedMemory = render.memory;
    const ram = isRecord(suppliedMemory) && isEvidenceReference(suppliedMemory.evidence) ? classifyMemory(suppliedMemory.raw) : null;
    memory[variant] = ram;
    gate(`${variant}.memory`, ram?.classification ?? 'INCONCLUSIVE', ram ? ram.reasons.join('; ') : 'Raw memory evidence and its reference are required');
    if (ram && isRecord(suppliedMemory) && isRecord(suppliedMemory.raw) && Array.isArray(suppliedMemory.raw.samples)
      && isTiming(render.timing)) {
      const firstSample: unknown = suppliedMemory.raw.samples[0];
      const lastSample: unknown = suppliedMemory.raw.samples.at(-1);
      gate(`${variant}.memory-clock`, isSample(firstSample) && isSample(lastSample)
        && firstSample.timestampMs >= render.timing.startedAtMs && lastSample.timestampMs <= render.timing.completedAtMs ? 'PASS' : 'INCONCLUSIVE',
      'RAM timestamps must fall inside this render timer on the bound monotonic clock');
    }
    const crashes = render.crashObservation;
    const crashValid = isRecord(crashes) && isEvidenceReference(crashes.evidence) && crashes.independent === true
      && crashes.complete === true && crashes.method === 'process-lifecycle' && crashes.expectedFinalCloseExcluded === true
      && nonnegativeInteger(crashes.crashedProcesses) && nonnegativeInteger(crashes.unexpectedRestarts);
    gate(`${variant}.crashes`, !crashValid ? 'INCONCLUSIVE'
      : crashes.crashedProcesses === 0 && crashes.unexpectedRestarts === 0 ? 'PASS' : 'FAIL',
    'Independent complete lifecycle observation must find zero crashes and zero unexpected restarts; deliberate final close is excluded');
  }
  const staticRoot = staticRender ? initialRoot(staticRender) : null;
  const dynamicRoot = dynamicRender ? initialRoot(dynamicRender) : null;
  const fresh = staticRender !== undefined && dynamicRender !== undefined
    && nonemptyText(staticRender.browserInstanceId) && nonemptyText(dynamicRender.browserInstanceId)
    && staticRender.browserInstanceId !== dynamicRender.browserInstanceId
    && staticRoot !== null && dynamicRoot !== null && identityKey(staticRoot) !== identityKey(dynamicRoot);
  gate('fresh-browsers', fresh ? 'PASS' : 'INCONCLUSIVE', 'Both instance labels and observed Chromium root identities must establish separate browsers on the bound runner');
  if (staticRender && dynamicRender && isMp4(staticRender.mp4) && isMp4(dynamicRender.mp4)) {
    gate('distinct-mp4s', staticRender.mp4.mp4.sha256 !== dynamicRender.mp4.mp4.sha256 ? 'PASS' : 'INCONCLUSIVE',
      'Identical MP4 bytes cannot establish separate static and moving outputs');
  }
  if (staticRender && dynamicRender && isTiming(staticRender.timing) && isTiming(dynamicRender.timing)) {
    const staticMs = staticRender.timing.completedAtMs - staticRender.timing.startedAtMs;
    const dynamicMs = dynamicRender.timing.completedAtMs - dynamicRender.timing.startedAtMs;
    gate('sequential-renders', dynamicRender.timing.startedAtMs >= staticRender.timing.completedAtMs ? 'PASS' : 'FAIL',
      'The dynamic render must start after the static render completes on the same runner');
    gate('dynamic-time', dynamicMs <= 25 * 60 * 1000 ? 'PASS' : 'FAIL', 'Dynamic render duration must not exceed 25 minutes');
    gate('dynamic-static-ratio', dynamicMs <= 3 * staticMs ? 'PASS' : 'FAIL', 'Dynamic duration must not exceed three times static duration');
    const limits = isRecord(value.preflight) ? value.preflight.limits : undefined;
    if (isLimits(limits)) {
      const observedSpanMs = Math.max(staticRender.timing.completedAtMs, dynamicRender.timing.completedAtMs)
        - Math.min(staticRender.timing.startedAtMs, dynamicRender.timing.startedAtMs);
      gate('observed-job-span', observedSpanMs <= limits.maximumJobMinutes * 60 * 1000 ? 'PASS' : 'FAIL',
        'Observed render span must fit the declared job limit; this does not establish unmeasured setup time or cost');
    }
  } else {
    gate('timing-thresholds', 'INCONCLUSIVE', 'Both valid timer records are needed for duration and ratio');
  }
  const review = value.visualReview;
  const visualFields = ['continuity', 'fiveRegions', 'parallax', 'morph', 'blur'] as const;
  const visualValid = isRecord(review) && isEvidenceReference(review.evidence) && review.reviewedBy === 'owner'
    && review.basedOn === 'both-full-mp4s' && staticRender !== undefined && dynamicRender !== undefined
    && isMp4(staticRender.mp4) && isMp4(dynamicRender.mp4)
    && review.staticMp4Sha256 === staticRender.mp4.mp4.sha256 && review.dynamicMp4Sha256 === dynamicRender.mp4.mp4.sha256
    && visualFields.every((name) => typeof review[name] === 'boolean');
  gate('owner-visual-review', !visualValid ? 'INCONCLUSIVE' : visualFields.every((name) => review[name] === true) ? 'PASS' : 'FAIL',
    'Owner review of both bound full MP4s must accept continuity, five regions, parallax, morph and blur');
  return result();
}

export type EvidenceParseResult<T> =
  | { readonly valid: true; readonly value: T; readonly reasons: readonly string[] }
  | { readonly valid: false; readonly value: null; readonly reasons: readonly string[] };

function parseFailure<T>(reason: string): EvidenceParseResult<T> {
  return { valid: false, value: null, reasons: [reason] };
}

function decimalInteger(value: unknown): value is string {
  return typeof value === 'string' && /^(0|-?[1-9][0-9]*)$/.test(value);
}

function unsignedDecimal(value: unknown): value is string {
  return typeof value === 'string' && /^(0|[1-9][0-9]*)$/.test(value);
}

function positiveDecimal(value: unknown): value is string {
  return typeof value === 'string' && /^[1-9][0-9]*$/.test(value);
}

function safeDecimalNumber(value: unknown): number | null {
  if (!unsignedDecimal(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export interface ProcStatFields extends ProcessIdentity {
  readonly command: string;
  readonly state: string;
  readonly parentPid: number;
  /** Kept as page counts; no page-size assumption and never substituted for VmRSS. */
  readonly rssPages: string;
}

/** Pure decoder of Linux procfs stat. The command field may contain spaces and ')'. */
export function parseProcStat(value: unknown): EvidenceParseResult<ProcStatFields> {
  if (typeof value !== 'string') return parseFailure('Process stat text is missing');
  const prefix = /^([1-9][0-9]*) \(/.exec(value);
  const closing = value.lastIndexOf(')');
  if (!prefix || closing < prefix[0].length || value[closing + 1] !== ' ') return parseFailure('Malformed process stat command boundary');
  const pid = safeDecimalNumber(prefix[1]);
  const fields = value.slice(closing + 2).trim().split(/\s+/);
  const state = fields[0];
  const parentPid = safeDecimalNumber(fields[1]);
  const startTimeTicks = fields[19];
  const rssPages = fields[21];
  if (pid === null || pid === 0 || fields.length < 22 || typeof state !== 'string'
    || !/^[RSDZTtXxKWPI]$/.test(state) || parentPid === null || !unsignedDecimal(startTimeTicks)
    || !unsignedDecimal(rssPages) || !fields.slice(1).every(decimalInteger)) {
    return parseFailure('Process stat fields, PID, start time or current RSS pages are malformed');
  }
  return { valid: true, reasons: [], value: {
    pid, command: value.slice(prefix[0].length, closing), state, parentPid, startTimeTicks, rssPages,
  } };
}

export interface ProcStatusFields {
  readonly pid: number;
  readonly threadGroupId: number;
  readonly parentPid: number;
  readonly state: string;
  readonly rssBytes: number;
}

/** Reads current VmRSS in kernel kB units (1024 bytes), never VmHWM or VmPeak. */
export function parseProcStatus(value: unknown): EvidenceParseResult<ProcStatusFields> {
  if (typeof value !== 'string') return parseFailure('Process status text is missing');
  const wanted = new Set(['Pid', 'Tgid', 'PPid', 'State', 'VmRSS']);
  const fields = new Map<string, string>();
  for (const line of value.split('\n')) {
    const match = /^([^:\s]+):\s*(.*?)\s*$/.exec(line);
    const key = match?.[1];
    const field = match?.[2];
    if (key === undefined || field === undefined || !wanted.has(key)) continue;
    if (fields.has(key)) return parseFailure(`Duplicate process status field ${key}`);
    fields.set(key, field);
  }
  const pid = safeDecimalNumber(fields.get('Pid'));
  const threadGroupId = safeDecimalNumber(fields.get('Tgid'));
  const parentPid = safeDecimalNumber(fields.get('PPid'));
  const state = /^([RSDZTtXxKWPI])(?:\s+\([^\n]*\))?$/.exec(fields.get('State') ?? '')?.[1];
  const rssKiB = safeDecimalNumber(/^(0|[1-9][0-9]*)\s+kB$/.exec(fields.get('VmRSS') ?? '')?.[1]);
  if (pid === null || pid === 0 || threadGroupId === null || threadGroupId === 0 || parentPid === null
    || state === undefined || rssKiB === null || !Number.isSafeInteger(rssKiB * 1024)) {
    return parseFailure('Required process status identity, state or current VmRSS is missing or malformed');
  }
  return { valid: true, reasons: [], value: { pid, threadGroupId, parentPid, state, rssBytes: rssKiB * 1024 } };
}

export interface ParsedProcessRss {
  readonly process: ProcessRss;
  /** Cross-file identity checks cannot prove a complete tree or all short-lived events. */
  readonly treeComplete: false;
  readonly crashObservationComplete: false;
  readonly accounting: 'linux-asynchronous-current-rss';
}

/**
 * Decodes a supplied stat-before/status/stat-after read sequence. The actual
 * collector must retain read errors and order; this function performs no reads.
 * Matching identities reduce races but do not make a procfs inventory atomic.
 */
export function parseProcessRssObservation(value: unknown): EvidenceParseResult<ParsedProcessRss> {
  if (!isRecord(value) || !isIdentity(value.expectedIdentity) || !isRole(value.role)) {
    return parseFailure('Expected process identity or independently established role is missing');
  }
  const before = parseProcStat(value.statBefore);
  const status = parseProcStatus(value.status);
  const after = parseProcStat(value.statAfter);
  if (!before.valid || !status.valid || !after.valid) return parseFailure('Missing or malformed procfs read; a vanished process is not zero RSS');
  if (identityKey(before.value) !== identityKey(value.expectedIdentity)
    || identityKey(after.value) !== identityKey(value.expectedIdentity)
    || status.value.pid !== before.value.pid || status.value.threadGroupId !== before.value.pid
    || before.value.parentPid !== after.value.parentPid || status.value.parentPid !== before.value.parentPid) {
    return parseFailure('PID reuse, mismatched thread identity or parent change during procfs reads');
  }
  if ([before.value.state, status.value.state, after.value.state].some((state) => /^[ZXx]$/.test(state))) {
    return parseFailure('Zombie or dead process requires lifecycle evidence, not a live RSS sample');
  }
  if (value.role === 'browser' && status.value.rssBytes === 0) return parseFailure('Zero RSS cannot establish a live browser root');
  return { valid: true, reasons: [], value: {
    process: { ...value.expectedIdentity, parentPid: status.value.parentPid === 0 ? null : status.value.parentPid,
      rssBytes: status.value.rssBytes, role: value.role },
    treeComplete: false, crashObservationComplete: false, accounting: 'linux-asynchronous-current-rss',
  } };
}

export interface ExactRational {
  readonly numerator: string;
  readonly denominator: string;
}

function parsePositiveRational(value: unknown): ExactRational | null {
  if (typeof value !== 'string') return null;
  const parts = value.split('/');
  if (parts.length !== 2 || !positiveDecimal(parts[0]) || !positiveDecimal(parts[1])) return null;
  return { numerator: parts[0], denominator: parts[1] };
}

export interface DecodedFrameTiming {
  readonly timeBase: ExactRational;
  /** Integers in stream time-base units; retain strings to avoid precision loss. */
  readonly presentationTimestamps: readonly string[];
  readonly durations: readonly string[];
}

export interface FrameCadenceResult {
  readonly classification: Classification;
  readonly reasons: readonly string[];
}

/** Checks every decoded PTS gap and duration with integer arithmetic, not average FPS. */
export function evaluateFrameCadence(value: unknown): FrameCadenceResult {
  const unknown = (reason: string): FrameCadenceResult => ({ classification: 'INCONCLUSIVE', reasons: [reason] });
  if (!isRecord(value) || !isRecord(value.timeBase) || !positiveDecimal(value.timeBase.numerator)
    || !positiveDecimal(value.timeBase.denominator) || !Array.isArray(value.presentationTimestamps)
    || !Array.isArray(value.durations) || value.presentationTimestamps.length !== 5400 || value.durations.length !== 5400) {
    return unknown('All 5400 decoded frame timestamps, durations and an exact time base are required');
  }
  const timestamps: unknown[] = Array.from(value.presentationTimestamps);
  const durations: unknown[] = Array.from(value.durations);
  if (!timestamps.every(decimalInteger) || !durations.every(unsignedDecimal)) return unknown('Decoded frame timing contains malformed or missing integers');
  // FFmpeg defines a duration of zero as unknown, so it cannot establish a failure or a pass.
  if (durations.some((duration) => duration === '0')) return unknown('At least one decoded frame duration is unknown');
  const numerator = BigInt(value.timeBase.numerator);
  const denominator = BigInt(value.timeBase.denominator);
  for (let index = 0; index < timestamps.length; index += 1) {
    const duration = durations[index];
    const timestamp = timestamps[index];
    const previous = timestamps[index - 1];
    if (duration === undefined || timestamp === undefined) return unknown('Decoded frame timing is incomplete');
    if (30n * BigInt(duration) * numerator !== denominator
      || (previous !== undefined && 30n * (BigInt(timestamp) - BigInt(previous)) * numerator !== denominator)) {
      return { classification: 'FAIL', reasons: [`Decoded frame ${index} does not have constant 1/30-second presentation timing`] };
    }
  }
  return { classification: 'PASS', reasons: ['All 5400 decoded frame durations and presentation gaps are exactly 1/30 second'] };
}

function ffprobeInteger(value: unknown): string | null {
  if (decimalInteger(value)) return value;
  return typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : null;
}

export interface ParsedFfprobeVideo {
  readonly decodedFrameCount: number;
  readonly width: number;
  readonly height: number;
  readonly averageFrameRate: ExactRational;
  readonly reportedFrameRate: ExactRational;
  readonly timeBase: ExactRational;
  readonly durationTicks: string;
  readonly duration: ExactRational;
  readonly containerDuration: ExactRational | null;
  readonly containerDurationMatchesVideo: boolean | null;
  readonly frameTiming: DecodedFrameTiming | null;
  readonly cadence: FrameCadenceResult;
  readonly cadenceVerified: boolean;
}

/**
 * Pure decoding of retained ffprobe JSON plus exit status/stderr. A future
 * inspector must invoke a pinned ffprobe over the entire file with count_frames
 * and show_frames, retain its command and byte hashes, and supply unfiltered
 * video streams. This parser does not authenticate those facts or container type.
 * Expected frame schema is media_type, stream_index, pts and duration, with
 * timestamps in the reported stream time_base. The target ffprobe version and
 * this schema must be verified before integration; older pkt_duration fields
 * are deliberately not treated as equivalent without version-specific evidence.
 * A valid parse is not acceptance: consume cadence and the separate container
 * duration fields. FFmpeg may estimate reported duration; retain raw evidence.
 * No nb_frames fallback, rounded duration, inferred frame timestamps or retries.
 */
export function parseFfprobeVideo(stdout: unknown, exitCode: unknown, stderr: unknown): EvidenceParseResult<ParsedFfprobeVideo> {
  if (exitCode !== 0 || typeof stderr !== 'string' || stderr.trim() !== '') return parseFailure('ffprobe failed, was interrupted, or emitted diagnostics requiring review');
  if (typeof stdout !== 'string') return parseFailure('Retained ffprobe JSON text is missing');
  let parsed: unknown;
  try { parsed = JSON.parse(stdout) as unknown; } catch { return parseFailure('Retained ffprobe output is not valid JSON'); }
  if (!isRecord(parsed) || Object.hasOwn(parsed, 'error') || !Array.isArray(parsed.streams) || parsed.streams.length !== 1) {
    return parseFailure('ffprobe must report one unambiguous video stream and no probe error');
  }
  const stream: unknown = parsed.streams[0];
  if (!isRecord(stream) || stream.codec_type !== 'video' || !nonnegativeInteger(stream.index)
    || !positiveInteger(stream.width) || !positiveInteger(stream.height)) return parseFailure('Video stream identity or dimensions are malformed');
  const decodedFrameCount = safeDecimalNumber(ffprobeInteger(stream.nb_read_frames));
  const averageFrameRate = parsePositiveRational(stream.avg_frame_rate);
  const reportedFrameRate = parsePositiveRational(stream.r_frame_rate);
  const timeBase = parsePositiveRational(stream.time_base);
  const durationTicks = ffprobeInteger(stream.duration_ts);
  if (decodedFrameCount === null || !averageFrameRate || !reportedFrameRate || !timeBase || !positiveDecimal(durationTicks)) {
    return parseFailure('Decoded frame count or exact video rate/time-base/duration fields are missing or malformed');
  }
  let frameTiming: DecodedFrameTiming | null = null;
  if (Array.isArray(parsed.frames)) {
    const timestamps: string[] = [];
    const durations: string[] = [];
    for (const frame of Array.from(parsed.frames) as unknown[]) {
      if (!isRecord(frame) || frame.media_type !== 'video' || frame.stream_index !== stream.index) {
        return parseFailure('Decoded frame identity is malformed or belongs to a different stream');
      }
      const pts = ffprobeInteger(frame.pts);
      const duration = ffprobeInteger(frame.duration);
      if (pts === null || duration === null || !unsignedDecimal(duration)) return parseFailure('Raw decoded PTS or duration is unavailable; no synthesized timestamp fallback');
      timestamps.push(pts);
      durations.push(duration);
    }
    if (timestamps.length !== decodedFrameCount) return parseFailure('Decoded frame records disagree with nb_read_frames');
    frameTiming = { timeBase, presentationTimestamps: timestamps, durations };
  }
  const cadence = evaluateFrameCadence(frameTiming);
  const duration = { numerator: String(BigInt(durationTicks) * BigInt(timeBase.numerator)), denominator: timeBase.denominator };
  let containerDuration: ExactRational | null = null;
  if (isRecord(parsed.format) && Object.hasOwn(parsed.format, 'duration')) {
    const rawDuration = parsed.format.duration;
    const parts = typeof rawDuration === 'string' ? /^(0|[1-9][0-9]*)(?:\.([0-9]+))?$/.exec(rawDuration) : null;
    const integer = parts?.[1];
    const fraction = parts?.[2] ?? '';
    if (integer === undefined) return parseFailure('Container duration is not an exact nonnegative decimal string');
    containerDuration = { numerator: String(BigInt(integer + fraction)), denominator: String(10n ** BigInt(fraction.length)) };
  }
  return { valid: true, reasons: [], value: {
    decodedFrameCount, width: stream.width, height: stream.height, averageFrameRate, reportedFrameRate, timeBase, durationTicks,
    duration, containerDuration, containerDurationMatchesVideo: containerDuration === null ? null
      : BigInt(containerDuration.numerator) * BigInt(duration.denominator) === BigInt(duration.numerator) * BigInt(containerDuration.denominator),
    frameTiming, cadence, cadenceVerified: cadence.classification === 'PASS',
  } };
}

// Runtime imports are standard-library only. Remotion is loaded only by an
// explicit command, after admission. No browser installation API is called.
import {createHash} from 'node:crypto';
import {spawn, execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {promises as fs} from 'node:fs';
import {tmpdir, cpus, totalmem, release as kernelRelease} from 'node:os';
import {resolve, join, dirname, relative, isAbsolute} from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
import type {HeadlessBrowser} from '@remotion/renderer';

const REPOSITORY = 'HungQuach301/meridian-studio';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const COMPOSITION_ENTRY = 'genres/data-explainer/canvas-spike.tsx';
const FIXTURE_PATH = 'genres/data-explainer/canvas-spike.fixture.json';
const ROOT_PINS: Readonly<Record<string, string>> = Object.freeze({
  remotion: '4.0.523', '@remotion/renderer': '4.0.523', '@remotion/bundler': '4.0.523',
  react: '18.2.0', 'react-dom': '18.2.0', '@types/react': '18.2.79',
  '@types/react-dom': '18.2.25', '@types/node': '20.19.0',
  '@fontsource/inter': '5.2.5', '@fontsource/inter-tight': '5.2.5',
});
export const FONT_FILES = Object.freeze([
  '@fontsource/inter/files/inter-latin-400-normal.woff2',
  '@fontsource/inter/files/inter-latin-500-normal.woff2',
  '@fontsource/inter/files/inter-latin-700-normal.woff2',
  '@fontsource/inter/files/inter-latin-800-normal.woff2',
  '@fontsource/inter-tight/files/inter-tight-latin-800-normal.woff2',
]);
const monotonicMs = (): number => Number(process.hrtime.bigint()) / 1e6;
const digest = (value: string | Uint8Array): string => createHash('sha256').update(value).digest('hex');
const jsonBytes = (value: unknown): string => JSON.stringify(value, null, 2) + '\n';
const errorText = (error: unknown): string => error instanceof Error ? error.message : String(error);

export interface RunAuthorization {
  readonly schema: 'WP-004a-run-v1';
  readonly repository: typeof REPOSITORY;
  readonly sourceCommitSha: string;
  readonly benchmarkId: string;
  readonly configuration: typeof BENCHMARK_SPEC;
  readonly attempt: 1;
  readonly limits: BenchmarkLimits;
  readonly costUpperBoundUsd: number;
  readonly approvals: Readonly<Record<'benchmark' | 'browser' | 'license' | 'cost' | 'storage', EvidenceReference>>;
  readonly browser: {readonly archiveUrl: typeof BROWSER_ARCHIVE_URL; readonly archiveSha256: string;
    readonly version: typeof BROWSER_VERSION; readonly sha256: string};
  readonly releaseId: number;
  readonly lockfileSha256: string;
}

/** Pure admission checks. A JSON object alone is not proof of owner approval. */
export function validateRunAuthorization(value: unknown, context: {
  repository: string; actor: string; eventName: string; attempt: string;
  sourceCommitSha: string; ref: string;
}): ValidationResult {
  const reasons: string[] = [];
  if (context.repository !== REPOSITORY || context.actor !== 'HungQuach301'
    || context.eventName !== 'workflow_dispatch' || context.attempt !== '1' || context.ref !== 'refs/heads/main') {
    reasons.push('Only a first-attempt owner workflow_dispatch on this repository main is admitted');
  }
  if (!isRecord(value)) return {valid: false, reasons: [...reasons, 'Authorization JSON is missing']};
  if (value.schema !== 'WP-004a-run-v1' || value.repository !== REPOSITORY || value.attempt !== 1
    || !sha1(value.sourceCommitSha) || value.sourceCommitSha !== context.sourceCommitSha
    || typeof value.benchmarkId !== 'string' || !/^wp004a-[a-z0-9-]{1,48}$/.test(value.benchmarkId)) reasons.push('Authorization identity does not match this run');
  reasons.push(...validateBenchmarkConfig(value.configuration).reasons);
  if (!isLimits(value.limits) || !positiveInteger(value.limits.maximumJobMinutes) || value.limits.maximumJobMinutes > 75 || !finiteNonnegative(value.costUpperBoundUsd)
    || value.costUpperBoundUsd > value.limits.maximumCostUsd) reasons.push('Reviewed cost ceiling and a job limit of at most 75 minutes are required');
  if (!positiveInteger(value.releaseId) || !sha256(value.lockfileSha256)) reasons.push('Existing draft Release and reviewed lockfile hash are required');
  for (const name of ['benchmark', 'browser', 'license', 'cost', 'storage']) {
    if (!isRecord(value.approvals) || !isEvidenceReference(value.approvals[name])) reasons.push(`Separate ${name} approval reference is required`);
  }
  if (!isRecord(value.browser) || value.browser.version !== BROWSER_VERSION || !sha256(value.browser.sha256)
    || value.browser.archiveUrl !== BROWSER_ARCHIVE_URL || !sha256(value.browser.archiveSha256)) reasons.push('Previously reviewed official browser URL/version/archive/binary hashes are required');
  return {valid: reasons.length === 0, reasons};
}

export interface ObserverResult {
  readonly memory: MemoryEvidence;
  readonly complete: boolean;
  readonly crashedProcesses: number;
  readonly expectedFinalCloseExcluded: boolean;
  readonly reasons: readonly string[];
}

interface ProcessTermination {
  readonly waitStatus: number;
  readonly exitCode: number | null;
  readonly signal: number | null;
}

/** Decode the Linux terminal wait word independently of the observer's labels. */
function isTermination(value: JsonRecord): value is JsonRecord & ProcessTermination {
  if (!nonnegativeInteger(value.waitStatus) || value.waitStatus > 65535) return false;
  const signal = value.waitStatus & 0x7f;
  if (signal === 0) return (value.waitStatus & 0xff) === 0
    && value.exitCode === (value.waitStatus >>> 8) && value.signal === null;
  return signal <= 64 && (value.waitStatus & 0xff00) === 0
    && value.exitCode === null && value.signal === signal;
}

/** Only retained kernel-observer events can establish lifecycle completeness. */
export function reconcileObserverEvents(events: readonly unknown[]): ObserverResult {
  const samples: MemorySample[] = [];
  const processChanges: ProcessChange[] = [];
  const reasons: string[] = [];
  let summary: JsonRecord | null = null;
  let sawReady = false;
  const crashed = new Set<string>();
  const started = new Set<string>();
  const exited = new Set<string>();
  const live = new Map<number, string>();
  const cleanup = new Map<string, {eligible: boolean; timestampMs: number}>();
  const pending = new Map<string, ProcessTermination & {expectedCleanup: boolean; timestampMs: number}>();
  let closing = false;
  let expectedClose = false;
  let previousTimestamp = -1;
  for (const item of events) {
    if (!isRecord(item) || !finiteNonnegative(item.timestampMs) || typeof item.type !== 'string') {
      reasons.push('Malformed observer event'); continue;
    }
    if (item.timestampMs < previousTimestamp) reasons.push('Observer events are not chronological');
    previousTimestamp = item.timestampMs;
    if (summary) reasons.push('Events appeared after observer summary');
    if (item.type === 'fatal') reasons.push(nonemptyText(item.reason) ? item.reason : 'Observer failed');
    if (item.type === 'ready') {
      if (sawReady || !positiveInteger(item.pid) || !live.has(item.pid)) reasons.push('Invalid or repeated observer ready event');
      sawReady = true;
    }
    if (item.type === 'closing') {
      if (closing || typeof item.expectedFinalClose !== 'boolean') reasons.push('Invalid or repeated close boundary');
      closing = true; expectedClose = item.expectedFinalClose === true;
      if (expectedClose && samples.at(-1)?.completedFrames !== 5400) reasons.push('Final close excluded without complete frame progress');
    }
    if (item.type === 'sample') {
      if (closing) reasons.push('RSS sample appeared after the final measurement boundary');
      else if (!isSample(item)) reasons.push('Invalid observer RSS sample');
      else samples.push(item);
    }
    if (item.type === 'change') {
      if (!isProcessChange(item)) {
        reasons.push('Invalid lifecycle change'); continue;
      }
      const key = `${item.pid}:${item.startTimeTicks}`;
      if (closing) reasons.push('Process inventory changed after the measurement boundary');
      if (item.change === 'start') {
        if (started.has(key) || live.has(item.pid)) reasons.push('Duplicate process start or overlapping PID identity');
        started.add(key); live.set(item.pid, key);
      } else if (item.change === 'exec' && live.get(item.pid) !== key) {
        reasons.push('Exec lacks its original live identity');
      } else if (item.change === 'exit' && !exited.has(key)) {
        reasons.push('Inventory exit lacks a terminal wait event');
      }
      if (!closing) processChanges.push(item);
    }
    if (item.type === 'cleanup-signal') {
      if (!isIdentity(item) || item.signal !== 9) {reasons.push('Invalid cleanup signal receipt'); continue;}
      const key = identityKey(item);
      if (!closing || live.get(item.pid) !== key || cleanup.has(key)) reasons.push('Cleanup signal lacks its close boundary or live identity');
      // Eligibility is decided now, before any later exit status is known.
      cleanup.set(key, {eligible: closing && expectedClose && live.get(item.pid) === key && !pending.has(key), timestampMs: item.timestampMs});
    }
    if (item.type === 'exit-pending') {
      if (!isIdentity(item) || !isTermination(item)) {reasons.push('Invalid kernel exit-stop status'); continue;}
      const key = identityKey(item);
      if (live.get(item.pid) !== key || pending.has(key)) reasons.push('Unmatched or duplicate kernel exit stop');
      const sent = cleanup.get(key);
      const expectedCleanup = expectedClose && sent?.eligible === true && sent.timestampMs < item.timestampMs && item.signal === 9;
      pending.set(key, {waitStatus: item.waitStatus, exitCode: item.exitCode, signal: item.signal, expectedCleanup, timestampMs: item.timestampMs});
      if ((item.signal !== null || item.exitCode !== 0) && !expectedCleanup) crashed.add(key);
    }
    if (item.type === 'exit') {
      if (!isIdentity(item) || !isTermination(item)) { reasons.push('Invalid process exit'); continue; }
      const key = `${item.pid}:${item.startTimeTicks}`;
      if (live.get(item.pid) !== key || exited.has(key)) reasons.push('Unmatched or duplicate process exit');
      const stop = pending.get(key);
      const matchesStop = stop !== undefined && stop.waitStatus === item.waitStatus && stop.timestampMs < item.timestampMs;
      if (!matchesStop) reasons.push('Terminal status lacks a matching prior kernel exit stop');
      const expected = matchesStop && stop.expectedCleanup && item.signal === 9;
      if (item.expected !== expected) reasons.push('Exit exclusion disagrees with its per-process cleanup and kernel status');
      exited.add(key); live.delete(item.pid);
      if (!expected && (item.signal !== null || item.exitCode !== 0)) crashed.add(key);
    }
    if (item.type === 'summary') summary = item;
  }
  const observedCrashes = crashed.size;
  if (!sawReady || !summary || summary.complete !== true || !nonnegativeInteger(summary.crashedProcesses)
    || summary.crashedProcesses !== observedCrashes || started.size !== exited.size || live.size !== 0
    || summary.expectedFinalCloseExcluded !== expectedClose) reasons.push('Incomplete lifecycle coverage');
  return {memory: {samples, processChanges}, complete: reasons.length === 0,
    crashedProcesses: observedCrashes, expectedFinalCloseExcluded: summary?.expectedFinalCloseExcluded === true && expectedClose, reasons};
}

/** Synthetic Node prerequisite: fork/exec, one crash, then owned final cleanup. */
export async function verifyObserverCapability(): Promise<ObserverResult> {
  const version = execFileSync(OBSERVER_PYTHON, ['--version'], {encoding: 'utf8'}).trim();
  if (version !== OBSERVER_PYTHON_VERSION) throw new Error('Unreviewed observer runtime version');
  const output = await new Promise<string>((resolveOutput, reject) => {
    const probe = "const {spawn,spawnSync}=require('node:child_process');spawnSync(process.execPath,['-e','process.exit(0)']);spawnSync(process.execPath,['-e','process.kill(process.pid,\"SIGTERM\")']);for(const role of ['renderer','gpu-process'])spawn(process.execPath,['-e','setInterval(()=>{},1000)','--','--type='+role]);setInterval(()=>{},1000);";
    const child = spawn(OBSERVER_PYTHON, ['-u', '-c', LINUX_OBSERVER_SOURCE, process.execPath, '-e', probe], {stdio: ['pipe', 'pipe', 'pipe']});
    let text = ''; let diagnostics = ''; let buffered = ''; let closeSent = false;
    const roles = new Set<string>(); let sawNormalExit = false; let sawDeliberateCrash = false;
    child.stdout.setEncoding('utf8').on('data', (chunk: string) => {
      text += chunk; buffered += chunk;
      for (;;) {
        const end = buffered.indexOf('\n'); if (end < 0) break;
        const line = buffered.slice(0, end); buffered = buffered.slice(end + 1);
        try {
          const event: unknown = JSON.parse(line);
          if (!isRecord(event)) throw new Error('Invalid probe event');
          if (event.type === 'change' && event.change === 'exec' && isRole(event.role)) roles.add(event.role);
          if (event.type === 'exit' && event.exitCode === 0) sawNormalExit = true;
          if (event.type === 'exit' && event.signal === 15) sawDeliberateCrash = true;
          if (!closeSent && sawNormalExit && sawDeliberateCrash && roles.has('renderer') && roles.has('gpu')) {
            closeSent = true;
            // This is authored probe progress, not a claim of rendered frames.
            child.stdin.end('{"type":"progress","completedFrames":5400}\n{"type":"close","expected":true}\n');
          }
        } catch {diagnostics += 'Malformed observer prerequisite event';}
      }
    });
    child.stderr.setEncoding('utf8').on('data', (chunk: string) => {diagnostics += chunk;});
    child.stdin.on('error', error => {diagnostics += `Prerequisite input closed: ${errorText(error)}`;});
    const timeout = setTimeout(() => {child.kill('SIGKILL'); reject(new Error('Observer prerequisite timeout'));}, 5000);
    child.once('error', error => {clearTimeout(timeout); reject(error);});
    child.once('close', code => {
      clearTimeout(timeout);
      if (code !== 0 || diagnostics) {
        const fatal = text.split('\n').flatMap(line => {
          try {const event: unknown = JSON.parse(line); return isRecord(event) && event.type === 'fatal' && nonemptyText(event.reason) ? [event.reason] : [];}
          catch {return [];}
        }).join('; ');
        reject(new Error(`Observer prerequisite unavailable (exit ${code}): ${(fatal || diagnostics).slice(0,1000)}`));
      } else resolveOutput(text);
    });
  });
  const events = output.trim().split('\n').map(line => JSON.parse(line) as unknown);
  const result = reconcileObserverEvents(events);
  const starts = result.memory.processChanges.filter(change => change.change === 'start');
  const execRoles = result.memory.processChanges.filter(change => change.change === 'exec').map(change => change.role);
  const closeIndex = events.findIndex(event => isRecord(event) && event.type === 'closing');
  const samplesAfterClose = events.slice(closeIndex + 1).filter(event => isRecord(event) && event.type === 'sample').length;
  if (!result.complete || result.crashedProcesses !== 1 || starts.length < 5 || !result.expectedFinalCloseExcluded
    || !execRoles.includes('renderer') || !execRoles.includes('gpu') || closeIndex < 0 || samplesAfterClose !== 0) {
    throw new Error(`Kernel lifecycle prerequisite failed; no browser may open: ${result.reasons.join('; ')}`);
  }
  console.log(JSON.stringify({check: 'WP004A_OBSERVER_PREREQUISITE',syntheticNodeOnly: true,
    python: version,node: process.versions.node,processStarts: starts.length,execRoles,
    deliberateCrashes: result.crashedProcesses,expectedFinalCloseExcluded: result.expectedFinalCloseExcluded,
    samplesAfterClose,lifecycleComplete: result.complete}));
  return result;
}

async function writeEvidence(directory: string, id: string, value: unknown): Promise<EvidenceReference> {
  const bytes = jsonBytes(value);
  await fs.writeFile(join(directory, id), bytes, {flag: 'wx'});
  return {id, sha256: digest(bytes)};
}

async function checkedFile(path: string, expected: string): Promise<Buffer> {
  const bytes = await fs.readFile(path);
  if (digest(bytes) !== expected) throw new Error(`Hash mismatch: ${path}`);
  return bytes;
}

/** Offline build only: bundles TSX/fonts without discovering or opening Chrome. */
export async function bundleOffline(outputDirectory: string): Promise<string> {
  const output = resolve(outputDirectory);
  const fromRepository = relative(ROOT, output);
  if (!isAbsolute(outputDirectory) || (fromRepository !== '..' && !fromRepository.startsWith('../'))) throw new Error('Bundle output must be an absolute path outside the repository');
  const {bundle} = await import('@remotion/bundler');
  return bundle({entryPoint: join(ROOT, COMPOSITION_ENTRY), outDir: output,
    enableCaching: false, webpackOverride: config => ({...config, cache: false})});
}

async function assetInventory(): Promise<{fonts: {path: string; sha256: string}[]; lockfileSha256: string; fixtureSha256: string}> {
  for (const [name, version] of Object.entries(ROOT_PINS)) {
    const installed: unknown = JSON.parse(await fs.readFile(join(ROOT, 'node_modules', name, 'package.json'), 'utf8'));
    if (!isRecord(installed) || installed.name !== name || installed.version !== version) throw new Error(`Pinned package mismatch: ${name}`);
  }
  const fonts = await Promise.all(FONT_FILES.map(async path => ({path, sha256: digest(await fs.readFile(join(ROOT, 'node_modules', path)))})));
  return {fonts, lockfileSha256: digest(await fs.readFile(join(ROOT, 'package-lock.json'))),
    fixtureSha256: digest(await fs.readFile(join(ROOT, FIXTURE_PATH)))};
}

type ObservedBrowser = {
  browser: HeadlessBrowser;
  events: unknown[];
  progress: (completedFrames: number) => void;
  close: (expected: boolean) => Promise<void>;
};

/** A page may navigate once to the local bundle; renderer retry tokens never escape. */
export function singleLocalNavigation<A extends {url: string}, R extends {status: () => number} | null>(
  navigate: (options: A) => Promise<R>, onFailure: (reason: string) => void,
): (options: A) => Promise<R> {
  let attempted = false;
  return async options => {
    const url = new URL(options.url);
    if (attempted || url.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname)) {
      onFailure('Repeated or nonlocal navigation was blocked');
      throw new Error('WP004a navigation policy stopped this attempt');
    }
    attempted = true;
    try {
      const response = await navigate(options);
      if (!response || response.status() !== 200) throw new Error('Local bundle did not return HTTP 200');
      return response;
    } catch {
      // Generic error avoids Remotion's ECONNRESET/timeout retry branches.
      onFailure('First navigation failed; no second request is permitted');
      throw new Error('WP004a navigation failed and cannot be retried');
    }
  };
}

/** Changes to active renderer/GPU identities are conservatively treated as restarts. */
export function observeActiveProcessRestarts(samples: readonly MemorySample[], changes: readonly ProcessChange[] = []): {complete: boolean; count: number; reasons: string[]} {
  const active = samples.filter(sample => sample.completedFrames > 0 && sample.completedFrames < 5400);
  let previous: string | null = null;
  let count = 0;
  const reasons: string[] = [];
  if (active.length < 2) reasons.push('Insufficient active-frame process observations');
  for (const sample of active) {
    if (!sample.treeComplete || !sample.processes.some(process => process.role === 'renderer')) reasons.push('Active renderer inventory is incomplete');
    const identities = sample.processes.filter(process => process.role === 'browser' || process.role === 'renderer' || process.role === 'gpu')
      .map(process => `${process.role}:${process.pid}:${process.startTimeTicks}`).sort().join('|');
    if (previous !== null && previous !== identities) count++;
    previous = identities;
  }
  // A same-role exec replaces the running image without changing PID/starttime.
  // Initial other-to-role execs remain distinct from these active replacements.
  for (const event of changes) {
    if (event.change !== 'exec' || event.previousRole !== event.role || !['browser', 'renderer', 'gpu'].includes(event.role)) continue;
    const before = samples.filter(sample => sample.timestampMs < event.timestampMs).at(-1);
    if (before && before.completedFrames > 0 && before.completedFrames < 5400) count++;
  }
  return {complete: reasons.length === 0, count, reasons: [...new Set(reasons)]};
}

/** Pinned internal CDP adapter; it never invokes Remotion's browser downloader. */
async function openObservedBrowser(executable: string, directory: string): Promise<ObservedBrowser> {
  const req = createRequire(import.meta.url);
  const rendererDirectory = dirname(req.resolve('@remotion/renderer/package.json'));
  type ConnectionType = HeadlessBrowser['connection'];
  type TransportType = ConnectionType['transport'];
  const {HeadlessBrowser: BrowserClass} = req(join(rendererDirectory, 'dist/browser/Browser.js')) as {HeadlessBrowser: new (options: {connection: ConnectionType; defaultViewport: {width: number; height: number; deviceScaleFactor: number}; runner: HeadlessBrowser['runner']}) => HeadlessBrowser};
  const {Connection} = req(join(rendererDirectory, 'dist/browser/Connection.js')) as {Connection: new (transport: TransportType) => ConnectionType};
  const {NodeWebSocketTransport} = req(join(rendererDirectory, 'dist/browser/NodeWebSocketTransport.js')) as {NodeWebSocketTransport: {create: (url: string) => Promise<TransportType>}};
  const profile = join(directory, 'profile');
  const args = ['--headless=old', '--no-sandbox', '--disable-setuid-sandbox', '--no-zygote', '--disable-breakpad',
    '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
    '--disable-extensions', '--disable-sync', '--no-first-run', '--no-pings',
    '--disable-dev-shm-usage', '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding', '--force-color-profile=srgb', '--font-render-hinting=none',
    '--force-device-scale-factor=1', '--use-gl=angle', '--use-angle=swiftshader',
    '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0',
    `--user-data-dir=${profile}`, 'about:blank'];
  await fs.mkdir(directory, {recursive: true});
  await writeEvidence(directory, 'launch.json', {executable, args, observerSha256: digest(LINUX_OBSERVER_SOURCE)});
  const raw = await fs.open(join(directory, 'observer.jsonl'), 'wx');
  const browserLog = await fs.open(join(directory, 'browser-stderr.log'), 'wx');
  const child = spawn(OBSERVER_PYTHON, ['-u', '-c', LINUX_OBSERVER_SOURCE, executable, ...args], {
    cwd: directory, stdio: ['pipe', 'pipe', 'pipe'],
    env: {PATH: process.env.PATH, LANG: 'C.UTF-8', TMPDIR: directory,
      WP004A_FFMPEG_PATH: join(ROOT, 'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg')},
  });
  const events: unknown[] = [];
  let lines = '';
  let stderr = '';
  let fatal: Error | null = null;
  let closed = false;
  let closing = false;
  let handlesClosed = false;
  let writeQueue = Promise.resolve();
  const queue = (action: () => Promise<unknown>): void => { writeQueue = writeQueue.then(action).then(() => undefined).catch(error => {fatal = new Error(errorText(error));}); };
  child.stdout.on('data', (chunk: Buffer) => {
    queue(() => raw.write(chunk)); lines += chunk.toString('utf8');
    for (;;) {
      const end = lines.indexOf('\n'); if (end < 0) break;
      const line = lines.slice(0, end); lines = lines.slice(end + 1);
      try {
        const record: unknown = JSON.parse(line); events.push(record);
        if (isRecord(record) && record.type === 'fatal') fatal = new Error(errorText(record.reason));
      } catch { fatal = new Error('Observer emitted malformed JSON'); }
    }
  });
  child.stderr.on('data', (chunk: Buffer) => {queue(() => browserLog.write(chunk)); stderr += chunk.toString('utf8');});
  child.once('error', error => {fatal = error;});
  const finished = new Promise<void>(resolveExit => child.once('close', code => {
    closed = true; if (code !== 0) fatal ??= new Error(`Observer exited ${code}`); resolveExit();
  }));
  const close = async (expected: boolean): Promise<void> => {
    if (!closed && !closing) {closing = true; child.stdin.end(jsonBytes({type: 'close', expected}).replace(/\n\s*/g, '') + '\n');}
    await Promise.race([finished, new Promise<never>((_, reject) => {
      const timeout = setTimeout(() => {child.kill('SIGKILL'); reject(new Error('Observer cleanup timed out; lifecycle incomplete'));}, 10000);
      finished.finally(() => clearTimeout(timeout)).catch(() => undefined);
    })]);
    await writeQueue;
    if (!handlesClosed) {handlesClosed = true; await raw.close(); await browserLog.close();}
  };
  try {
    const deadline = monotonicMs() + 25000;
    let endpoint: string | undefined;
    while (!endpoint) {
      if (fatal || closed) throw fatal ?? new Error('Browser closed during startup');
      if (monotonicMs() >= deadline) throw new Error('Browser startup timed out; no retry');
      endpoint = /DevTools listening on (ws:\/\/127\.0\.0\.1:\d+\/[^\s]+)/.exec(stderr)?.[1];
      if (!endpoint) await new Promise(resolveWait => setTimeout(resolveWait, 20));
    }
    const transport = await NodeWebSocketTransport.create(endpoint);
    const connection = new Connection(transport);
    const runner: HeadlessBrowser['runner'] = {connection, listeners: [], closeProcess: () => close(false),
      deleteBrowserCaches: () => {throw new Error('Cache mutation is forbidden during the pair');},
      forgetEventLoop: () => undefined, rememberEventLoop: () => undefined};
    const browser = new BrowserClass({connection, runner, defaultViewport: {width: 1920, height: 1080, deviceScaleFactor: 1}});
    await connection.send('Target.setDiscoverTargets', {discover: true});
    return {browser, events, progress: completedFrames => {
      if (fatal || closed) throw fatal ?? new Error('Observer stopped during render');
      child.stdin.write(JSON.stringify({type: 'progress', completedFrames}) + '\n');
    }, close: async expected => {await close(expected); connection.dispose(); if (fatal) throw fatal;}};
  } catch (error) {await close(false).catch(() => undefined); throw error;}
}

async function probeMp4(directory: string, variant: string, mp4Path: string, binary: string): Promise<ExactMp4Evidence> {
  const args = ['-v', 'error', '-count_frames', '-show_frames', '-show_streams', '-show_format', '-of', 'json', mp4Path];
  const result = await new Promise<{stdout: string; stderr: string; exitCode: number | null}>((resolveProbe, reject) => {
    const child = spawn(binary, args, {stdio: ['ignore', 'pipe', 'pipe']});
    let stdout = ''; let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (data: string) => {stdout += data;});
    child.stderr.setEncoding('utf8').on('data', (data: string) => {stderr += data;});
    child.once('error', reject); child.once('close', exitCode => resolveProbe({stdout, stderr, exitCode}));
  });
  const evidence = await writeEvidence(directory, `${variant}-ffprobe.json`, {binary, args, ...result});
  const raw: unknown = JSON.parse(result.stdout);
  if (!isRecord(raw) || !isRecord(raw.format) || typeof raw.format.format_name !== 'string'
    || !raw.format.format_name.split(',').includes('mp4') || !Array.isArray(raw.streams)
    || raw.streams.length !== 1 || !isRecord(raw.streams[0])
    || raw.streams[0].codec_name !== 'h264' || raw.streams[0].pix_fmt !== 'yuv420p') throw new Error('FAIL: unexpected MP4 container, codec, pixel format or stream count');
  const parsed = parseFfprobeVideo(result.stdout, result.exitCode, result.stderr);
  if (!parsed.valid || !parsed.value || !parsed.value.frameTiming || !parsed.value.containerDuration) throw new Error(`INCONCLUSIVE MP4: ${parsed.reasons.join('; ')}`);
  const p = parsed.value;
  if (p.decodedFrameCount !== 5400 || p.width !== 1920 || p.height !== 1080
    || p.cadence.classification !== 'PASS' || p.containerDurationMatchesVideo !== true
    || BigInt(p.averageFrameRate.numerator) !== 30n * BigInt(p.averageFrameRate.denominator)
    || BigInt(p.containerDuration!.numerator) !== 180n * BigInt(p.containerDuration!.denominator)) throw new Error('FAIL or INCONCLUSIVE: MP4 does not meet exact media requirements');
  const toSafe = (value: string): number => {const n = Number(value); if (!Number.isSafeInteger(n)) throw new Error('MP4 rational exceeds safe integer'); return n;};
  return {evidence, mp4: {id: `${variant}.mp4`, sha256: digest(await fs.readFile(mp4Path))},
    decodedFrameCount: p.decodedFrameCount, width: p.width, height: p.height,
    fpsNumerator: toSafe(p.averageFrameRate.numerator), fpsDenominator: toSafe(p.averageFrameRate.denominator),
    durationNumerator: toSafe(p.containerDuration!.numerator), durationDenominator: toSafe(p.containerDuration!.denominator),
    frameTiming: p.frameTiming!};
}

/** Future storage uses only the explicitly approved, existing private draft. */
async function draftStorage(authorization: RunAuthorization): Promise<{upload: (name: string, bytes: Buffer, type: string) => Promise<void>}> {
  const credential = process.env.GITHUB_TOKEN;
  if (!credential) throw new Error('Workflow credential is unavailable');
  const headers = {Authorization: `Bearer ${credential}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'};
  const url = `https://api.github.com/repos/${REPOSITORY}/releases/${authorization.releaseId}`;
  const response = await fetch(url, {headers, redirect: 'error', signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Draft Release preflight HTTP ${response.status}`);
  const draft: unknown = await response.json();
  if (!isRecord(draft) || draft.id !== authorization.releaseId || draft.draft !== true || !Array.isArray(draft.assets)) throw new Error('Existing draft Release was not verified');
  const prefix = `${authorization.benchmarkId}-`;
  if (draft.assets.some(asset => isRecord(asset) && typeof asset.name === 'string' && asset.name.startsWith(prefix))) throw new Error('Benchmark identity already claimed; no repeat allowed');
  return {upload: async (name, bytes, type) => {
    if (!/^[a-zA-Z0-9_.-]+$/.test(name)) throw new Error('Invalid evidence asset name');
    const target = `https://uploads.github.com/repos/${REPOSITORY}/releases/${authorization.releaseId}/assets?name=${encodeURIComponent(prefix + name)}`;
    const uploaded = await fetch(target, {method: 'POST', redirect: 'error', signal: AbortSignal.timeout(120000), headers: {...headers, 'Content-Type': type}, body: new Uint8Array(bytes)});
    if (!uploaded.ok) throw new Error(`Evidence upload HTTP ${uploaded.status}; no retry or overwrite`);
    const record: unknown = await uploaded.json();
    if (!isRecord(record) || record.name !== prefix + name || record.size !== bytes.length || record.state !== 'uploaded') throw new Error('Evidence upload receipt mismatch');
  }};
}

/** Invoked only inside the separately authorized future benchmark job. */
async function prepareApprovedBrowser(authorization: RunAuthorization, directory: string): Promise<string> {
  const response = await fetch(BROWSER_ARCHIVE_URL, {redirect: 'error', signal: AbortSignal.timeout(120000)});
  if (!response.ok) throw new Error(`Approved browser archive HTTP ${response.status}; no retry`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (digest(bytes) !== authorization.browser.archiveSha256) throw new Error('Approved browser archive checksum mismatch');
  const archive = join(directory, 'browser.zip');
  const destination = join(directory, 'browser');
  await fs.writeFile(archive, bytes, {flag: 'wx'});
  execFileSync(OBSERVER_PYTHON, ['-c', String.raw`
import pathlib,zipfile,stat,sys
out=pathlib.Path(sys.argv[2]);out.mkdir()
with zipfile.ZipFile(sys.argv[1]) as archive:
    for member in archive.infolist():
        name=pathlib.PurePosixPath(member.filename)
        if name.is_absolute() or '..' in name.parts or not name.parts or name.parts[0]!='chrome-headless-shell-linux64' or stat.S_ISLNK(member.external_attr>>16):
            raise ValueError('Unsafe archive member')
    archive.extractall(out)
`, archive, destination], {timeout: 60000, stdio: ['ignore', 'pipe', 'pipe']});
  const executable = join(destination, 'chrome-headless-shell-linux64/chrome-headless-shell');
  await checkedFile(executable, authorization.browser.sha256);
  await fs.chmod(executable, 0o755);
  const actualVersion = execFileSync(executable, ['--version'], {encoding: 'utf8', timeout: 10000}).trim();
  if (!actualVersion.split(/\s+/).includes(BROWSER_VERSION)) throw new Error('Approved browser reported a different version');
  await writeEvidence(directory, 'browser-acquisition.json', {url: BROWSER_ARCHIVE_URL, status: response.status,
    bytes: bytes.length, archiveSha256: digest(bytes), binarySha256: authorization.browser.sha256,
    version: BROWSER_VERSION, actualVersion, approval: authorization.approvals.browser});
  await fs.rm(archive);
  return executable;
}

export async function runBenchmark(authorizationPath: string): Promise<void> {
  const authorizationBytes = await fs.readFile(authorizationPath);
  const input: unknown = JSON.parse(authorizationBytes.toString('utf8'));
  const context = {repository: process.env.GITHUB_REPOSITORY ?? '', actor: process.env.GITHUB_ACTOR ?? '',
    eventName: process.env.GITHUB_EVENT_NAME ?? '', attempt: process.env.GITHUB_RUN_ATTEMPT ?? '',
    sourceCommitSha: process.env.GITHUB_SHA ?? '', ref: process.env.GITHUB_REF ?? ''};
  const admission = validateRunAuthorization(input, context);
  if (!admission.valid) throw new Error(admission.reasons.join('; '));
  const authorization = input as RunAuthorization;
  if (process.platform !== 'linux' || process.arch !== 'x64' || process.versions.node.split('.')[0] !== '20') throw new Error('Benchmark requires the reviewed Linux x64 Node 20 runner');
  const jobStart = Number(process.env.WP004A_JOB_STARTED_MONOTONIC_MS);
  if (!finiteNonnegative(jobStart) || jobStart === 0 || jobStart > monotonicMs()) throw new Error('Whole-job start marker is missing');
  if (execFileSync('git', ['rev-parse', 'HEAD'], {cwd: ROOT, encoding: 'utf8'}).trim() !== authorization.sourceCommitSha) throw new Error('Checkout SHA mismatch');
  const inventory = await assetInventory();
  if (inventory.lockfileSha256 !== authorization.lockfileSha256) throw new Error('Reviewed lockfile changed');
  const observerCheck = await verifyObserverCapability();
  const binaryDirectory = join(ROOT, 'node_modules/@remotion/compositor-linux-x64-gnu');
  const ffprobe = join(binaryDirectory, 'ffprobe');
  await fs.access(ffprobe);
  const environment = {node: process.versions.node, platform: process.platform, arch: process.arch,
    kernel: kernelRelease(), cpu: cpus().map(cpu => cpu.model), totalMemoryBytes: totalmem(), image: process.env.ImageVersion ?? null,
    python: execFileSync(OBSERVER_PYTHON, ['--version'], {encoding: 'utf8'}).trim(),
    ffprobeSha256: digest(await fs.readFile(ffprobe)),
    observerSha256: digest(LINUX_OBSERVER_SOURCE), observerPrerequisitePassed: observerCheck.complete,
    browserVersion: BROWSER_VERSION};
  const directory = await fs.mkdtemp(join(process.env.RUNNER_TEMP ?? tmpdir(), `${authorization.benchmarkId}-`));
  const storage = await draftStorage(authorization);
  // Persistent claim is written before any browser opens. A failed attempt is
  // still consumed; another dispatch cannot silently reuse this authorization.
  await storage.upload('claim.json', Buffer.from(jsonBytes({sourceCommitSha: authorization.sourceCommitSha,
    runId: process.env.GITHUB_RUN_ID, authorizationSha256: digest(authorizationBytes)})), 'application/json');
  const binding: BenchmarkBinding = {repository: REPOSITORY, benchmarkId: authorization.benchmarkId,
    sourceCommitSha: authorization.sourceCommitSha, fixtureSha256: inventory.fixtureSha256,
    lockfileSha256: inventory.lockfileSha256, browserSha256: authorization.browser.sha256,
    fontManifestSha256: digest(jsonBytes(inventory.fonts)), encodingSha256: digest(jsonBytes(ENCODING)),
    environmentSha256: digest(jsonBytes(environment)), runnerJobId: `${process.env.GITHUB_RUN_ID}/${process.env.GITHUB_JOB}`,
    clockId: `linux-monotonic:${(await fs.readFile('/proc/sys/kernel/random/boot_id','utf8')).trim()}`};
  const inventoryRef = await writeEvidence(directory, 'inventory.json', {binding, inventory, environment, encoding: ENCODING});
  const preflight: BenchmarkPreflight = {configuration: BENCHMARK_SPEC, binding,
    requirements: Object.fromEntries(PREFLIGHT_REQUIREMENTS.map(name => [name, {resolved: true, evidence:
      name === 'license' || name === 'cost' || name === 'storage' ? authorization.approvals[name] : inventoryRef}])) as BenchmarkPreflight['requirements'],
    unresolvedDependencyCount: 0, unapprovedDependencyCount: 0, limits: authorization.limits,
    benchmarkAuthorization: {scope: 'WP-004a-benchmark', approved: true, repository: REPOSITORY,
      benchmarkId: authorization.benchmarkId, sourceCommitSha: authorization.sourceCommitSha,
      configuration: BENCHMARK_SPEC, benchmarkCount: 1, renderCount: 2, attempt: 1,
      limits: authorization.limits, evidence: authorization.approvals.benchmark}};
  const renders: RenderAcceptanceEvidence[] = [];
  let failure: string | null = null;
  let active: ObservedBrowser | null = null;
  const deadline = setTimeout(() => {
    failure = 'Whole-job deadline exceeded';
    void active?.close(false).catch(error => {failure = `Whole-job deadline exceeded; cleanup: ${errorText(error)}`;});
  },
    Math.max(1, authorization.limits.maximumJobMinutes * 60000 - (monotonicMs() - jobStart)));
  try {
    const browserExecutable = await prepareApprovedBrowser(authorization, directory);
    const bundle = await bundleOffline(join(directory, 'bundle'));
    const {renderMedia, selectComposition, makeCancelSignal} = await import('@remotion/renderer');
    for (const variant of BENCHMARK_SPEC.renderOrder) {
      if (failure) throw new Error(failure);
      const renderDirectory = join(directory, variant);
      const startedAtMs = monotonicMs();
      const observed = await openObservedBrowser(browserExecutable, renderDirectory); active = observed;
      const browser = observed.browser;
      const cancel = makeCancelSignal();
      let finalClose = false;
      let renderedFrames = 0; let encodedFrames = 0;
      const progressLog: {timestampMs: number; renderedFrames: number; encodedFrames: number}[] = [];
      const guardEvents: {timestampMs: number; reason: string}[] = [];
      const stopForGuard = (reason: string): void => {guardEvents.push({timestampMs: monotonicMs(), reason}); cancel.cancel();};
      const noDownload = (): never => {throw new Error('Browser download forbidden');};
      const originalNewPage = browser.newPage.bind(browser);
      let createdPages = 0;
      browser.newPage = async options => {
        if (++createdPages > 2) {stopForGuard('Page replacement blocked'); throw new Error('WP004a page replacement forbidden');}
        const page = await originalNewPage(options);
        page.goto = singleLocalNavigation(page.goto.bind(page), stopForGuard);
        return page;
      };
      browser.connection.on('Target.targetCrashed', () => {stopForGuard('CDP target crash observed');});
      try {
        const composition = await selectComposition({serveUrl: bundle, id: 'WP-004a-canvas-spike',
          inputProps: {mode: variant}, puppeteerInstance: browser, onBrowserDownload: noDownload,
          binariesDirectory: binaryDirectory, browserExecutable: join(directory, 'RETRY_FORBIDDEN'), logLevel: 'error'});
        if (composition.durationInFrames !== 5400 || composition.fps !== 30 || composition.width !== 1920 || composition.height !== 1080) throw new Error('Composition changed');
        if (guardEvents.length || createdPages !== 1) throw new Error('Composition selection did not complete in one attempt');
        const mp4Path = join(directory, `${variant}.mp4`);
        await renderMedia({...ENCODING, composition, inputProps: {mode: variant}, serveUrl: bundle,
          puppeteerInstance: browser, browserExecutable: join(directory, 'RETRY_FORBIDDEN'),
          onBrowserDownload: noDownload, onDownload: () => {throw new Error('Remote asset download forbidden');},
          binariesDirectory: binaryDirectory, outputLocation: mp4Path, overwrite: false,
          frameRange: [0, 5399], cancelSignal: cancel.cancelSignal, isProduction: false,
          licenseKey: null, logLevel: 'error', timeoutInMilliseconds: 30000,
          onProgress: progress => {
            if (progress.renderedFrames < renderedFrames || progress.encodedFrames < encodedFrames
              || progress.renderedFrames > 5400 || progress.encodedFrames > 5400) {cancel.cancel(); throw new Error('Invalid render progress');}
            renderedFrames = progress.renderedFrames; encodedFrames = progress.encodedFrames;
            progressLog.push({timestampMs: monotonicMs(), renderedFrames, encodedFrames});
            observed.progress(renderedFrames);
          }});
        if (renderedFrames !== 5400 || encodedFrames !== 5400) throw new Error('Full render/encoding progress missing');
        if (guardEvents.length || Number(createdPages) !== 2) throw new Error('Render did not complete in one page attempt');
        observed.progress(5400); finalClose = true; await observed.close(true); active = null;
        const completedAtMs = monotonicMs();
        const lifecycle = reconcileObserverEvents(observed.events);
        const restarts = observeActiveProcessRestarts(lifecycle.memory.samples, lifecycle.memory.processChanges);
        const observation = await writeEvidence(directory, `${variant}-lifecycle.json`, {events: observed.events, reconciliation: lifecycle, restarts});
        const progressEvidence = await writeEvidence(directory, `${variant}-progress.json`, progressLog);
        const timingEvidence = await writeEvidence(directory, `${variant}-timing.json`, {startedAtMs, completedAtMs});
        const mp4 = await probeMp4(directory, variant, mp4Path, ffprobe);
        const render: RenderAcceptanceEvidence = {variant, binding, browserInstanceId: browser.id,
          progress: {evidence: progressEvidence, renderedFrames, encodedFrames, concurrency: 1, everyFrameRendered: true},
          timing: {evidence: timingEvidence, startedAtMs, completedAtMs, boundary: 'browser-open-to-mp4-and-browser-close'},
          mp4, memory: {evidence: observation, raw: lifecycle.memory},
          crashObservation: {evidence: observation, independent: true, complete: lifecycle.complete && restarts.complete,
            method: 'process-lifecycle', crashedProcesses: lifecycle.crashedProcesses,
            unexpectedRestarts: restarts.count, expectedFinalCloseExcluded: lifecycle.expectedFinalCloseExcluded}};
        renders.push(render);
        const ram = classifyMemory(lifecycle.memory);
        if (!lifecycle.complete || !restarts.complete || restarts.count !== 0 || lifecycle.crashedProcesses !== 0 || ram.classification !== 'PASS'
          || evaluateFrameCadence(mp4.frameTiming).classification !== 'PASS') throw new Error(`${variant}: FAIL or INCONCLUSIVE; stop before another render`);
        if (variant === 'dynamic' && (completedAtMs - startedAtMs > 25 * 60000
          || completedAtMs - startedAtMs > 3 * (renders[0]!.timing.completedAtMs - renders[0]!.timing.startedAtMs))) throw new Error('Dynamic time or ratio failed');
      } finally {
        try {if (!finalClose) await observed.close(false);}
        finally {active = null; await writeEvidence(directory, `${variant}-guards.json`, {createdPages, events: guardEvents});}
      }
    }
  } catch (error) {failure = errorText(error);}
  finally {
    const report = {preflight, renders, failure, classification: 'INCONCLUSIVE', opensWp005: false,
      visualReview: null, jobTiming: {complete: false, startedAtMs: jobStart, snapshotAtMs: monotonicMs(),
        reason: 'Final GitHub job end, storage receipts and owner visual review must be reconciled after this job exits'}};
    await writeEvidence(directory, 'report.json', report);
    try {
      const retained = /^(inventory|browser-acquisition|report|static-(lifecycle|progress|timing|ffprobe|guards)|dynamic-(lifecycle|progress|timing|ffprobe|guards))\.json$|^(static|dynamic)\.mp4$/;
      for (const name of (await fs.readdir(directory)).filter(name => retained.test(name))) {
        const path = join(directory, name); if (!(await fs.stat(path)).isFile()) continue;
        await storage.upload(name, await fs.readFile(path), name.endsWith('.mp4') ? 'video/mp4' : 'application/json');
      }
      for (const variant of BENCHMARK_SPEC.renderOrder) for (const name of ['observer.jsonl', 'browser-stderr.log', 'launch.json']) {
        const path = join(directory, variant, name);
        const present = await fs.stat(path).then(s => s.isFile()).catch(() => false);
        if (present) await storage.upload(`${variant}-${name}`, await fs.readFile(path), 'application/octet-stream');
      }
      const reportSha256 = digest(await fs.readFile(join(directory, 'report.json')));
      await fs.rm(directory, {recursive: true});
      console.log(JSON.stringify({benchmarkId: authorization.benchmarkId, sourceCommitSha: authorization.sourceCommitSha,
        reportSha256, failure, controllerExitAtMs: monotonicMs(),
        classification: 'INCONCLUSIVE', reason: 'Owner review and final job reconciliation required'}));
    } finally {clearTimeout(deadline);}
  }
  if (failure) throw new Error(failure);
}

async function commandLine(): Promise<void> {
  const [command, path, extra] = process.argv.slice(2);
  if (extra || !path || (command !== '--bundle-offline' && command !== '--benchmark')) throw new Error('Usage: canvas-spike.ts --bundle-offline ABSOLUTE_JOB_TMP | --benchmark AUTHORIZATION_JSON');
  if (command === '--bundle-offline') {console.log(await bundleOffline(path)); return;}
  await runBenchmark(path);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  commandLine().catch(error => {console.error(errorText(error)); process.exitCode = 1;});
}
