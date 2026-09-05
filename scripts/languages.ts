import { readFileSync } from "node:fs";

import { load } from "js-yaml";
import { z } from "zod";

const languageSchema = z.object({
  docusaurus: z.string(),
  crowdin: z.string(),
});

export const languages = languageSchema
  .array()
  .parse(load(readFileSync("languages.yml", { encoding: "utf-8" })));
