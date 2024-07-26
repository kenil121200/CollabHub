import express from "express";
import profileRoutes from "./routers/profile/profileRoutes";

const router = express.Router();

router.use("/profile", profileRoutes);

export default router;
