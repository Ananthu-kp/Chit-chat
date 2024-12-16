import express from 'express';
import { protect } from '../Middleware/auth.middleware.js';
import messageController from '../Controller/messageController.js';

const router = express.Router();

router.get('/users', protect, messageController.getUsersForSidebar);
router.get('/:id', protect, messageController.getMessages);
router.post('/send/:id', protect, messageController.sendMessages)

export default router;