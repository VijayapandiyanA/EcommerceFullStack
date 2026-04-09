import ProductRepository from "../repositories/ProductRepository";
import createError  from "../utils/createError";

class ProductService{
    async createProduct(data:{
        name:string;
        description:string;
        price:number;
        imageUrl:string,
        stock:number;
        category:string;
    }){
         return await ProductRepository.createProduct(data)
    }
    

    async getProductById(id:number){
        return await ProductRepository.getProductById(id)
    }

    async getAllProducts(){
        return await ProductRepository.getAllProducts()
    }
    async updateProduct(id:number, data:Partial<{
            name:string;
            description:string;
            price:number;
            imageUrl:string,
            stock:number;
            category:string;
    }>){
        const updated = await ProductRepository.updateProduct(id,data)
        if(!updated) throw createError("Product not found", 404)
            return updated
    }
    async deleteProduct(id:number){
        const deleted= await ProductRepository.deleteProduct(id)
            return { message: "Product deleted successfully" }
    }

}
export default new ProductService()