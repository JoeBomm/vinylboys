import { z } from "zod";

export const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .max(320)
    .trim().pipe(z.email({ message: "Invalid email" })),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const signupSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .max(320, { message: "email must be less than 320 characters" })
    .trim().pipe(z.email({ message: "Invalid email" })),
  displayName: z.string()
    .min(1)
    .max(100, { message: "Display name must be less than 100 characters" }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, { message: "Password must be less than 128 characters" }),
});

export const createGroupSchema = z.object( {
  groupName: z.string()
    .max(150, { message: "Enter a group name less than 150 characters" }),
  seasonLength: z.coerce.number()
    .gte(4, { message: "Season length must be more than 4 themes" })
    .lte(100, { message: "Season length must be less than 100 themes" }),
  themeLengthWeeks: z.coerce.number()
    .gte(1, { message: "Theme length must be at least 1 week" })
    .lte(4, { message: "Theme length must be less than 4 weeks" }),
  endDay: z.coerce.number()
    .gte(0, { message: "Select a valid weekday" })
    .lte(6, { message: "Select a valid weekday" }),
  endTime: z.iso.time({ precision: -1 }),
})
