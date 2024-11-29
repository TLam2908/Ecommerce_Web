import { z } from 'zod'

export const orderSchema = z.object({
    phone: z.string().min(1).max(255),
    address: z.string().min(1).max(255),
})