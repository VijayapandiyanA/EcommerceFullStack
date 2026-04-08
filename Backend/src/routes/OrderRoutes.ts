import express from 'express'
import OrderController from '../controllers/OrderController'
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/place', OrderController.placeOrder);
router.get('/history', OrderController.getOrderHistory)


export default router