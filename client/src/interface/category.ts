import * as z from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(1).max(255, {
        message: 'Name must be filled'
    }),
    description: z.string().min(1).max(255, {
        message: 'Description must be filled'
    }),
    code: z.string().min(1).max(255, {
        message: 'Code must be filled'
    }),
    billboard_id: z.string().min(1).max(255, {
        message: 'Billboard ID must be filled'
    }),
})