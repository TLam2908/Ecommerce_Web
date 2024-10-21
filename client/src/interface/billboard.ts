import * as z from 'zod';

export const BillboardSchema = z.object({
    title: z.string().min(1).max(255, {
        message: 'Title must be filled'
    }),
    image_src: z.string().min(1, {
        message: 'Image source must be filled'
    }),
})