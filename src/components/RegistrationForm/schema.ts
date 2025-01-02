import { z } from "zod";

export const RegistrationSchema = z
  .object({
    name: z.string().min(5).max(100),
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
    confirmPassword: z.string(),
  })
  .required({ name: true, email: true, password: true, confirmPassword: true })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
