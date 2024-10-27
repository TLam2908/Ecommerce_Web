import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
    name: z.string().min(1).max(255),
    image_src: z.string().optional(),
    address: z.string().optional(),
    phone_number: z.string().optional(),
})