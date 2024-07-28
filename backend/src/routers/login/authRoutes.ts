// Author: Kenil Patel

import express from "express";
import authController from "../../controllers/login/auth.controller";

const router = express.Router();

router.use(express.json());

router.get("/getAccessToken", authController.getAccessToken);

export default router;
