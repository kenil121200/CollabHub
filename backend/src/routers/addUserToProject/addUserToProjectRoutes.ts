import express from "express";
import { addUserToProject } from "../../controllers/adduserToProject/addUserToProjectcontroller";

const router = express.Router();

router.post("/add", addUserToProject);

export default router;