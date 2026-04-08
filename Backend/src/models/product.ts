import { Model,Optional,DataType, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

interface ProductAttributes{
  id:number,
  name:string;
  description:string;
  price:number;
  stock:number;
  category:string
}

interface ProductCreationAttributes extends Optional<ProductAttributes,"id">{}

export default class Product extends Model<ProductAttributes,ProductCreationAttributes> implements ProductAttributes{
  public id!:number;
  public name!:string;
  public description!: string;
  public price!:number;
  public stock!:number;
  public category!: string; 
  public readonly createdAt!:Date;
  public readonly updatedAt!:Date

   
}

Product.init({
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:false,
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false,
  },
  stock:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  category:{
    type:DataTypes.STRING,
    allowNull:false, 
  },

  },{
    sequelize,
    tableName:"Products",
    
  }
  
  
)

