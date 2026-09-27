const fs = require("node:fs");
const path = require("node:path");

const SKILL_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(SKILL_ROOT, "..", "..", "..");
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src", "components");
const OUTPUT_FILE = path.join(SKILL_ROOT, "references", "dads-component-inventory.md");

const STATE_PATTERNS = [
  [/:hover\b/, "hover"],
  [/:active\b/, "active"],
  [/:focus-visible\b|:focus\b/, "focus"],
  [/:disabled\b|\[disabled\]|aria-disabled/, "disabled"],
  [/:user-invalid\b|aria-invalid|data-(?:has-)?error\b/, "error"],
  [/:checked\b|aria-checked/, "checked"],
  [/:selected\b|aria-selected/, "selected"],
  [/aria-expanded|data-expanded/, "expanded"],
  [/:read-only\b|aria-readonly/, "readonly"],
  [/:open\b|aria-modal|:modal\b/, "open"],
];

const INTERNAL_DATA_PREFIXES = [
  "data-js-",
  "data-testid",
  "data-story-",
  "data-announce-",
  "data-slot",
  "data-label-",
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function titleCase(value) {
  return value.replace(/(^|[-_])(\w)/g, (_, __, character) => character.toUpperCase());
}

function markdownList(values, fallback) {
  return values.length ? values.map((value) => `- \`${value}\``).join("\n") : `- ${fallback}`;
}

function collectDataModifiers(content) {
  const modifiers = [];
  for (const match of content.matchAll(/data-([\w-]+)(?:\s*=\s*["']([^"']+)["'])?/g)) {
    const name = `data-${match[1]}`;
    const value = match[2];
    if (
      INTERNAL_DATA_PREFIXES.some((prefix) => name.startsWith(prefix)) ||
      value?.includes("${") ||
      value === "?"
    ) {
      continue;
    }
    modifiers.push(value ? `${name}=${value}` : name);
  }
  const uniqueModifiers = unique(modifiers);
  const namesWithValues = new Set(uniqueModifiers.filter((modifier) => modifier.includes("=")).map((modifier) => modifier.split("=")[0]));
  return uniqueModifiers.filter((modifier) => modifier.includes("=") || !namesWithValues.has(modifier));
}

function collectAria(content) {
  const attributes = [];
  for (const match of content.matchAll(/\b(aria-[\w-]+)\b/gi)) {
    attributes.push(match[1].toLowerCase());
  }
  if (/\brole\s*=/i.test(content)) attributes.push("role");
  if (/<label\b/i.test(content)) attributes.push("label");
  if (/\balt\s*=/i.test(content)) attributes.push("alt");
  return unique(attributes);
}

function collectMediaQueries(content) {
  return unique([...content.matchAll(/@media\s*([^{]+)/g)].map((match) => match[1].trim()));
}

function collectStates(content) {
  return unique(STATE_PATTERNS.filter(([pattern]) => pattern.test(content)).map(([, state]) => state));
}

function readComponent(directory) {
  const files = fs.readdirSync(directory).sort();
  const sourceFiles = files.filter((file) => /\.(?:css|html|js|ts|mdx)$/.test(file));
  const source = sourceFiles.map((file) => fs.readFileSync(path.join(directory, file), "utf8")).join("\n");
  const htmlExamples = files.filter((file) => file.endsWith(".html"));
  const storyFiles = files.filter((file) => /\.stories\.(?:ts|js)$/.test(file));

  return {
    id: path.basename(directory),
    htmlExamples,
    storyFiles,
    modifiers: collectDataModifiers(source),
    states: collectStates(source),
    mediaQueries: collectMediaQueries(source),
    accessibility: collectAria(source),
  };
}

function renderComponent(component) {
  const requiredStates = component.states.length ? component.states : ["normal"];
  const responsive = component.mediaQueries.length
    ? component.mediaQueries.join(" / ")
    : "基本表示のみ（対象CSSを確認）";
  const hasViewportQuery = component.mediaQueries.some((query) => /\b(?:min|max)-width\b/.test(query));

  return `## ${titleCase(component.id)}

**Source:** \`src/components/${component.id}/\`

### Variations and examples

${markdownList(component.htmlExamples, "HTML examples are not present; inspect the component source and Storybook.")}

### Story files

${markdownList(component.storyFiles, "No Storybook story file in this directory.")}

### Data modifiers

${markdownList(component.modifiers, "No data-* modifier found.")}

### Static states to include

${markdownList(requiredStates, "normal")}

### Responsive and interaction media queries

- ${responsive}

### Accessibility signals to preserve

${markdownList(component.accessibility, "Use native semantics and inspect source markup.")}

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] ${hasViewportQuery ? "Show mobile and desktop specimens with their viewport widths." : "Do not imply a responsive layout change unless the source adds a viewport media query."}
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.
`;
}

function main() {
  const components = fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readComponent(path.join(COMPONENTS_DIR, entry.name)))
    .sort((left, right) => left.id.localeCompare(right.id));

  const summary = components
    .map(
      (component) =>
        `| ${titleCase(component.id)} | ${component.htmlExamples.length || "—"} | ${component.modifiers.join(", ") || "—"} | ${component.states.join(", ") || "normal"} |`,
    )
    .join("\n");

  const markdown = `# DADS Component Inventory

This generated reference covers every component directory in \`src/components/\`. It is the required coverage checklist for component-oriented PowerPoint decks. Regenerate it after component changes with:

\`\`\`text
node scripts/generate-component-inventory.cjs
\`\`\`

## Coverage summary

| Component | HTML examples | Data modifiers | Static states |
| --- | ---: | --- | --- |
${summary}

${components.map(renderComponent).join("\n")}
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, markdown);
  console.log(`Generated ${OUTPUT_FILE} for ${components.length} components.`);
}

main();
