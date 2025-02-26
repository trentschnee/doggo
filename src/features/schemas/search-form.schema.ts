import { z } from "zod";

export const searchFormSchema = z.object({
  breed: z.string().default("any"),
  ageRange: z.string().default("any"),
  sortBy: z.enum(["breed", "age", "name"]).default("breed"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
export type SearchFormValues = z.infer<typeof searchFormSchema>;
