import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import dotenv  from 'dotenv';
dotenv.config()

class UserService{
    async register(userdata:{
        name:string,
        email:string,
        password:string,
        role:"user"|"admin"
    }){
    const existingUser = await UserRepository.getUserByEmail(userdata.email)
    if(existingUser) throw new Error("User with this email already exists")
    
    const hashedPassword = await bcrypt.hash(userdata.password,10)
    const user = await UserRepository.createUser({...userdata, password: hashedPassword})
      return { id: user.id, name: user.name, email: user.email, role: user.role };
  }



   async login(email:string,password:string){
    const user = await UserRepository.getUserByEmail(email)
    if(!user) throw new Error("Invalid email")
        const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch) throw new Error("Invalid Password")
            const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    return { token , user:{ id: user.id, name: user.name, email: user.email,role:user.role}};
    }


}

export default new UserService()