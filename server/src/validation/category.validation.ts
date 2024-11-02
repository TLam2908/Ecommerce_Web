import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    code: z.string().min(1).max(255),
    billboard_id: z.string().min(1).max(255),
})  