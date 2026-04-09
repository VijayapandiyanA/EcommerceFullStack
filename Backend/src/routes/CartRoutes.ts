import express from 'express';
import CartController from "../controllers/CartController";
import authMiddleware  from '../middlewares/authMiddleware';
import zodValidationMiddleware from '../middlewares/zodValidationMiddleware';
import { addToCartSchema,updateCartSchema,removeFromCartSchema } from '../validations/CartValidation'

const router = express.Router();

router.post('/add', authMiddleware,zodValidationMiddleware(addToCartSchema), CartController.addCartItem)
router.get('/', authMiddleware, CartController.getCart)
router.put('/update', authMiddleware, zodValidationMiddleware(updateCartSchema), CartController.updateCartItem)
router.delete('/remove', authMiddleware, zodValidationMiddleware(removeFromCartSchema), CartController.removeCartItem)
router.delete('/clear', authMiddleware, CartController.clearCart)

export default router