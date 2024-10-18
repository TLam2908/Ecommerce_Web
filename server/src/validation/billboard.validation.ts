import { z } from "zod";

export const billboardSchema = z.object({
    title: z.string().min(1).max(255),
    image_src: z.string().min(1).max(255),  
})