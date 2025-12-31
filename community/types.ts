import { z } from "zod";

const authorSchema = z.string().or(
  z.object({
    name: z.string(),
    url: z.url().optional(),
  }),
);

const subitemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  subscription: z.url().optional(),
});

const resourceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  homepage: z.url(),
  author: authorSchema.optional(),
  subscription: z.url().optional(),
  subitems: subitemSchema.array().optional(),
});

export const resourceListSchema = z.record(z.string(), resourceSchema.array());

export type ResourceList = z.infer<typeof resourceListSchema>;
