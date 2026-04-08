import db from "../models";

const { CartItem, Product, Order, OrderItem } = db;


class OrderRepository{
    async createOrder(userId:number){

        const cartItems = await CartItem.findAll({where:{userId},
             include:
             [{model:Product,
        
                as:"product"}]})

             if(cartItems.length === 0) throw new Error("Cart is empty")
              
                let totalAmount = 0

                cartItems.forEach(item=>{
                     if (!item.product) {
    throw new Error("Product not loaded");
  }
                    totalAmount += item.quantity * item.product!.price;
                })
   
   const order = await Order.create({
    userId,
    totalPrice: totalAmount,
    status:"completed"
   })

   const orderItemsData = cartItems.map(item=>({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product!.price

   }))

   await OrderItem.bulkCreate(orderItemsData)
   
    await CartItem.destroy({ where: { userId } });

    return order
   
            }

    async getOrderByUserId(userId:number){
        return await Order.findAll({
            where:{userId},
            include:[{
                model:OrderItem,
                as:"items",
                include:[{
                    model:Product,
                    as:"product"
                }]
            }],
            order:[['createdAt','DESC']]
        })


    }


    
}

export default new OrderRepository();