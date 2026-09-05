import { languages } from "./languages.ts";

console.log(languages.map(({ crowdin }) => `--language=${crowdin}`).join(" "));
