import express from 'express';
import CartController from "../controllers/CartController";
import authMiddleware  from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', authMiddleware, CartController.addCartItem)
router.get('/', authMiddleware, CartController.getCart)
router.put('/update', authMiddleware, CartController.updateCartItem)
router.delete('/remove', authMiddleware, CartController.removeCartItem)
router.delete('/clear', authMiddleware, CartController.clearCart)

export default router