import express from "express";
import { sendInvitation } from "../../controllers/invitation/invitationController";

const router = express.Router();

router.post("/send", sendInvitation);

export default router;