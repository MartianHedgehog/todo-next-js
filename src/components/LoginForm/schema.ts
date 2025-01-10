import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().min(3).max(500),
  })
  .required({ email: true, password: true });
