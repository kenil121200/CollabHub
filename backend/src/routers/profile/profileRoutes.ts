import express from "express";
import profileController from "../../controllers/profile/profile.contoller";

const router = express.Router();

router.use(express.json());

console.log("profile router");
// Add your routes here
// router.get("/getProfiles", profileController.getProfiles);
router.post("/setProfile", profileController.setProfile);
router.post("/updateProfile", profileController.updateProfile);

export default router;
