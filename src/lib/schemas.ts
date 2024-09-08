import { z } from "zod";

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The name should contain at least 1 character" }),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password should contain at least 6 characters" }),
  agreeToTermsAndConditions: z.boolean().default(false),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const NewTodoSchema = z.object({
  todo: z.string().min(1, { message: "Please, fill the input" }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select priority",
  }),
});

export const DeleteAccountSchema = z.object({
  email: z.string().email({ message: "required" }),
});
