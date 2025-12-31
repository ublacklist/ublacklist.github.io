import { readFile, writeFile } from "node:fs/promises";
import yaml from "js-yaml";
import { resourceListSchema } from "./types.ts";

function toModuleString(data: string): string {
  const resourceList = resourceListSchema.parse(yaml.load(data));
  return `// This file is auto-generated. Do not edit directly.

import type { ResourceList } from "./types.ts";

const resources: ResourceList = ${JSON.stringify(resourceList, null, 2)};

export default resources;
`;
}

async function main() {
  await writeFile(
    "community/rulesets.generated.ts",
    toModuleString(
      await readFile("community/rulesets.yml", { encoding: "utf-8" }),
    ),
  );
}

await main();
