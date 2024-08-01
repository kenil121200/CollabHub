// Author: Jay Patel

import express from "express";
import { handleAcceptRequest, handleJoinRequest, handleRejectRequest } from '../../controllers/developer-request/DeveloperRequestController';

const router = express.Router();

router.post("/join", handleJoinRequest);
// Accept collaboration request
router.post('/accept', handleAcceptRequest);

// Reject collaboration request
router.post('/reject', handleRejectRequest);

export default router;