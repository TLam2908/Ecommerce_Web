import * as z from 'zod'

export const ModelSchema = z.object({
    name: z.string().min(1).max(255, {
        message: 'Name must be filled'
    }),
    make: z.string().min(1).max(255, {
        message: 'Make must be filled'
    }),
    year: z.string().min(1).max(255, {
        message: 'Year must be filled'
    })
})