import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import dotenv  from 'dotenv';
import createError from "../utils/createError";
dotenv.config()

class UserService{
    async register(userdata:{
        name:string,
        email:string,
        password:string,
        role:"user"|"admin"
    }){
    const existingUser = await UserRepository.getUserByEmail(userdata.email)
    if(existingUser) throw createError("User with this email already exists",400)
    
    const hashedPassword = await bcrypt.hash(userdata.password,10)
    const user = await UserRepository.createUser({...userdata, password: hashedPassword})
      return { id: user.id, name: user.name, email: user.email, role: user.role };
  }



   async login(email:string,password:string){
    const user = await UserRepository.getUserByEmail(email)
    if(!user) throw createError("Invalid email", 400)
        const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch) throw createError("Invalid Password", 400)
            const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    return { token , user:{ id: user.id, name: user.name, email: user.email,role:user.role}};
    }


}

export default new UserService()