import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),  
    name: z.string().min(3, {
        message: 'Please enter your name'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }) 
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    })
})