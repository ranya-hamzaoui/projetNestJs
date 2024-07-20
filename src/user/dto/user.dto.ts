// export class CreateUserDto {
//   name      :String;
//   email     :String ;   
//   password  :String 
// }
import { z } from 'zod';
export const createUserSchema = z
  .object({
    name      :z.string(),
    email     : z.string(),
    password  : z.string()
  })
  .required();
export const updateUserSchema = z
  .object({
    name      :z.string(),
    email     : z.string(),
    password  : z.string()
    })
  .required();
  export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required();

  
  
  export type UserType = z.infer<typeof createUserSchema>;
  export type UserUpdateType = z.infer<typeof updateUserSchema>;
  export type loginType = z.infer<typeof loginSchema>;

