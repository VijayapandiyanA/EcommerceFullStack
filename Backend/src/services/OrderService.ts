import OrderRepository from "../repositories/OrderRepository";

class OrderService{
    async  placeOrder(userId:number){
        return await OrderRepository.createOrder(userId)
    }

    async getOrderHistory(userId:number){
        return await OrderRepository.getOrderByUserId(userId)
    }
}

export default new OrderService()