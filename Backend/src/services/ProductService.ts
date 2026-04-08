import ProductRepository from "../repositories/ProductRepository";

class ProductService{
    async createProduct(data:{
        name:string;
        description:string;
        price:number;
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
            stock:number;
            category:string;
    }>){
        const updated = await ProductRepository.updateProduct(id,data)
        if(!updated) throw new Error("Product not found")
            return updated
    }
    async deleteProduct(id:number){
        const deleted= await ProductRepository.deleteProduct(id)
            return { message: "Product deleted successfully" }
    }

}
export default new ProductService()