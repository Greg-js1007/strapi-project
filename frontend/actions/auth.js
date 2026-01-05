"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignupFormSchema } from "../validations/auth";
import { registerUserService } from "@/lib/strapi";

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, //1 week
    path: '/',
    httpOnly: true,
    domian: process.env.HOST ?? 'localhost',
    secure: process.env.NODE_ENV === 'production',
}

export async function registerUserAction(prevState, formData) {
    console.log("Hello from register user actions")

    if (!formData || typeof formData.get !== "function") {
        return { ...prevState, message: "Error interno: Formulario no válido" };
    }

    const fields = {
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email')
    }

    const validateFields = SignupFormSchema.safeParse(fields)

    if (!validateFields.success) {
        const flattenedErrors = validateFields.error.flatten().fieldErrors;

        console.log("Validation errors:", flattenedErrors);
        
        return {
            success: false,
            message: "Validate error",
            strapiErrors: null,
            zodErrors: flattenedErrors,
            data: fields,
        };
    }

    console.log('Validations succescful')

    const response = await registerUserService(validateFields.data)

    console.log(response)

    if (!response || response.error) {
        return { 
            success: false,
            message: "Registration error",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields,
        }
    }

    const cookieStore = await cookies()
    cookieStore.set('jwt', response.jwt, cookieConfig)
    redirect('/dashboard')
}