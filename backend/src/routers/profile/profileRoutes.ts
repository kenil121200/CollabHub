import express from "express";
import profileController from "../../controllers/profile/profile.contoller";

const router = express.Router();

router.use(express.json());

// Add your routes here
router.post("/fetchProfile", profileController.fetchProfile);
router.post("/setProfile", profileController.setProfile);
router.post("/updateProfile", profileController.updateProfile);

export default router;
