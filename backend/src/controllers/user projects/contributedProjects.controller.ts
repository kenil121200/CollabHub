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

  async fetchProjectById(req: Request, res: Response): Promise<Response> {
    try {
      const Id = req.params.Id;

      if (!Id) {
        return res
          .status(400)
          .json({ message: "Missing project Id parameter" });
      }

      const contributedProject =
        await contributedProjectsServices.fetchProjectById(Id);

      if (contributedProject) {
        return res.status(200).json(contributedProject);
      } else {
        return res.status(404).json({ message: "No Project Found" });
      }
    } catch (error) {
      console.log("contributedProjectsController : ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ContributedProjectsController();
