// export class CreateProductDto {
//     id        : number;       
//     title      : String;
//     description     : String ;
//     image  : String
// }

import { z } from 'zod';
export const createProductSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  })
  .required();
export const updateProductSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  })
  .required();

export type ProductType = z.infer<typeof createProductSchema>;
export type ProductUpdateType = z.infer<typeof updateProductSchema>;
