import { Request,Response,NextFunction } from "express";
import ProductService from "../services/ProductService";


class ProductController{
    async createProduct(req:Request,res:Response,next:NextFunction){
        try{
            const product = await ProductService.createProduct(req.body)
            res.status(201).json( {success: true, data: product})
        } catch (error) {
             next(error)
        }
    }

 async getProductById(req:Request,res:Response,next:NextFunction){
    try{
        const product = await ProductService.getProductById(Number(req.params.id))
        if(!product) return res.status(404).json({error:"Product not found"})
        res.json({ success:true, data: product })
    } catch (error) {
        next(error)
    }
 }


 async getAllProducts(req:Request,res:Response,next:NextFunction){
    try{
        const products = await ProductService.getAllProducts()
        res.json({ success: true, data: products })
    } catch (error) {
        next(error)
    }
 }

    async updateProduct(req:Request,res:Response,next:NextFunction){
        try{
            const updated = await ProductService.updateProduct(Number(req.params.id),req.body)
            res.json({ success: true, data: updated })
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req:Request,res:Response,next:NextFunction){
        try{
            const result = await ProductService.deleteProduct(Number(req.params.id))
            res.json({ success: true, data: result})
        }
        catch(error){
            next(error)
        }

}
}
export default new ProductController()
