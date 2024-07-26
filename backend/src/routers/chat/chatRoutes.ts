import { Router } from 'express';
import chatController from '../../controllers/chat/ChatController';

const router = Router();

router.get('/messages/:groupId', chatController.fetchMessages.bind(chatController));
router.post('/message', chatController.sendMessage.bind(chatController));
router.post('/typing', chatController.sendTypingIndicator.bind(chatController));

export default router;
