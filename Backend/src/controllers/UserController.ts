import { Request,Response , NextFunction} from "express";
import UserService from "../services/UserService";
class UserController{
    async register(req:Request,res:Response,next:NextFunction){
        try{
            const user = await UserService.register(req.body)
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
    async login(req:Request,res:Response,next:NextFunction){
        try{
            const {email,password}=req.body
            const result = await UserService.login(email,password)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    
}
export default new UserController()