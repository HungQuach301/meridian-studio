import ts from "typescript";
import { Ajv2020 } from "ajv/dist/2020.js";
import type { AnySchema, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

// Use the allowed TypeScript system API without an additional Node typings dependency.
const root = ts.sys.resolvePath(ts.sys.getCurrentDirectory()).replace(/\\/g, "/");
const contractsDirectory = root + "/engine/contracts";

// JSON artifacts listed in engine/contracts/README.md. Markdown is out of scope.
const artifactSchemas = new Map<string, string>([
  ["signals.json", "signals.schema.json"],
  ["topics.ranked.json", "signals.schema.json"],
  ["00-brief.json", "brief.schema.json"],
  ["01-sources.json", "sources.schema.json"],
  ["02-factcheck.json", "factcheck.schema.json"],
  ["03-outline.json", "outline.schema.json"],
  ["05-storyboard.json", "storyboard.schema.json"],
  ["06-timing.json", "timing.schema.json"],
  ["07-render-manifest.json", "render-manifest.schema.json"],
  ["08-package.json", "package.schema.json"],
  ["08-publication.json", "publication.schema.json"],
  ["09-metrics.json", "metrics.schema.json"],
]);

function readJson(path: string): unknown {
  const content = ts.sys.readFile(path);
  if (content === undefined) throw new Error(path + ": cannot read file");
  return JSON.parse(content) as unknown;
}

function main(): number {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  if (!ts.sys.directoryExists(contractsDirectory)) throw new Error("engine/contracts: directory is missing");
  const schemaFiles = ts.sys.readDirectory(contractsDirectory, [".schema.json"], [], ["*.schema.json"], 1).sort();
  if (schemaFiles.length === 0) throw new Error("engine/contracts: no schemas found");
  const validators = new Map<string, ValidateFunction>();
  for (const path of schemaFiles) {
    const name = path.slice(contractsDirectory.length + 1);
    const schema = readJson(path);
    if (typeof schema !== "boolean" && (typeof schema !== "object" || schema === null || Array.isArray(schema))) {
      throw new Error(name + ": expected a JSON Schema object or boolean");
    }
    ajv.addSchema(schema as AnySchema, name);
  }
  for (const path of schemaFiles) {
    const name = path.slice(contractsDirectory.length + 1);
    const validate = ajv.getSchema(name);
    if (!validate) throw new Error(name + ": schema could not be compiled");
    validators.set(name, validate);
  }

  const statePath = root + "/pipeline/state.json";
  if (!ts.sys.fileExists(statePath)) throw new Error("pipeline/state.json: required file is missing");
  const files = [
    ...ts.sys.readDirectory(root + "/pipeline", [".json"], [], ["**/*.json"]),
    ...ts.sys.readDirectory(root + "/episodes", [".json"], [], ["**/*.json"]),
  ].sort();
  if (!files.includes(statePath)) throw new Error("pipeline/state.json: required file was not discovered");

  let failures = 0;
  for (const path of files) {
    const relativePath = path.slice(root.length + 1);
    try {
      const name = path.slice(path.lastIndexOf("/") + 1);
      const schemaName = path === statePath ? "pipeline-state.schema.json" : artifactSchemas.get(name);
      if (!schemaName) throw new Error("no schema mapping in engine/contracts/README.md");
      const validate = validators.get(schemaName);
      if (!validate) throw new Error("missing schema: " + schemaName);
      if (!validate(readJson(path))) throw new Error(ajv.errorsText(validate.errors, { separator: "; " }));
      ts.sys.write("PASS " + relativePath + " -> " + schemaName + "\n");
    } catch (error) {
      failures += 1;
      ts.sys.write("FAIL " + relativePath + ": " + (error instanceof Error ? error.message : String(error)) + "\n");
    }
  }
  ts.sys.write("Validated " + files.length + " JSON file(s); " + failures + " failure(s). Compiled " + validators.size + " schema(s).\n");
  return failures > 0 ? 1 : 0;
}

try {
  ts.sys.exit(main());
} catch (error) {
  ts.sys.write("FAIL " + (error instanceof Error ? error.message : String(error)) + "\n");
  ts.sys.exit(1);
}
