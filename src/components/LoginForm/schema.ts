import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z
      .string()
      .min(8)
      .max(500)
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" }),
  })
  .required({ email: true, password: true });
