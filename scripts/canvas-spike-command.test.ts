import {test} from 'vitest';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, chmodSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {BENCHMARK_SPEC, BROWSER_ARCHIVE_URL, BROWSER_VERSION, validateRunAuthorization} from './canvas-spike.js';
import {COMMAND_BRANCH, COMMAND_ID, COMMAND_PATH, COMMAND_WORKFLOW, RELEASE_ID, RELEASE_TAG,
  canonicalCommand, parseApprovedCommand, commandContext, verifyPushEvent, verifyCommandGit,
  githubReader, readCommandHistory, verifyCommandRemote, loadApprovedCommand} from './canvas-spike-command.js';
import type {ApprovedCommand, CommandContext, ReadApi} from './canvas-spike-command.js';

const hash = (text: string): string => createHash('sha256').update(text).digest('hex');
const SOURCE = 'a'.repeat(40);
const TREE = 'b'.repeat(40);
function command(source = SOURCE, tree = TREE): ApprovedCommand {
  const text = 'SYNTHETIC TEST ONLY; NOT OWNER AUTHORIZATION. ' + source + ' ' + COMMAND_ID + ' ' + RELEASE_ID;
  const approval = {id: 'synthetic-owner-approval', sha256: hash(text), text};
  const costText = 'SYNTHETIC ESTIMATE ONLY; include the benchmark job and push CI/Hello.';
  return {schema: 'WP-004a-command-v1', operation: 'execute-one-benchmark', requestId: COMMAND_ID,
    sourceTreeSha: tree, releaseTag: RELEASE_TAG, ownerApproval: approval,
    costEstimate: {id: 'synthetic-cost', sha256: hash(costText), text: costText},
    authorization: {schema: 'WP-004a-run-v1', repository: 'HungQuach301/meridian-studio',
      sourceCommitSha: source, benchmarkId: COMMAND_ID, configuration: BENCHMARK_SPEC, attempt: 1,
      limits: {maximumJobMinutes: 75, maximumCostUsd: 5}, costUpperBoundUsd: 1,
      approvals: Object.fromEntries(['benchmark', 'browser', 'license', 'cost', 'storage']
        .map(name => [name, {id: approval.id, sha256: approval.sha256}])) as ApprovedCommand['authorization']['approvals'],
      browser: {archiveUrl: BROWSER_ARCHIVE_URL, archiveSha256: 'a3b011ab4c726e215cdeb623907a09cfb48f07054a7271fdda555ee2ae4f804d',
        version: BROWSER_VERSION, sha256: '08288ffd5b22e39c652d3f4b3a37a0108a8ce167f592c7db67f10cc72e397d3a'},
      releaseId: RELEASE_ID, lockfileSha256: '15bb41977e477547db464ee867f4f71f86cd300e7b09b9523e3bbcf73788843d'}};
}
const bytes = (value: unknown): Buffer => Buffer.from(canonicalCommand(value));
const context: CommandContext = {repository: 'HungQuach301/meridian-studio', actor: 'HungQuach301',
  triggeringActor: 'HungQuach301', eventName: 'push', attempt: '1', ref: 'refs/heads/' + COMMAND_BRANCH,
  commandSha: 'c'.repeat(40), runId: 9001, githubActions: 'true'};
function environment(ctx = context): NodeJS.ProcessEnv {
  return {GITHUB_ACTIONS: ctx.githubActions, GITHUB_REPOSITORY: ctx.repository, GITHUB_ACTOR: ctx.actor,
    GITHUB_TRIGGERING_ACTOR: ctx.triggeringActor, GITHUB_EVENT_NAME: ctx.eventName, GITHUB_RUN_ATTEMPT: ctx.attempt,
    GITHUB_REF: ctx.ref, GITHUB_SHA: ctx.commandSha, GITHUB_RUN_ID: String(ctx.runId)};
}
function pushEvent(ctx = context): Record<string, unknown> {
  return {repository: {full_name: ctx.repository, private: true, default_branch: 'main'}, sender: {login: ctx.actor},
    before: '0'.repeat(40), after: ctx.commandSha, ref: ctx.ref, created: true, deleted: false, forced: false};
}
function apiFixture(value = command(), ctx = context): {data: Record<string, unknown>; read: ReadApi; calls: string[]} {
  const current = {id: ctx.runId, path: COMMAND_WORKFLOW, event: 'push', head_sha: ctx.commandSha,
    head_branch: COMMAND_BRANCH, run_attempt: 1, status: 'in_progress', conclusion: null,
    actor: {login: 'HungQuach301'}, triggering_actor: {login: 'HungQuach301'}};
  const history = [current,
    {id: 34690874856, path: '.github/workflows/wp004a-draft-release.yml', event: 'push', head_sha: 'd'.repeat(40),
      run_attempt: 1, status: 'completed', conclusion: 'failure'},
    ...['ci', 'hello'].map((name, index) => ({id: 9002 + index, path: '.github/workflows/' + name + '.yml',
      event: 'push', head_sha: value.authorization.sourceCommitSha, run_attempt: 1, status: 'completed', conclusion: 'success'}))];
  const data: Record<string, unknown> = {
    '': {full_name: ctx.repository, private: true, default_branch: 'main'},
    '/branches/main': {commit: {sha: value.authorization.sourceCommitSha, commit: {tree: {sha: value.sourceTreeSha}}}},
    ['/releases/' + RELEASE_ID]: {id: RELEASE_ID, tag_name: RELEASE_TAG, target_commitish: value.authorization.sourceCommitSha,
      draft: true, prerelease: false, published_at: null, assets: []},
    ['/releases/' + RELEASE_ID + '/assets?per_page=100']: [],
    ['/actions/runs/' + ctx.runId]: current,
    '/actions/runs?per_page=100&page=1': {total_count: history.length, workflow_runs: history},
  };
  const calls: string[] = [];
  const read: ReadApi = async path => {
    calls.push(path); assert.ok(path in data, 'Unexpected API fixture path ' + path); return structuredClone(data[path]);
  };
  return {data, read, calls};
}
function row(value: unknown): Record<string, unknown> {assert.ok(value && typeof value === 'object' && !Array.isArray(value)); return value as Record<string, unknown>;}
function historyRows(data: Record<string, unknown>): Record<string, unknown>[] {
  return row(data['/actions/runs?per_page=100&page=1']).workflow_runs as Record<string, unknown>[];
}

test('command schema binds all five references to retained owner text and exact reviewed pins', () => {
  const value = command(); assert.deepEqual(parseApprovedCommand(bytes(value)), value);
  assert.equal(validateRunAuthorization(value.authorization, {...context, sourceCommitSha: SOURCE}).valid, false);
});

test('old dispatch authorization and old source cannot be silently migrated to a command', () => {
  assert.throws(() => parseApprovedCommand(bytes(command().authorization)), /COMMAND_FIELDS/);
  assert.throws(() => parseApprovedCommand(bytes(command('7f2a966a7340a2d44e3486c947d0795251dac2a3'))), /NEW_SOURCE_APPROVAL/);
});

test('duplicate keys, BOM, malformed JSON, trailing data and oversized requests are refused', () => {
  const original = canonicalCommand(command());
  for (const bad of ['{', original + ' ', original.replace('{\n', '{\n  "schema": "duplicate",\n'),
    '\ufeff' + original, original + 'x'.repeat(16385)]) {
    assert.throws(() => parseApprovedCommand(Buffer.from(bad)));
  }
  assert.throws(() => parseApprovedCommand(Buffer.from([0xff, 0xfe])));
});

test('command data rejects extra operations, another slot, changed tree or missing evidence', () => {
  for (const change of [{operation: 'publish-release'}, {requestId: 'new-attempt'}, {sourceTreeSha: '0'.repeat(40)},
    {releaseTag: 'another-release'}, {ownerApproval: null}, {costEstimate: null}, {dispatch: true}]) {
    assert.throws(() => parseApprovedCommand(bytes({...command(), ...change})));
  }
});

test('approval text, five individual references and cost receipt cannot be substituted', () => {
  for (const field of ['ownerApproval', 'costEstimate'] as const) {
    const value = command(); value[field].text += ' altered';
    assert.throws(() => parseApprovedCommand(bytes(value)), /EVIDENCE/);
  }
  const value = command(); value.authorization = {...value.authorization,
    approvals: {...value.authorization.approvals, storage: {...value.authorization.approvals.storage, sha256: 'f'.repeat(64)}}};
  assert.throws(() => parseApprovedCommand(bytes(value)), /APPROVAL_REFERENCE/);
  const other = command(); other.ownerApproval.text = 'unbound';
  other.ownerApproval.sha256 = hash('unbound');
  assert.throws(() => parseApprovedCommand(bytes(other)), /OWNER_BINDING/);
});

test('money, job limit, configuration, browser, dependency and Release remain bounded', () => {
  for (const mutate of [
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, costUpperBoundUsd: 5.01};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, limits: {maximumCostUsd: 6, maximumJobMinutes: 75}};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, limits: {maximumCostUsd: 5, maximumJobMinutes: 74}};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, releaseId: 1};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, browser: {...v.authorization.browser, sha256: 'f'.repeat(64)}};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization, lockfileSha256: 'f'.repeat(64)};},
    (v: ApprovedCommand) => {v.authorization = {...v.authorization,
      configuration: {...v.authorization.configuration, blurPx: 0} as unknown as typeof BENCHMARK_SPEC};},
  ]) {const value = command(); mutate(value); assert.throws(() => parseApprovedCommand(bytes(value)));}
});

test('only the first owner push on the exact command branch is an execution context', () => {
  assert.deepEqual(commandContext(environment()), context);
  for (const change of [{GITHUB_ACTIONS: 'false'}, {GITHUB_ACTOR: 'github-actions[bot]'},
    {GITHUB_TRIGGERING_ACTOR: 'another-user'}, {GITHUB_EVENT_NAME: 'workflow_dispatch'},
    {GITHUB_EVENT_NAME: 'pull_request'}, {GITHUB_RUN_ATTEMPT: '2'}, {GITHUB_REF: 'refs/heads/main'},
    {GITHUB_REF: 'refs/heads/wp/WP-004a-auto-command'}, {GITHUB_SHA: '0'.repeat(40)},
    {GITHUB_REPOSITORY: 'HungQuach301/another-repo'}, {GITHUB_RUN_ID: 'NaN'}]) {
    assert.throws(() => commandContext({...environment(), ...change}), /COMMAND_CONTEXT/);
  }
});

test('branch updates, force pushes, deletes and wrong event provenance are refused', () => {
  verifyPushEvent(pushEvent(), context);
  for (const change of [{created: false}, {deleted: true}, {forced: true}, {before: SOURCE},
    {after: SOURCE}, {ref: 'refs/heads/main'}, {sender: {login: 'other'}},
    {repository: {full_name: context.repository, private: false, default_branch: 'main'}}]) {
    assert.throws(() => verifyPushEvent({...pushEvent(), ...change}, context), /COMMAND_NEW_BRANCH_ONLY/);
  }
});

interface GitFixture {
  root: string; dir: string; value: ApprovedCommand; context: CommandContext; input: Buffer;
  git: (...args: string[]) => string;
}
function gitFixture(variant = 'normal'): GitFixture {
  const dir = mkdtempSync(join(tmpdir(), 'wp004a-command-test-'));
  const root = join(dir, 'repo'); mkdirSync(root);
  const git = (...args: string[]): string => execFileSync('git', ['-c', 'user.name=Synthetic Fixture',
    '-c', 'user.email=fixture@example.invalid', '-c', 'commit.gpgsign=false', ...args],
    {cwd: root, encoding: 'utf8', timeout: 30_000}).trim();
  git('init', '-q', '-b', 'main');
  writeFileSync(join(root, 'README.md'), 'SYNTHETIC SOURCE ONLY\n');
  mkdirSync(join(root, 'pipeline'));
  writeFileSync(join(root, 'pipeline/state.json'), '{"synthetic":true}\n');
  writeFileSync(join(root, 'package-lock.json'), readFileSync(new URL('../package-lock.json', import.meta.url)));
  git('add', '--all'); git('commit', '-qm', 'Synthetic source');
  const source = git('rev-parse', 'HEAD'); const tree = git('rev-parse', 'HEAD^{tree}');
  const value = command(source, tree); const input = bytes(value);
  writeFileSync(join(root, COMMAND_PATH), input);
  if (variant === 'extra-file') writeFileSync(join(root, 'unapproved.txt'), 'changed\n');
  if (variant === 'changed-source') writeFileSync(join(root, 'README.md'), 'changed\n');
  if (variant === 'executable-mode') chmodSync(join(root, COMMAND_PATH), 0o755);
  git('add', '--all'); git('commit', '-qm', 'Synthetic command');
  if (variant === 'second-parent-step') git('commit', '--allow-empty', '-qm', 'Another commit');
  const commandSha = git('rev-parse', 'HEAD');
  git('checkout', '-q', '--detach', source);
  return {root, dir, value, context: {...context, commandSha}, input, git};
}
function withGit(variant: string, check: (fixture: GitFixture) => void): void {
  const fixture = gitFixture(variant);
  try {check(fixture);} finally {rmSync(fixture.dir, {recursive: true, force: true});}
}

test('real Git objects prove the one-file command, source parent, tree, mode and bytes', () => {
  withGit('normal', f => assert.match(verifyCommandGit(f.root, f.context, f.value, f.input).commandBlobSha, /^[0-9a-f]{40}$/));
});

test('command cannot smuggle another file, executable mode, source edit or extra commit', () => {
  for (const variant of ['extra-file', 'changed-source', 'executable-mode', 'second-parent-step']) {
    withGit(variant, f => assert.throws(() => verifyCommandGit(f.root, f.context, f.value, f.input), /COMMAND_/));
  }
});

test('wrong checkout, source tree, temporary command bytes and dirty source fail before API calls', () => {
  withGit('normal', f => {
    assert.throws(() => verifyCommandGit(f.root, f.context, {...f.value, sourceTreeSha: TREE}, f.input), /SOURCE_TREE/);
    assert.throws(() => verifyCommandGit(f.root, f.context, f.value, Buffer.concat([f.input, Buffer.from(' ')])), /ONLY_REQUEST_ADDED/);
    writeFileSync(join(f.root, 'untracked.txt'), 'not allowed');
    assert.throws(() => verifyCommandGit(f.root, f.context, f.value, f.input), /DIRTY_SOURCE/);
    rmSync(join(f.root, 'untracked.txt'));
    f.git('checkout', '-q', '--detach', f.context.commandSha);
    assert.throws(() => verifyCommandGit(f.root, f.context, f.value, f.input), /CHECKOUT/);
  });
});

test('remote admission keeps an independently verified draft distinct from the failed creation run', async () => {
  const fixture = apiFixture();
  const result = await verifyCommandRemote(command(), context, fixture.read);
  assert.equal(result.creationFailure, 'RELEASE_COUNT_CHANGED');
  assert.deepEqual(row(result.release).assets, []);
  assert.ok(!fixture.calls.includes('/releases'), 'No reconstructed Release-list response');
});

test('private, main SHA/tree, draft target/tag/flags and both asset views are mandatory', async () => {
  const changes: [string, Record<string, unknown>][] = [
    ['', {private: false}],
    ['/branches/main', {commit: {sha: 'f'.repeat(40), commit: {tree: {sha: TREE}}}}],
    ['/branches/main', {commit: {sha: SOURCE, commit: {tree: {sha: 'f'.repeat(40)}}}}],
    ...[{id: 1}, {tag_name: 'other'}, {target_commitish: 'main'}, {draft: false},
      {prerelease: true}, {published_at: '2026-01-01'}, {assets: [{name: 'existing'}]}]
      .map(change => ['/releases/' + RELEASE_ID, change] as [string, Record<string, unknown>]),
  ];
  for (const [path, change] of changes) {
    const f = apiFixture(); f.data[path] = {...row(f.data[path]), ...change};
    await assert.rejects(verifyCommandRemote(command(), context, f.read), /COMMAND_/);
  }
  const f = apiFixture(); f.data['/releases/' + RELEASE_ID + '/assets?per_page=100'] = [{id: 1}];
  await assert.rejects(verifyCommandRemote(command(), context, f.read), /DRAFT_CHANGED/);
});

test('actual run identity rejects other actors, event, source, branch, attempt and stopped job', async () => {
  for (const change of [{actor: {login: 'other'}}, {triggering_actor: {login: 'other'}}, {event: 'workflow_dispatch'},
    {head_sha: SOURCE}, {head_branch: 'main'}, {run_attempt: 2}, {status: 'completed'}, {path: '.github/workflows/ci.yml'}]) {
    const f = apiFixture(); const path = '/actions/runs/' + context.runId;
    f.data[path] = {...row(f.data[path]), ...change};
    await assert.rejects(verifyCommandRemote(command(), context, f.read), /RUN_BINDING/);
  }
});

test('an earlier manual or command attempt blocks execution even without a claim asset', async () => {
  for (const path of ['.github/workflows/canvas-spike.yml', COMMAND_WORKFLOW]) {
    const f = apiFixture(); const rows = historyRows(f.data);
    rows.push({...rows[0], id: 7777, path, status: 'completed', conclusion: 'failure'});
    row(f.data['/actions/runs?per_page=100&page=1']).total_count = rows.length;
    await assert.rejects(verifyCommandRemote(command(), context, f.read), /ALREADY_ATTEMPTED/);
  }
});

test('missing current run, malformed history, creation changes and missing or failed source CI block', async () => {
  for (const mutation of [
    (rows: Record<string, unknown>[]) => {rows[0] = {...rows[0], id: 9999};},
    (rows: Record<string, unknown>[]) => {delete rows[1]!.path;},
    (rows: Record<string, unknown>[]) => {rows[1]!.conclusion = 'success';},
    (rows: Record<string, unknown>[]) => {rows[2]!.head_sha = 'f'.repeat(40);},
    (rows: Record<string, unknown>[]) => {rows[3]!.conclusion = 'failure';},
  ]) {
    const f = apiFixture(); mutation(historyRows(f.data));
    await assert.rejects(verifyCommandRemote(command(), context, f.read), /COMMAND_/);
  }
});

test('all history pages are required; duplicates, changed totals and truncation fail closed', async () => {
  const rows = Array.from({length: 101}, (_, index) => ({id: index + 1}));
  const pages: Record<string, unknown> = {
    '/actions/runs?per_page=100&page=1': {total_count: 101, workflow_runs: rows.slice(0, 100)},
    '/actions/runs?per_page=100&page=2': {total_count: 101, workflow_runs: rows.slice(100)},
  };
  assert.equal((await readCommandHistory(async path => structuredClone(pages[path]))).length, 101);
  for (const page2 of [{total_count: 102, workflow_runs: rows.slice(100)}, {total_count: 101, workflow_runs: []},
    {total_count: 101, workflow_runs: [{id: 1}]}]) {
    await assert.rejects(readCommandHistory(async path => path.endsWith('=2') ? page2 : pages[path]), /HISTORY_/);
  }
  await assert.rejects(readCommandHistory(async () => ({total_count: 1001, workflow_runs: []})), /HISTORY/);
});

test('API adapter sends only fixed-host GETs, rejects redirects and never retries errors', async () => {
  let calls = 0;
  const read = githubReader('synthetic-credential', (async (url, init) => {
    calls++; assert.equal(url, 'https://api.github.com/repos/HungQuach301/meridian-studio');
    assert.equal(init?.method, 'GET'); assert.equal(init?.redirect, 'error');
    return new Response('{}', {status: 200});
  }) as typeof fetch);
  await read(''); assert.equal(calls, 1);
  for (const path of ['https://other.invalid', '/releases', '/dispatches', '/actions/runs/1/rerun', '/../other']) {
    await assert.rejects(read(path), /API_PATH/);
  }
  assert.equal(calls, 1);
  const denied = githubReader('synthetic-credential', (async () => {calls++; return new Response('{}', {status: 403});}) as typeof fetch);
  await assert.rejects(denied('/branches/main'), /API_HTTP_403/); assert.equal(calls, 2);
});

test('full admission combines real temporary Git with synthetic API without browser, writes or dispatch', async () => {
  const f = gitFixture();
  try {
    const eventPath = join(f.dir, 'event.json'); const commandPath = join(f.dir, 'command.json');
    writeFileSync(eventPath, JSON.stringify(pushEvent(f.context))); writeFileSync(commandPath, f.input);
    const env = {...environment(f.context), GITHUB_EVENT_PATH: eventPath};
    const api = apiFixture(f.value, f.context);
    const before = f.git('status', '--porcelain');
    const result = await loadApprovedCommand(commandPath, f.root, env, api.read);
    assert.equal(result.authorization.sourceCommitSha, f.value.authorization.sourceCommitSha);
    assert.equal(result.receipt.commandCommitSha, f.context.commandSha);
    assert.equal(result.receipt.event, 'push');
    assert.deepEqual(readFileSync(commandPath), f.input);
    assert.equal(f.git('status', '--porcelain'), before);
    let calls = 0;
    await assert.rejects(loadApprovedCommand(commandPath, f.root, {...env, GITHUB_RUN_ATTEMPT: '2'},
      async () => {calls++; throw new Error('must not read');}), /COMMAND_CONTEXT/);
    assert.equal(calls, 0);
  } finally {rmSync(f.dir, {recursive: true, force: true});}
});

test('workflow cannot run on PR/preparation/main and uses the same resource lock and immutable checkout', () => {
  const workflow = readFileSync(new URL('../.github/workflows/canvas-spike-command.yml', import.meta.url), 'utf8');
  assert.match(workflow, /branches: \['wp\/WP-004a-run-wp004a-7f2a966-01'\]/);
  assert.match(workflow, /paths: \['pipeline\/wp004a-command\.request'\]/);
  assert.doesNotMatch(workflow, /\n  (pull_request|workflow_dispatch|workflow_run|schedule):/);
  assert.match(workflow, /group: wp004a-canvas-spike/);
  assert.match(workflow, /timeout-minutes: 75/);
  assert.match(workflow, /git','checkout','--detach',source/);
  assert.match(workflow, /--benchmark-command/);
  assert.doesNotMatch(workflow, /GITHUB_(SHA|REF|ACTOR|EVENT_NAME)\s*=/);
});

test('actual workflow bootstrap checks out only the parent and rejects added files before copying the request', () => {
  const workflow = readFileSync(new URL('../.github/workflows/canvas-spike-command.yml', import.meta.url), 'utf8');
  const step = workflow.split('      - name: Prove one added command and check out its unchanged source\n')[1];
  assert.ok(step);
  const match = /          \/usr\/bin\/python3 - <<'PY'\n([\s\S]*?)          PY\n/.exec(step);
  assert.ok(match);
  const python = match[1]!.split('\n').map(line => line.startsWith('          ') ? line.slice(10) : line).join('\n');
  for (const variant of ['normal', 'extra-file', 'executable-mode', 'second-parent-step']) {
    withGit(variant, f => {
      f.git('checkout', '-q', '--detach', f.context.commandSha);
      const envPath = join(f.dir, 'github-env'); writeFileSync(envPath, '');
      const env = {...process.env, GITHUB_SHA: f.context.commandSha, GITHUB_RUN_ATTEMPT: '1',
        RUNNER_TEMP: f.dir, GITHUB_ENV: envPath};
      const run = (): void => {execFileSync('/usr/bin/python3', ['-c', python],
        {cwd: f.root, env, timeout: 30_000, stdio: 'pipe'});};
      if (variant === 'normal') {
        run(); assert.equal(f.git('rev-parse', 'HEAD'), f.value.authorization.sourceCommitSha);
        assert.deepEqual(readFileSync(join(f.dir, 'wp004a-command.json')), f.input);
        assert.equal(f.git('status', '--porcelain'), '');
        assert.equal(readFileSync(join(f.root, 'pipeline/state.json'), 'utf8'), '{"synthetic":true}\n');
        assert.equal(readFileSync(envPath, 'utf8'), 'WP004A_COMMAND_SOURCE_SHA=' + f.value.authorization.sourceCommitSha + '\n');
      } else {
        assert.throws(run);
        assert.throws(() => readFileSync(join(f.dir, 'wp004a-command.json')), /ENOENT/);
      }
    });
  }
});
