import {z} from 'zod'

export const addToCartSchema = z.object({
    body:z.object({
        productId:z.number().int().min(1, "Product Id is required"),
        quantity:z.number().int().min(1,"Quantity must be a atleast 1")
    })
})

export const updateCartSchema = z.object({
    body:z.object({
        productId:z.number().int().min(1, "Product Id is required"),
        quantity:z.number().int().min(1,"Quantity must be a atleast 1")

    })
})

export const removeFromCartSchema = z.object({
    body:z.object({
        productId:z.number().int().min(1, "Product Id is required")
        
    })
})