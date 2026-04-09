import Product from "../models/product"

class ProductRepository{
    async createProduct(data:{
        name:string;
        description:string 
        price:number,
        imageUrl:string,
        stock:number 
        category:string 
    }) {
        return await Product.create(data)
    }


    async getProductById(id:number){
        return await Product.findByPk(id)
    }

    async getAllProducts(){
        return await Product.findAll()
    }
    async updateProduct(id:number, data:Partial<{
         name:string,
         description:string,
         price:number,
         imageUrl:string,
         stock:number;
         category:string
    }>){
         const product = await Product.findByPk(id)
         if(!product) throw new Error("Product not found")
         return await product.update(data)
    }
    
    async deleteProduct(id:number){
        const product = await Product.findByPk(id)
        if(!product) throw new Error("Product not found")
            await product.destroy()
    }

}

export default new ProductRepository()