import { z } from "zod";

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The name should contain at least 1 character" }),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least of 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password should contain at least 6 characters" }),
  agreeToTermsAndConditions: z.boolean().default(false),
});
