import { Request,Response } from "express";
import UserService from "../services/UserService";
class UserController{
    async register(req:Request,res:Response){
        try{
            const user = await UserService.register(req.body)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }
    async login(req:Request,res:Response){
        try{
            const {email,password}=req.body
            const result = await UserService.login(email,password)
            res.json(result)
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }
    
}
export default new UserController()