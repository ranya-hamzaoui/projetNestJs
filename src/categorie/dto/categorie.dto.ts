import { z } from 'zod';
export const createCategorieSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .required();
export const updateCategorieSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .required();

export type CategorieType = z.infer<typeof createCategorieSchema>;
export type CategorieUpdateType = z.infer<typeof updateCategorieSchema>;
