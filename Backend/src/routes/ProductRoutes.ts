import express from 'express'
import ProductController from '../controllers/ProductController'
import authMiddleware from '../middlewares/authMiddleware'
import roleMiddleware from '../middlewares/roleMiddleware'
const router = express.Router()


router.get('/',ProductController.getAllProducts)
router.get('/:id',ProductController.getProductById)

router.post('/',authMiddleware, roleMiddleware("admin"),ProductController.createProduct)
router.put('/:id',authMiddleware,roleMiddleware("admin"),ProductController.updateProduct)
router.delete('/:id',authMiddleware, roleMiddleware("admin"),ProductController.deleteProduct)


export default router