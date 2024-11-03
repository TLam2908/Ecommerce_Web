import * as z from 'zod'

export const ManufacturerSchema = z.object({
    name: z.string().min(1).max(255, {
        message: 'Name must be filled'
    }),
    country: z.string().min(1).max(255, {
        message: 'Country must be filled'
    }),
    type_of_product: z.string().min(1).max(255, {
        message: 'Type of Product must be filled'
    }),
    abbreviation: z.string().min(1).max(255, {
        message: 'Abbreviation must be filled'
    }),
})