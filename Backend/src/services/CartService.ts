import CartRepository from "../repositories/CartRepository";
import createError  from "../utils/createError";

class CartService{
    async addTocart(data:{
        userId:number;
        productId:number;
        quantity?:number;
    }){
        return await CartRepository.addToCart(data)
    }
    async getCartItems(userId:number){
        return await CartRepository.getCartItems(userId)
    }
    async updateCartItem(userId:number, productId:number, quantity:number){
        const updated = await CartRepository.updateCartItem(userId, productId, quantity)
        if(!updated) throw createError("Cart item not found", 404)
            return updated
    }
    async removeCartItem(userId:number, productId:number){
        const removed = await CartRepository.removeCartItem(userId, productId)
        if(!removed) throw createError("Cart item not found", 404)
            return {message:"Cart item removed successfully"}
    }
    async clearCart(userId:number){
         await CartRepository.clearCart(userId)
          return { message: "Cart cleared successfully" };
    }
}

export default new CartService()