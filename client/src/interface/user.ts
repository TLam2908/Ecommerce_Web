import * as z from 'zod';

export const UserSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled'
    }).max(255),
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters'
    }),
    address: z.string().optional(),
    phone_number: z.string().optional(),
    image_src: z.string().nullable().optional(), 
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // This will show the error message next to the confirmPassword field
});


export const UserEditSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled'
    }).max(255),
    email: z.string().email({
        message: 'Invalid email address'
    }),
    address: z.string().optional(),
    phone_number: z.string().optional(),
    image_src: z.string().nullable().optional(), 
})