import express from "express";
import listedProjectsController from "../../controllers/user projects/listedProjects.controller";

const router = express.Router();
router.use(express.json());

router.post("/createNewProject", listedProjectsController.createNewProject);
router.post("/fetchProjects", listedProjectsController.fetchProjects);
router.get("/getAllProjects", listedProjectsController.fetchAllProjects);

export default router;
