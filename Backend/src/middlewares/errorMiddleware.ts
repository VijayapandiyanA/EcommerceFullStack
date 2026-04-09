import { Request,Response,NextFunction } from "express";
import logger from "../utils/logger";

const errorMiddleware =(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction)=>{

     logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });   

console.error(err)

const statusCode = err.statusCode || 500;
const message = err.message || "Internal Server Error";

res.status(statusCode).json({
    success:false,
    message
})



}

export default errorMiddleware