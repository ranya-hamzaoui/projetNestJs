import { z } from 'zod';
// import { Product } from '@prisma/client';

export const createCartSchema = z
  .object({
    userId: z.number(),
    // products :   Product
  })
  .required();
export const updateCartSchema = z
  .object({
    userId: z.number(),
    // products :   Product[] 
  })
  .required();

export type CartType = z.infer<typeof createCartSchema>;
export type CartUpdateType = z.infer<typeof updateCartSchema>;

