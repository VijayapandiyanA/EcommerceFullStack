import {z} from 'zod'

export const productCreateSchema = z.object({
    body:z.object({
        name:z.string().min(2, "Name is Required"),
        description:z.string().optional(),
        price:z.number().min(0, "Price must be a positive number"),
        imageUrl:z.string().url("Please enter a valid URL for the image"),
        stock:z.number().int().min(0).optional(),
        category:z.string().optional()

    })



})

export const productUpdateSchema = z.object({
    body:z.object({
        name:z.string().min(1).optional(),
        
    })
})