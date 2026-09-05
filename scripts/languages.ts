import { readFileSync } from "node:fs";

import { load } from "js-yaml";
import { z } from "zod";

const languagesSchema = z.record(
  z.string(),
  z.strictObject({ crowdin: z.string().optional() }).nullable(),
);

export type Language = {
  tag: string;
  crowdin: string;
};

export const languages: readonly Language[] = Object.entries(
  languagesSchema.parse(
    load(readFileSync("languages.yml", { encoding: "utf-8" })),
  ),
).map(([tag, options]) => ({ tag, crowdin: options?.crowdin ?? tag }));
