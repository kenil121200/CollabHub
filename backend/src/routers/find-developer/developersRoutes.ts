// Author: Piyush Joshi

import express from "express";
import findDeveloperController from "../../controllers/find-developers/findDeveloper.controller";
const router = express.Router();

router.use(express.json());

router.get("/developers", findDeveloperController.getDevelopers);
router.get("/developer/:id", findDeveloperController.getDeveloper);

export default router;
