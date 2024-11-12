import { z } from "zod";

export const autopartSchema = z.object({
  name: z.string().min(1).max(255, {
    message: "Name must be filled",
  }),
  price: z.string().min(1, {
    message: "Price must be filled",
  }),
  description: z.string().min(1).max(255, {
    message: "Description must be filled",
  }),
  oem_number: z.string().min(1).max(255, {
    message: "OEM Number must be filled",
  }),
  category_name: z.string().min(1, {
    message: "Category name must be filled",
  }),
  manufacturer_name: z.string().min(1, {
    message: "Manufacturer name must be filled",
  }),
  quantity: z.string().min(1, {
    message: "Quantity must be filled",
  }),
  model_id: z.array(z.string(), {
    message: "Model ID must be filled",
  }),
  images: z.array(z.string(), {
    message: "Images must be filled",
  }),
});
