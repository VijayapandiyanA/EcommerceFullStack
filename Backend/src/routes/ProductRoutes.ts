import express from 'express'
import ProductController from '../controllers/ProductController'
import authMiddleware from '../middlewares/authMiddleware'
import roleMiddleware from '../middlewares/roleMiddleware'
import zodValidationMiddleware from '../middlewares/zodValidationMiddleware'
import { productCreateSchema,productUpdateSchema  } from '../validations/ProductValidation'
const router = express.Router()


router.get('/',ProductController.getAllProducts)
router.get('/:id',ProductController.getProductById)

router.post('/',authMiddleware, roleMiddleware("admin"),zodValidationMiddleware(productCreateSchema),ProductController.createProduct)
router.put('/:id',authMiddleware,roleMiddleware("admin"), zodValidationMiddleware(productUpdateSchema),ProductController.updateProduct)
router.delete('/:id',authMiddleware, roleMiddleware("admin"),ProductController.deleteProduct)


export default router