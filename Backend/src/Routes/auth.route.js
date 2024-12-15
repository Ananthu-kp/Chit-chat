import express from 'express';
import authController from '../Controller/authController.js';

const router = express.Router()

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

export default router