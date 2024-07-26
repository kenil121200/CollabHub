import express from "express";
import authRoutes from "./routers/login/authRoutes";
import userRoutes from "./routers/login/userRoutes";
import repoRoutes from "./routers/repo/repoRoutes";
import chatRoutes from "./routers/chat/chatRoutes";


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/repo', repoRoutes);
router.use('/chat', chatRoutes);

export default router;
