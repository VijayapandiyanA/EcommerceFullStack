import { Request,Response } from "express";
import CartService from "../services/CartService";

class CartController{

    async addCartItem(req:Request,res:Response){
        try{
            const userId = req.user?.id
            const{productId,quantity} = req.body
            const cartItem = await CartService.addTocart({userId:Number(userId),productId:Number(productId),quantity:Number(quantity)})
            res.status(201).json({success:true, data: cartItem })
        } catch (error: any) {
            res.status(400).json({  success:false, error: error.message })
        }
  
  
    }
     
    async getCart(req:Request,res:Response){
        try{
            const userId= req.user?.id
            const cartItems = await CartService.getCartItems(Number(userId))
            res.status(200).json({success:true, data: cartItems })
        } catch (error: any) {
            res.status(400).json({  success:false, error: error.message })
        }
    }

    async updateCartItem(req:Request, res:Response){
        try{
            const userId = req.user?.id
            const {productId, quantity} = req.body
            const updatedItem = await CartService.updateCartItem(Number(userId),Number(productId),Number(quantity))
            res.status(200).json({success:true, data: updatedItem })
        } catch (error: any) {
            res.status(400).json({  success:false, error: error.message })
        }
    }


    async removeCartItem(req:Request, res:Response){
        try{
            const userId = req.user?.id
            const {productId} = req.body
            const result = await CartService.removeCartItem(Number(userId), Number(productId))
            res.status(200).json({success:true, data: result })
        } 
        catch (error: any) {
            res.status(400).json({  success:false, error: error.message })
        }
    }

    async  clearCart(req:Request, res:Response){
        try{
            const userId = req.user?.id
            const result = await CartService.clearCart(Number(userId))
            res.status(200).json({success:true, data: result})
        }
        catch(err){
            res.status(400).json({ success: false, error: (err as Error).message})
        }
    }

}


export default new CartController()