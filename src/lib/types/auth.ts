import { object, string } from "zod";

// Base schemas
const passwordSchema = string({ required_error: "Password is required" })
  .min(8, "Password must be atleast 8 characters")
  .max(32, "Password can not exceed 32 characters");

const confirmPasswordSchema = string({ required_error: "Confirm password is required" })
  .min(8, "Confirm password must be atleast 8 characters")
  .max(32, "Confirm password can not exceed 32 characters");

const emailSchema = string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

const nameSchema = string({ required_error: "Name is required" })
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters");

// Form schemas
export const signUpSchema = object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = object({
  email: emailSchema,
});

export const resetPasswordSchema = object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/* import { z } from 'zod';

const signUpEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;

const signInEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInEmailInput = z.infer<typeof signInEmailSchema>;

const authSchemas = {
  signUp: signUpEmailSchema,
  signIn: signInEmailSchema,
};

export type { SignUpEmailInput, SignInEmailInput };
export { authSchemas }; */
