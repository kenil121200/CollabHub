// Author: Kenil Patel

import express from "express";
import userController from "../../controllers/login/user.controller";

const router = express.Router();

router.use(express.json());

router.get("/getUserData", userController.getUserData);

export default router;
