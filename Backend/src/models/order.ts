import { Model,Optional,DataTypes } from "sequelize";
import { sequelize } from "../config/db";



interface OrderAttributes{
  id:number;
  userId:number;
  totalPrice:number;
  status:"pending"|"completed";

}

interface OrderCreationAttributes extends Optional<OrderAttributes,"id" | "status">{}

export default class Order extends Model<OrderAttributes,OrderCreationAttributes> implements OrderAttributes{
  public id!:number;
  public userId!: number;
  public totalPrice!: number;
  public status!: "pending"|"completed";
}
Order.init({
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  totalPrice:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false,
  },
  status:{
    type:DataTypes.ENUM("pending", "completed"),
    defaultValue:"pending",
  }
}, {
  sequelize,
  tableName:"Orders",
})
