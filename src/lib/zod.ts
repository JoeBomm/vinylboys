import { z } from "zod";

export const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .trim().pipe(z.email({ message: "Invalid email" })),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const signupSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .trim().pipe(z.email({ message: "Invalid email" })),
  displayName: z.string().min(1),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, { message: "Password must be less than 32 characters" }),
});
