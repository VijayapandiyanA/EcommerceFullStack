import { Model,Optional,DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Product from "./product";


interface CartItemAttributes{
    id:number;
    userId:number;
    productId:number;
    quantity:number;

}

interface CartItemCreationAttributes extends Optional<CartItemAttributes,"id">{}

export default class CartItem extends Model<CartItemAttributes,CartItemCreationAttributes> implements CartItemAttributes{
    public id!:number;
    public userId!:number;
    public productId!: number;
    public quantity!: number;

    public product?: Product;
}

CartItem.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,

    }
    },{
        sequelize,
        tableName:"CartItems",
        
    }
    
    
)

