import express from "express";
import profileController from "../../controllers/profile/profile.contoller";

const router = express.Router();

router.use(express.json());

console.log("profile router");
// Add your routes here
router.get("/getProfiles", profileController.getProfiles);

export default router;
