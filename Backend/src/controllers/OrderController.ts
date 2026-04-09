import { Request,Response,NextFunction } from "express";
import OrderService from "../services/OrderService";


class OrderController{
    async placeOrder(req:Request,res:Response,next:NextFunction){
        try{
            const userId= req.user?.id
            const order = await OrderService.placeOrder(Number(userId))
            res.status(201).json(order)
        } catch (error) {
            

            next(error);
}
    }

    async getOrderHistory(req:Request,res:Response,next:NextFunction){
        try{
            const userId = req.user?.id
            const orders = await OrderService.getOrderHistory(Number(userId))
            res.status(200).json({success:true, orders})
        }
        catch(error){
            next(error)
        }
    }
}

export default new OrderController()