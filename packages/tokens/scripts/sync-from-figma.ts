import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY ?? "lAC5ghyDT1w6MWkiZMlh43";
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: string;
  valuesByMode: Record<string, unknown>;
  codeSyntax?: Record<string, string>;
}

interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: Array<{ modeId: string; name: string }>;
  variableIds: string[];
}

interface FigmaVariablesResponse {
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>;
    variables: Record<string, FigmaVariable>;
  };
}

function hexToTokenName(name: string): string {
  return name.replace(/\//g, ".").toLowerCase();
}

function rgbaToHex(r: number, g: number, b: number, a = 1): string {
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  if (a < 1) {
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function resolveValue(
  value: unknown,
  variables: Record<string, FigmaVariable>,
): string | number {
  if (typeof value === "object" && value !== null && "type" in value) {
    const alias = value as { type: string; id: string };
    if (alias.type === "VARIABLE_ALIAS") {
      const ref = variables[alias.id];
      if (ref) {
        const modeId = Object.keys(ref.valuesByMode)[0];
        return resolveValue(ref.valuesByMode[modeId], variables) as string;
      }
    }
  }
  if (typeof value === "object" && value !== null && "r" in value) {
    const c = value as { r: number; g: number; b: number; a?: number };
    return rgbaToHex(c.r, c.g, c.b, c.a ?? 1);
  }
  if (typeof value === "number") return value;
  return String(value);
}

function buildTokenTree(
  variables: Record<string, FigmaVariable>,
  collection: FigmaVariableCollection,
  modeId: string,
): Record<string, unknown> {
  const tree: Record<string, unknown> = {};

  for (const varId of collection.variableIds) {
    const variable = variables[varId];
    if (!variable) continue;

    const parts = variable.name.split("/");
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i].toLowerCase();
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }

    const leaf = parts[parts.length - 1].toLowerCase();
    const rawValue = variable.valuesByMode[modeId];
    const resolved = resolveValue(rawValue, variables);

    current[leaf] = {
      value: resolved,
      type: variable.resolvedType.toLowerCase(),
    };
  }

  return tree;
}

async function syncFromFigma() {
  if (!FIGMA_ACCESS_TOKEN) {
    console.log(
      "⚠️  FIGMA_ACCESS_TOKEN not set — skipping Figma sync. Using local token files.",
    );
    return;
  }

  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;
  const response = await fetch(url, {
    headers: { "X-Figma-Token": FIGMA_ACCESS_TOKEN },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as FigmaVariablesResponse;
  const { variableCollections, variables } = data.meta;

  for (const collection of Object.values(variableCollections)) {
    const modeName = collection.modes[0]?.name.toLowerCase() ?? "default";
    const modeId = collection.modes[0]?.modeId;
    const tree = buildTokenTree(variables, collection, modeId);

    let outputPath: string;
    if (collection.name.toLowerCase().includes("primitive")) {
      outputPath = join(ROOT, "src/primitives/tokens.json");
    } else if (collection.modes.length > 1) {
      for (const mode of collection.modes) {
        const modeTree = buildTokenTree(variables, collection, mode.modeId);
        const modeFile = mode.name.toLowerCase();
        outputPath = join(ROOT, `src/semantic/${modeFile}.json`);
        writeJson(outputPath, modeTree);
        console.log(`✅ Wrote ${outputPath}`);
      }
      continue;
    } else {
      outputPath = join(ROOT, `src/semantic/${modeName}.json`);
    }

    writeJson(outputPath, tree);
    console.log(`✅ Wrote ${outputPath}`);
  }

  console.log("✅ Figma sync complete");
}

function writeJson(path: string, data: unknown) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

syncFromFigma().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
