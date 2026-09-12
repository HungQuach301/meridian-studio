import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {validateAuthorizationPayload} from './canvas-spike.js';
import type {RunAuthorization} from './canvas-spike.js';

export const COMMAND_PATH = 'pipeline/wp004a-command.request';
export const COMMAND_WORKFLOW = '.github/workflows/canvas-spike-command.yml';
export const COMMAND_BRANCH = 'wp/WP-004a-run-wp004a-7f2a966-01';
export const COMMAND_ID = 'wp004a-7f2a966-01';
export const RELEASE_ID = 387547778;
export const RELEASE_TAG = 'wp004a-evidence-7f2a966';
export const MAX_COMMAND_BYTES = 16_384;
const REPOSITORY = 'HungQuach301/meridian-studio';
const OWNER = 'HungQuach301';
const OLD_SOURCE = '7f2a966a7340a2d44e3486c947d0795251dac2a3';
const SHA1 = /^(?!0{40}$)[0-9a-f]{40}$/;
const SHA256 = /^[0-9a-f]{64}$/;
const positiveId = (value: unknown): value is number => Number.isSafeInteger(value) && Number(value) > 0;
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const hash = (bytes: string | Uint8Array): string => createHash('sha256').update(bytes).digest('hex');
export const canonicalCommand = (value: unknown): string => JSON.stringify(value, null, 2) + '\n';

function requireCondition(value: unknown, code: string): asserts value {
  if (!value) throw new Error(code);
}
function object(value: unknown, code: string): Record<string, unknown> {
  requireCondition(record(value), code); return value;
}
function exactKeys(value: Record<string, unknown>, keys: readonly string[], code: string): void {
  requireCondition(Object.keys(value).sort().join('\0') === [...keys].sort().join('\0'), code);
}
interface TextEvidence {id: string; sha256: string; text: string}
export interface ApprovedCommand {
  schema: 'WP-004a-command-v1';
  operation: 'execute-one-benchmark';
  requestId: typeof COMMAND_ID;
  sourceTreeSha: string;
  releaseTag: typeof RELEASE_TAG;
  ownerApproval: TextEvidence;
  costEstimate: TextEvidence;
  authorization: RunAuthorization;
}
function textEvidence(value: unknown, code: string): TextEvidence {
  const v = object(value, code);
  exactKeys(v, ['id', 'sha256', 'text'], code);
  requireCondition(typeof v.id === 'string' && v.id.length > 0 && v.id.length <= 256
    && typeof v.text === 'string' && v.text.trim().length > 0
    && typeof v.sha256 === 'string' && SHA256.test(v.sha256) && hash(v.text) === v.sha256, code);
  return v as unknown as TextEvidence;
}

/** Canonical JSON rejects duplicate keys, alternate encodings and trailing data. */
export function parseApprovedCommand(bytes: Uint8Array): ApprovedCommand {
  requireCondition(bytes.byteLength > 0 && bytes.byteLength <= MAX_COMMAND_BYTES, 'WP004A_COMMAND_SIZE');
  const text = new TextDecoder('utf-8', {fatal: true}).decode(bytes);
  let value: unknown;
  try {value = JSON.parse(text);} catch {throw new Error('WP004A_COMMAND_JSON');}
  const v = object(value, 'WP004A_COMMAND_SHAPE');
  requireCondition(canonicalCommand(v) === text && Buffer.from(text).equals(Buffer.from(bytes)), 'WP004A_COMMAND_CANONICAL');
  exactKeys(v, ['schema', 'operation', 'requestId', 'sourceTreeSha', 'releaseTag', 'ownerApproval', 'costEstimate', 'authorization'], 'WP004A_COMMAND_FIELDS');
  requireCondition(v.schema === 'WP-004a-command-v1' && v.operation === 'execute-one-benchmark'
    && v.requestId === COMMAND_ID && v.releaseTag === RELEASE_TAG
    && typeof v.sourceTreeSha === 'string' && SHA1.test(v.sourceTreeSha), 'WP004A_COMMAND_IDENTITY');
  const a = object(v.authorization, 'WP004A_COMMAND_AUTHORIZATION');
  requireCondition(typeof a.sourceCommitSha === 'string' && a.sourceCommitSha !== OLD_SOURCE,
    'WP004A_COMMAND_REQUIRES_NEW_SOURCE_APPROVAL');
  const checked = validateAuthorizationPayload(a, a.sourceCommitSha);
  requireCondition(checked.valid, 'WP004A_COMMAND_AUTHORIZATION: ' + checked.reasons.join('; '));
  const authorization = a as unknown as RunAuthorization;
  requireCondition(authorization.benchmarkId === COMMAND_ID && authorization.releaseId === RELEASE_ID
    && authorization.limits.maximumJobMinutes === 75 && authorization.limits.maximumCostUsd <= 5 && authorization.costUpperBoundUsd > 0
    && authorization.lockfileSha256 === '15bb41977e477547db464ee867f4f71f86cd300e7b09b9523e3bbcf73788843d'
    && authorization.browser.archiveSha256 === 'a3b011ab4c726e215cdeb623907a09cfb48f07054a7271fdda555ee2ae4f804d'
    && authorization.browser.sha256 === '08288ffd5b22e39c652d3f4b3a37a0108a8ce167f592c7db67f10cc72e397d3a',
    'WP004A_COMMAND_REVIEWED_PINS');
  const approval = textEvidence(v.ownerApproval, 'WP004A_COMMAND_OWNER_EVIDENCE');
  textEvidence(v.costEstimate, 'WP004A_COMMAND_COST_EVIDENCE');
  requireCondition(approval.text.includes(authorization.sourceCommitSha)
    && approval.text.includes(COMMAND_ID) && approval.text.includes(String(RELEASE_ID)),
    'WP004A_COMMAND_OWNER_BINDING');
  for (const name of ['benchmark', 'browser', 'license', 'cost', 'storage'] as const) {
    requireCondition(authorization.approvals[name].id === approval.id
      && authorization.approvals[name].sha256 === approval.sha256, 'WP004A_COMMAND_APPROVAL_REFERENCE');
  }
  return v as unknown as ApprovedCommand;
}

export interface CommandContext {
  repository: string; actor: string; triggeringActor: string; eventName: string;
  attempt: string; ref: string; commandSha: string; runId: number; githubActions: string;
}
export function commandContext(env: NodeJS.ProcessEnv): CommandContext {
  const runId = Number(env.GITHUB_RUN_ID);
  const value = {repository: env.GITHUB_REPOSITORY ?? '', actor: env.GITHUB_ACTOR ?? '',
    triggeringActor: env.GITHUB_TRIGGERING_ACTOR ?? '', eventName: env.GITHUB_EVENT_NAME ?? '',
    attempt: env.GITHUB_RUN_ATTEMPT ?? '', ref: env.GITHUB_REF ?? '', commandSha: env.GITHUB_SHA ?? '',
    githubActions: env.GITHUB_ACTIONS ?? '', runId};
  requireCondition(value.githubActions === 'true' && value.repository === REPOSITORY
    && value.actor === OWNER && value.triggeringActor === OWNER && value.eventName === 'push'
    && value.attempt === '1' && value.ref === 'refs/heads/' + COMMAND_BRANCH
    && SHA1.test(value.commandSha) && positiveId(runId), 'WP004A_COMMAND_CONTEXT');
  return value;
}
export function verifyPushEvent(value: unknown, context: CommandContext): void {
  const event = object(value, 'WP004A_COMMAND_EVENT');
  const repo = object(event.repository, 'WP004A_COMMAND_EVENT_REPOSITORY');
  const sender = object(event.sender, 'WP004A_COMMAND_EVENT_SENDER');
  requireCondition(repo.full_name === REPOSITORY && repo.private === true && repo.default_branch === 'main'
    && sender.login === OWNER && event.ref === context.ref && event.after === context.commandSha
    && event.before === '0'.repeat(40) && event.created === true && event.deleted === false
    && event.forced === false, 'WP004A_COMMAND_NEW_BRANCH_ONLY');
}

function git(root: string, args: string[]): string {
  return execFileSync('git', args, {cwd: root, encoding: 'utf8', timeout: 30_000, maxBuffer: 2 * 1024 * 1024});
}
export function verifyCommandGit(root: string, context: CommandContext, command: ApprovedCommand, bytes: Uint8Array): {commandBlobSha: string} {
  const source = command.authorization.sourceCommitSha;
  requireCondition(git(root, ['rev-parse', 'HEAD']).trim() === source, 'WP004A_COMMAND_CHECKOUT');
  requireCondition(git(root, ['rev-parse', source + '^{tree}']).trim() === command.sourceTreeSha, 'WP004A_COMMAND_SOURCE_TREE');
  requireCondition(git(root, ['show', '-s', '--format=%P', context.commandSha]).trim() === source,
    'WP004A_COMMAND_SINGLE_PARENT');
  const blob = createHash('sha1').update('blob ' + bytes.byteLength + '\0').update(bytes).digest('hex');
  const expected = ':000000 100644 ' + '0'.repeat(40) + ' ' + blob + ' A\t' + COMMAND_PATH + '\n';
  requireCondition(git(root, ['diff-tree', '--no-commit-id', '--raw', '--no-abbrev', '--no-renames', '-r', source, context.commandSha, '--']) === expected,
    'WP004A_COMMAND_ONLY_REQUEST_ADDED');
  requireCondition(git(root, ['show', context.commandSha + ':' + COMMAND_PATH]) === Buffer.from(bytes).toString('utf8'),
    'WP004A_COMMAND_BYTES');
  requireCondition(git(root, ['status', '--porcelain', '--untracked-files=all']) === '', 'WP004A_COMMAND_DIRTY_SOURCE');
  return {commandBlobSha: blob};
}

export type ReadApi = (path: string) => Promise<unknown>;
export function githubReader(token: string, transport: typeof fetch = fetch): ReadApi {
  requireCondition(token.length > 0, 'WP004A_COMMAND_TOKEN');
  return async path => {
    requireCondition(path === '' || /^\/(?:branches\/main|actions\/runs(?:\/[1-9][0-9]*|\?per_page=100&page=[1-9][0-9]*)?|releases\/[1-9][0-9]*(?:\/assets\?per_page=100)?)$/.test(path),
      'WP004A_COMMAND_API_PATH');
    const response = await transport('https://api.github.com/repos/' + REPOSITORY + path, {
      method: 'GET', redirect: 'error', signal: AbortSignal.timeout(30_000),
      headers: {Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'},
    });
    requireCondition(response.status === 200, 'WP004A_COMMAND_API_HTTP_' + response.status);
    return response.json() as Promise<unknown>;
  };
}

/** Retain every page; missing, duplicate or changing history is not zero history. */
export async function readCommandHistory(read: ReadApi): Promise<Record<string, unknown>[]> {
  const runs: Record<string, unknown>[] = [];
  let total = -1;
  for (let page = 1; page <= 10; page++) {
    const value = object(await read('/actions/runs?per_page=100&page=' + page), 'WP004A_COMMAND_HISTORY');
    requireCondition(Number.isSafeInteger(value.total_count) && Number(value.total_count) >= 1
      && Number(value.total_count) <= 1000 && Array.isArray(value.workflow_runs), 'WP004A_COMMAND_HISTORY');
    if (total === -1) total = Number(value.total_count);
    requireCondition(value.total_count === total, 'WP004A_COMMAND_HISTORY_CHANGED');
    const batch = value.workflow_runs.map(item => object(item, 'WP004A_COMMAND_HISTORY_ROW'));
    requireCondition(batch.length === Math.min(100, total - runs.length), 'WP004A_COMMAND_HISTORY_INCOMPLETE');
    runs.push(...batch);
    if (runs.length === total) {
      requireCondition(runs.every(run => positiveId(run.id)) && new Set(runs.map(run => run.id)).size === total,
        'WP004A_COMMAND_HISTORY_DUPLICATE');
      return runs;
    }
  }
  throw new Error('WP004A_COMMAND_HISTORY_INCOMPLETE');
}

export async function verifyCommandRemote(command: ApprovedCommand, context: CommandContext, read: ReadApi): Promise<Record<string, unknown>> {
  const repo = object(await read(''), 'WP004A_COMMAND_REPOSITORY');
  requireCondition(repo.full_name === REPOSITORY && repo.private === true && repo.default_branch === 'main', 'WP004A_COMMAND_PRIVATE');
  const branch = object(await read('/branches/main'), 'WP004A_COMMAND_MAIN');
  const commit = object(branch.commit, 'WP004A_COMMAND_MAIN');
  const metadata = object(commit.commit, 'WP004A_COMMAND_MAIN');
  const tree = object(metadata.tree, 'WP004A_COMMAND_MAIN');
  requireCondition(commit.sha === command.authorization.sourceCommitSha && tree.sha === command.sourceTreeSha,
    'WP004A_COMMAND_MAIN_MOVED');
  const release = object(await read('/releases/' + RELEASE_ID), 'WP004A_COMMAND_RELEASE');
  const assets = await read('/releases/' + RELEASE_ID + '/assets?per_page=100');
  requireCondition(release.id === RELEASE_ID && release.tag_name === RELEASE_TAG
    && release.target_commitish === command.authorization.sourceCommitSha && release.draft === true
    && release.prerelease === false && release.published_at === null
    && Array.isArray(release.assets) && release.assets.length === 0 && Array.isArray(assets) && assets.length === 0,
    'WP004A_COMMAND_DRAFT_CHANGED');
  const run = object(await read('/actions/runs/' + context.runId), 'WP004A_COMMAND_RUN');
  const actor = object(run.actor, 'WP004A_COMMAND_RUN_ACTOR');
  const triggeringActor = object(run.triggering_actor, 'WP004A_COMMAND_RUN_ACTOR');
  requireCondition(run.id === context.runId && run.path === COMMAND_WORKFLOW
    && run.event === 'push' && run.head_sha === context.commandSha && run.head_branch === COMMAND_BRANCH
    && run.run_attempt === 1 && run.status === 'in_progress'
    && actor.login === OWNER && triggeringActor.login === OWNER, 'WP004A_COMMAND_RUN_BINDING');
  const history = await readCommandHistory(read);
  // Malformed rows cannot hide an earlier benchmark behind a missing path.
  requireCondition(history.every(item => typeof item.path === 'string' && typeof item.head_sha === 'string'
    && typeof item.event === 'string' && positiveId(item.run_attempt)), 'WP004A_COMMAND_HISTORY_ROW');
  const benchmarkRuns = history.filter(item => item.path === COMMAND_WORKFLOW || item.path === '.github/workflows/canvas-spike.yml');
  requireCondition(benchmarkRuns.length === 1 && benchmarkRuns[0]!.id === context.runId
    && benchmarkRuns[0]!.head_sha === context.commandSha && benchmarkRuns[0]!.run_attempt === 1,
    'WP004A_COMMAND_ALREADY_ATTEMPTED');
  const creation = history.find(item => item.id === 34690874856);
  requireCondition(creation?.conclusion === 'failure' && creation.run_attempt === 1, 'WP004A_COMMAND_CREATION_HISTORY_CHANGED');
  for (const path of ['.github/workflows/ci.yml', '.github/workflows/hello.yml']) {
    const sourceRuns = history.filter(item => item.path === path && item.event === 'push'
      && item.head_sha === command.authorization.sourceCommitSha);
    requireCondition(sourceRuns.length > 0 && sourceRuns.every(item => item.status === 'completed' && item.conclusion === 'success'),
      'WP004A_COMMAND_SOURCE_CI');
  }
  return {observedAtUtc: new Date().toISOString(), repositoryPrivate: true,
    main: commit.sha, sourceTreeSha: tree.sha,
    release: {id: release.id, tag: release.tag_name, target: release.target_commitish,
      draft: release.draft, prerelease: release.prerelease, publishedAt: release.published_at, assets},
    history, creationFailure: 'RELEASE_COUNT_CHANGED',
    creationFailureLogSource: 'Retained preflight log; the absent historical Release-list response is not reconstructed'};
}

export async function loadApprovedCommand(commandPath: string, root: string,
  env: NodeJS.ProcessEnv = process.env, read?: ReadApi): Promise<{authorization: RunAuthorization; receipt: Record<string, unknown>}> {
  const context = commandContext(env);
  requireCondition(env.GITHUB_EVENT_PATH, 'WP004A_COMMAND_EVENT_PATH');
  const bytes = await readFile(commandPath);
  const command = parseApprovedCommand(bytes);
  verifyPushEvent(JSON.parse(await readFile(env.GITHUB_EVENT_PATH, 'utf8')) as unknown, context);
  const local = verifyCommandGit(root, context, command, bytes);
  const remote = await verifyCommandRemote(command, context, read ?? githubReader(env.GITHUB_TOKEN ?? ''));
  return {authorization: command.authorization, receipt: {route: 'owner-approved-push',
    commandCommitSha: context.commandSha, commandBlobSha: local.commandBlobSha, commandSha256: hash(bytes),
    sourceCommitSha: command.authorization.sourceCommitSha, sourceTreeSha: command.sourceTreeSha,
    runId: context.runId, attempt: 1, event: 'push', actor: context.actor,
    ownerApproval: command.ownerApproval, costEstimate: command.costEstimate, command, remote}};
}

// Admission-only CLI has no write, dispatch, browser or renderer operation.
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const [mode, path, extra] = process.argv.slice(2);
  if (mode !== '--admit' || !path || extra) {
    console.error('Usage: canvas-spike-command.ts --admit COMMAND_JSON'); process.exitCode = 1;
  } else {
    loadApprovedCommand(path, fileURLToPath(new URL('..', import.meta.url))).then(result => {
      console.log(JSON.stringify({admitted: true, benchmarkExecuted: false,
        source: result.authorization.sourceCommitSha, command: result.receipt.commandCommitSha,
        requestId: result.authorization.benchmarkId}));
    }).catch(error => {console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1;});
  }
}
