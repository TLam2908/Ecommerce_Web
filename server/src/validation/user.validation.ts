import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),    
    name: z.string().min(1).max(255),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
})