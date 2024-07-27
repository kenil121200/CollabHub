import { Request, Response } from "express";
import contributedProjectsServices from "../../services/user projects/contributedProjects.services";

class ContributedProjectsController {
  constructor() {}

  async fetchProjects(req: Request, res: Response): Promise<Response> {
    try {
      const { contributorEmail } = req.body;

      if (!contributorEmail) {
        return res
          .status(400)
          .json({ message: "Missing contributor email parameters" });
      }

      const contributedProjects =
        await contributedProjectsServices.fetchProjects(contributorEmail);

      if (contributedProjects) {
        return res.status(200).json(contributedProjects);
      } else {
        return res.status(404).json({ message: "No Projects Found" });
      }
    } catch (error) {
      console.log("ContributedProjectsController : ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ContributedProjectsController();
