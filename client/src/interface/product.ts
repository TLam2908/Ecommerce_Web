import * as z from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled'
    }).max(255),
    description: z.string().min(1, {
        message: 'Description must be filled'
    }),
    price: z.string().min(1, {
        message: 'Price must be filled'
    }),
    quantity: z.string().min(1, {
        message: 'Quantity must be filled'
    }),
    oem_number: z.string().min(1, {
        message: 'OEM Number must be filled'
    }),
    category_name: z.string({
        message: 'Category must be filled'
    }),
    manufacturer_name: z.string({
        message: 'Manufacturer must be filled'
    }),
    model_id: z.array(z.string(), {
        message: 'Model must be filled'
    }),
    images: z.array(z.string(), {
        message: 'Images must be filled'
    }),
})