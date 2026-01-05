import { z } from "zod";

// Esquema para el Inicio de Sesión
export const SigninFormSchema = z.object({
    identifier: z
        .string()
        .min(3, "Username or email must be at least 3 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters"),
});

// Esquema para el Registro
export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters"),
});
