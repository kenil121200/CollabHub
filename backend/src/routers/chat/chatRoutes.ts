import { Router } from 'express';
import chatController from '../../controllers/chat/ChatController';

const router = Router();

router.get('/messages/:groupId', chatController.fetchMessages.bind(chatController));
router.post('/message', chatController.sendMessage.bind(chatController));
router.post('/typing', chatController.sendTypingIndicator.bind(chatController));
router.post('/leave', chatController.leaveGroup.bind(chatController));

export default router;
