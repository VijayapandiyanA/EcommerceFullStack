import User from "./user";
import Product from "./product";
import CartItem from "./cartitem";
import Order from "./order";
import OrderItem from "./orderitem";
import { sequelize } from "../config/db";



User.hasMany(CartItem, { foreignKey: "userId", as: "cartItems" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });


Order.belongsTo(User, { foreignKey: "userId", as: "user" });
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });

OrderItem.belongsTo(Order, { foreignKey: "orderId" , as:"order"});

OrderItem.belongsTo(Product, { foreignKey: "productId" , as:"product" });

CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems" });

const db = {
  sequelize,
  User,
  Product,
  CartItem,
  Order,
  OrderItem,
};

export default db;