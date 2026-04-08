import { Request,Response } from "express";
import ProductService from "../services/ProductService";


class ProductController{
    async createProduct(req:Request,res:Response){
        try{
            const product = await ProductService.createProduct(req.body)
            res.status(201).json( {success: true, data: product})
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }

 async getProductById(req:Request,res:Response){
    try{
        const product = await ProductService.getProductById(Number(req.params.id))
        if(!product) return res.status(404).json({error:"Product not found"})
        res.json({ success:true, data: product })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
 }


 async getAllProducts(req:Request,res:Response){
    try{
        const products = await ProductService.getAllProducts()
        res.json({ success: true, data: products })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
 }

    async updateProduct(req:Request,res:Response){
        try{
            const updated = await ProductService.updateProduct(Number(req.params.id),req.body)
            res.json({ success: true, data: updated })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

    async deleteProduct(req:Request,res:Response){
        try{
            const result = await ProductService.deleteProduct(Number(req.params.id))
            res.json({ success: true, data: result})
        }
        catch(error){
            res.status(500).json({error:(error as Error).message})
        }

}
}
export default new ProductController()
