import express from 'express';
import authController from '../Controller/authController.js';
import { protect } from '../Middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.put('/update-profile', protect, authController.updateProfile)

export default router