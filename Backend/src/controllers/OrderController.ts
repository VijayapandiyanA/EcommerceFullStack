import { Request,Response } from "express";
import OrderService from "../services/OrderService";


class OrderController{
    async placeOrder(req:Request,res:Response){
        try{
            const userId= req.user?.id
            const order = await OrderService.placeOrder(Number(userId))
            res.status(201).json(order)
        } catch (err: any) {
  console.error("Order Error:", err); // 👈 VERY IMPORTANT

  res.status(400).json({
    success: false,
    message: err.message || "Error placing order"
  });
}
    }

    async getOrderHistory(req:Request,res:Response){
        try{
            const userId = req.user?.id
            const orders = await OrderService.getOrderHistory(Number(userId))
            res.status(200).json({success:true, orders})
        }
        catch(err){
            res.status(500).json({success:false, message:(err as Error).message})
        }
    }
}

export default new OrderController()