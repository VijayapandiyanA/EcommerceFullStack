import express from 'express'
import UserController from '../controllers/UserController'
import zodValidationMiddleware from '../middlewares/zodValidationMiddleware'
import { loginSchema, registerSchema } from '../validations/UserValidation'

const router = express.Router()

router.post('/register', zodValidationMiddleware(registerSchema), UserController.register)
router.post('/login', zodValidationMiddleware(loginSchema), UserController.login)

export default router