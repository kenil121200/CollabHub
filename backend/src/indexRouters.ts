import express from "express";
import profileRoutes from "./routers/profile/profileRoutes";

const router = express.Router();

console.log("in index router");
router.use("/profiles", profileRoutes);

export default router;
