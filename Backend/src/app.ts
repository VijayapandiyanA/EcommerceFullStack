/// <reference path="./types/express/index.d.ts" />
import { Request,Response,NextFunction } from "express";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import stream from "./utils/morganStreams";
import dotenv from 'dotenv';
import { sequelize } from "./config/db";
import userRoutes from './routes/UserRoutes'
import productRoutes from './routes/ProductRoutes'
import cartRoutes from './routes/CartRoutes'
import orderRoutes from './routes/OrderRoutes'

import errorMiddleware from "./middlewares/errorMiddleware";
dotenv.config();
const app = express();
app.use(cors());
app.use(
  morgan("combined", { stream }) 
);
app.use(express.json());






app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes)
app.use(errorMiddleware);

app.get('/',(req:Request,res:Response)=>{
    res.json({ message: 'Welcome to the User API' })
})

const PORT =process.env.PORT ||5000
const ConnectDB =async()=>{
    try{
        await sequelize.authenticate();
        console.log("Database connected successfully")
        app.listen(PORT,()=>{
            console.log(`Server is running on Port ${PORT}`)
        })
    }
    catch(error){
        console.error("Unable to conect to the database :",error)
    }
}
ConnectDB()