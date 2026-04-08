import { Model,Optional,DataTypes } from "sequelize";
import { sequelize } from "../config/db";


interface OrderItemAttributes{
    id:number;
    orderId:number;
    productId:number;
    quantity:number;
    price:number;

}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes,"id">{}

export default class OrderItem extends Model<OrderItemAttributes,OrderItemCreationAttributes> implements OrderItemAttributes{
    public id!:number;
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public price!: number;
}
OrderItem.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    orderId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,

    }
    },{
        sequelize,
        tableName:"OrderItems"
    }
    
    
)
