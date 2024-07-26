import express from "express";
import repoController from "../../controllers/repo/repo.controller";

const router = express.Router();

router.use(express.json());

router.post('/createRepo', repoController.createRepo);
router.post('/addCollaborator', repoController.addCollaborator);

export default router;