import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    userAgent: z.string().optional(),
})

export const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    name: z.string().min(1).max(255),
    userAgent: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
})

export const verificationCodeSchema = z.string().min(1).max(24)

export const emailSchema = z.string().email().min(1).max(255)

export const resetPasswordSchema = z.object({
    password: z.string().min(8).max(255),
    verificationCode: verificationCodeSchema
})