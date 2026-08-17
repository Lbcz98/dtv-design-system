import StyleDictionary from "style-dictionary";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

StyleDictionary.registerTransform({
  name: "size/px",
  type: "value",
  transitive: true,
  filter: (token) =>
    token.type === "dimension" &&
    typeof token.value === "string" &&
    /^\d+(\.\d+)?$/.test(token.value),
  transform: (token) => `${token.value}px`,
});

const cssVariablesFormat = ({ dictionary, options }) => {
  const selector = options.selector || ":root";
  const tokens = dictionary.allTokens
    .map((token) => `  --${token.path.join("-")}: ${token.value};`)
    .join("\n");
  return `${selector} {\n${tokens}\n}\n`;
};

StyleDictionary.registerFormat({
  name: "css/variables",
  format: cssVariablesFormat,
});

const tsFormat = ({ dictionary }) => {
  const entries = dictionary.allTokens
    .map((token) => {
      const key = token.path.join("_").toUpperCase();
      const formatted =
        typeof token.value === "string"
          ? `"${token.value}"`
          : JSON.stringify(token.value);
      return `export const ${key} = ${formatted};`;
    })
    .join("\n");
  return `${entries}\n`;
};

StyleDictionary.registerFormat({
  name: "typescript/tokens",
  format: tsFormat,
});

async function buildTokens() {
  const light = new StyleDictionary({
    log: { verbosity: "default" },
    source: [
      join(root, "src/primitives/tokens.json"),
      join(root, "src/semantic/light.json"),
    ],
    platforms: {
      css: {
        transformGroup: "css",
        transforms: ["size/px"],
        buildPath: join(root, "dist/css/"),
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
            options: { selector: ":root" },
          },
        ],
      },
      js: {
        transformGroup: "js",
        transforms: ["size/px"],
        buildPath: join(root, "dist/js/"),
        files: [
          {
            destination: "tokens.js",
            format: "javascript/es6",
          },
          {
            destination: "tokens.d.ts",
            format: "typescript/tokens",
          },
        ],
      },
    },
  });

  await light.buildAllPlatforms();

  const dark = new StyleDictionary({
    log: { verbosity: "default" },
    source: [
      join(root, "src/primitives/tokens.json"),
      join(root, "src/semantic/dark.json"),
    ],
    platforms: {
      css: {
        transformGroup: "css",
        transforms: ["size/px"],
        buildPath: join(root, "dist/css/"),
        files: [
          {
            destination: "variables-dark.css",
            format: "css/variables",
            options: { selector: '[data-theme="dark"]' },
          },
        ],
      },
    },
  });

  await dark.buildAllPlatforms();
  console.log("✅ Tokens built successfully");
}

buildTokens().catch((err) => {
  console.error(err);
  process.exit(1);
});
