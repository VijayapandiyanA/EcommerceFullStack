import db from "../models";

const { CartItem, Product } = db;

class CartRepository{

    async addToCart(data:{
        userId:number;
        productId:number;
        quantity?:number;
    }){
        const existingItem = await CartItem.findOne({where:{userId:data.userId,productId:data.productId}})
        if(existingItem){
            existingItem.quantity += data.quantity??1
            return await existingItem.save()
        }
        return await CartItem.create({
            userId: data.userId,
            productId: data.productId,
            quantity: data.quantity ?? 1
        })
    }

    async getCartItems(userId:number){
        return await CartItem.findAll({
            where:{userId},
            include:[{
                model:Product,
                as:"product"
            }]
        })
    }


    async updateCartItem(userId:number, productId:number, quantity:number){
        const item = await CartItem.findOne({ where: { userId, productId } })
        if(!item) return null; 
            item.quantity = quantity
            return await item.save()
        
        
    }


    async removeCartItem(userId:number, productId:number){
        const item = await CartItem.findOne({ where: { userId, productId } })
        if(!item) return null
             await item.destroy()
            return true
    }

    async clearCart(userId:number){
        await CartItem.destroy({where:{userId}})
    }
}

export default new CartRepository()