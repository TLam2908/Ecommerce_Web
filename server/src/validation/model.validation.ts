import { z } from "zod";

export const modelSchema = z.object({
    name: z.string().min(1).max(255),
    make: z.string().min(1).max(255),
    year: z.string().min(1).max(255),
})