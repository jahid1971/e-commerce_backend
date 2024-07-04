import { z } from "zod";

const productValidationSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
    price: z.number().positive(),
    category: z.string().min(1, { message: "Category cannot be empty" }),
    tags: z.array(z.string()),
    variants: z.array(
        z.object({
            type: z.string().min(1, { message: "Variant type cannot be empty" }),
            value: z.string().min(1, { message: "Variant value cannot be empty" }),
        })
    ),
    inventory: z.object({
        quantity: z.number().int().positive(),
        inStock: z.boolean(),
    }),
});

export const productValidations = {
    productValidationSchema,
};
