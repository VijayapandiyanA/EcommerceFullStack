import User from "../models/user";

class UserRepository{
    async createUser(userdata:{
        name:string,
        email:string,
        password:string,
        role:"user"|"admin";
    }){
        return await User.create(userdata)
    }

    async getUserByEmail(email:string){
        return await User.findOne({where:{email}})
    }

    async getUserById(id:number){
        return await User.findByPk(id)
    }
   

}

export default new UserRepository()