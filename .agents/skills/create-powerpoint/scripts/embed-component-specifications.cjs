const fs = require("node:fs");
const path = require("node:path");

const SKILL_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(SKILL_ROOT, "..", "..", "..");
const COMPONENTS_DIR = path.join(PROJECT_ROOT, "src", "components");
const INVENTORY_FILE = path.join(SKILL_ROOT, "references", "dads-component-inventory.md");
const SKILL_FILE = path.join(SKILL_ROOT, "SKILL.md");
const START_MARKER = "<!-- DADS_COMPONENT_SPECIFICATIONS_START -->";
const END_MARKER = "<!-- DADS_COMPONENT_SPECIFICATIONS_END -->";

function titleCase(value) {
  return value.replace(/(^|[-_])(\w)/g, (_, __, character) => character.toUpperCase());
}

function fence(content) {
  return content.includes("```") ? "````" : "```";
}

function renderCss(componentDirectory, componentId) {
  const cssFiles = fs
    .readdirSync(componentDirectory)
    .filter((file) => file.endsWith(".css"))
    .sort();

  if (!cssFiles.length) {
    return "CSS source files are not present for this component.";
  }

  return cssFiles
    .map((file) => {
      const content = fs.readFileSync(path.join(componentDirectory, file), "utf8").trim();
      const delimiter = fence(content);
      return `#### \`src/components/${componentId}/${file}\`\n\n${delimiter}css\n${content}\n${delimiter}`;
    })
    .join("\n\n");
}

function renderCssSpecification() {
  const components = fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));

  return components
    .map((component) => {
      const directory = path.join(COMPONENTS_DIR, component.name);
      return `### ${titleCase(component.name)} CSS values\n\n${renderCss(directory, component.name)}`;
    })
    .join("\n\n");
}

function main() {
  const inventory = fs.readFileSync(INVENTORY_FILE, "utf8").trim();
  const specification = `${START_MARKER}

## 固定コンポーネント仕様スナップショット

この節は、生成時点の\`src/components/\`を固定した参照データである。全42コンポーネントのHTML例、Storybook、公開\`data-*\`バリエーション、状態、メディアクエリ、アクセシビリティシグナル、および個別CSSの全値を含む。

コンポーネントが変更された場合は、次を順に実行してこの節を更新する。

\`\`\`text
node scripts/generate-component-inventory.cjs
node scripts/embed-component-specifications.cjs
\`\`\`

### 全コンポーネントのバリエーション・状態

${inventory.replace(/^# DADS Component Inventory\s*/, "")}

### 全コンポーネントの個別CSS値

${renderCssSpecification()}

${END_MARKER}
`;

  const skill = fs.readFileSync(SKILL_FILE, "utf8");
  const expression = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}\\n?`);
  const updated = expression.test(skill) ? skill.replace(expression, specification) : `${skill.trimEnd()}\n\n${specification}`;
  fs.writeFileSync(SKILL_FILE, updated);
  console.log(`Embedded specifications for 42 components in ${SKILL_FILE}.`);
}

main();
