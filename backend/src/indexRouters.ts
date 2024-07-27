import express from "express";
import authRoutes from "./routers/login/authRoutes";
import userRoutes from "./routers/login/userRoutes";
import repoRoutes from "./routers/repo/repoRoutes";
import listedProjectsRoutes from "./routers/user Projects/listedProjectsRoutes";
import contributedProjectsRoutes from "./routers/user Projects/contributedProjectsRoutes";
import chatRoutes from "./routers/chat/chatRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/repo", repoRoutes);
router.use("/listedProjects", listedProjectsRoutes);
router.use("/contributedProjects", contributedProjectsRoutes);
router.use("/chat", chatRoutes);

export default router;
