import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const repositoryRoot = ts.sys.getCurrentDirectory().replace(/\\/g, "/");
let fixtureRoot: string;
let output: string[];
let exitCode: number | undefined;

function writeFixture(path: string, content: string): void {
  const parts = path.split("/");
  let directory = fixtureRoot;
  for (const part of parts.slice(0, -1)) {
    directory += "/" + part;
    ts.sys.createDirectory(directory);
  }
  ts.sys.writeFile(fixtureRoot + "/" + path, content);
}

async function runValidator(): Promise<{ code: number | undefined; output: string }> {
  output = [];
  exitCode = undefined;
  vi.resetModules();
  await import("./validate-schemas");
  return { code: exitCode, output: output.join("") };
}

beforeEach(() => {
  // Fixtures live in the Linux Actions runner's temporary directory, never in the repo.
  fixtureRoot = "/tmp/meridian-wp000-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  ts.sys.createDirectory(fixtureRoot);
  ts.sys.createDirectory(fixtureRoot + "/episodes");
  const contracts = repositoryRoot + "/engine/contracts";
  for (const path of ts.sys.readDirectory(contracts, [".schema.json"], [], ["*.schema.json"])) {
    const content = ts.sys.readFile(path);
    if (content === undefined) throw new Error("Cannot copy schema fixture: " + path);
    writeFixture("engine/contracts/" + path.slice(contracts.length + 1), content);
  }
  writeFixture("pipeline/state.json", JSON.stringify({ updatedAt: "2026-01-01T00:00:00Z", episodes: [] }));
  vi.spyOn(ts.sys, "getCurrentDirectory").mockReturnValue(fixtureRoot);
  vi.spyOn(ts.sys, "write").mockImplementation((message) => { output.push(message); });
  vi.spyOn(ts.sys, "exit").mockImplementation((code) => { exitCode = code; });
});

afterEach(() => {
  vi.restoreAllMocks();
  for (const path of ts.sys.readDirectory(fixtureRoot, undefined, [], ["**/*"])) {
    ts.sys.deleteFile?.(path);
  }
});

describe("schema validator CLI", () => {
  it("accepts an empty pipeline state", async () => {
    const result = await runValidator();
    expect(result.code).toBe(0);
    expect(result.output).toContain("PASS pipeline/state.json -> pipeline-state.schema.json");
    expect(result.output).toContain("Validated 1 JSON file(s); 0 failure(s).");
  });

  it("rejects a state missing required episodes", async () => {
    writeFixture("pipeline/state.json", JSON.stringify({ updatedAt: "2026-01-01T00:00:00Z" }));
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("required property 'episodes'");
  });

  it("rejects a state with the wrong episodes type", async () => {
    writeFixture("pipeline/state.json", JSON.stringify({ updatedAt: "2026-01-01T00:00:00Z", episodes: "invalid" }));
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("must be array");
  });

  it("enforces the date-time format", async () => {
    writeFixture("pipeline/state.json", JSON.stringify({ updatedAt: "invalid-date", episodes: [] }));
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain('must match format "date-time"');
  });

  it("rejects malformed JSON", async () => {
    writeFixture("pipeline/state.json", "{");
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("FAIL pipeline/state.json:");
  });

  it("rejects a missing pipeline state", async () => {
    ts.sys.deleteFile?.(fixtureRoot + "/pipeline/state.json");
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("pipeline/state.json: required file is missing");
  });

  it("discovers and validates JSON nested under episodes", async () => {
    writeFixture("episodes/example/nested/00-brief.json", "{}");
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("FAIL episodes/example/nested/00-brief.json:");
    expect(result.output).toContain("Validated 2 JSON file(s); 1 failure(s).");
  });

  it("rejects unmapped JSON nested under pipeline", async () => {
    writeFixture("pipeline/nested/unmapped.json", "{}");
    const result = await runValidator();
    expect(result.code).toBe(1);
    expect(result.output).toContain("FAIL pipeline/nested/unmapped.json: no schema mapping");
  });

  it("produces the same result twice without changing the input", async () => {
    const before = ts.sys.readFile(fixtureRoot + "/pipeline/state.json");
    const first = await runValidator();
    const second = await runValidator();
    expect(first.code).toBe(0);
    expect(second).toEqual(first);
    expect(ts.sys.readFile(fixtureRoot + "/pipeline/state.json")).toBe(before);
  });
});
