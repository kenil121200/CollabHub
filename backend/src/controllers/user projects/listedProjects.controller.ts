import { Request, Response } from "express";
import listedProjectsServices from "../../services/user projects/listedProjects.services";
import { Project } from "../../types/ProjectTypes";

class ListedProjectsController {
  constructor() {}
  async createNewProject(req: Request, res: Response): Promise<Response> {
    try {
      const {
        createdByEmail,
        projectName,
        projectDescription,
        projectTechnologies,
        projectDomain,
      } = req.body;

      if (
        !createdByEmail ||
        !projectName ||
        !projectDescription ||
        !projectTechnologies ||
        !projectDomain
      ) {
        return res.status(400).json({ message: "Missing parameters" });
      }

      const listedProject: Project = {
        createdByEmail: createdByEmail,
        projectName: projectName,
        projectDescription: projectDescription,
        contributorsEmail: [],
        projectTechnologies: projectDescription,
        projectDomain: projectDomain,
      };
      listedProject.contributorsEmail.push(createdByEmail);

      // console.log(listedProject);
      const insertResult = await listedProjectsServices.createNewProject(
        listedProject
      );

      if (insertResult === "Project created successfully") {
        return res.status(200).json({ message: insertResult });
      } else {
        return res.status(500).json({ message: "Project creation failed" });
      }
    } catch (error) {
      console.log("ListedProjectsController : ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async fetchProjects(req: Request, res: Response): Promise<Response> {
    try {
      const { createdByEmail } = req.body;

      if (!createdByEmail) {
        return res
          .status(400)
          .json({ message: "Missing developer email parameter" });
      }

      const listedProjects = await listedProjectsServices.fetchProjects(
        createdByEmail
      );

      if (listedProjects) {
        return res.status(200).json(listedProjects);
      } else {
        return res.status(404).json({ message: "No Projects Found" });
      }
    } catch (error) {
      console.log("ListedProjectsController : ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async fetchAllProjects(req: Request, res: Response): Promise<Response> {
    try {
      const allProjects = await listedProjectsServices.fetchAllProjects();
      if (allProjects) {
        return res.status(200).json(allProjects);
      } else {
        return res.status(404).json({ message: "No projects found" });
      }
    } catch (error) {
      console.log("ListedProjectsController : ", error);
      return res.status(500).json({ message: "Internal server error" });
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

      const listedProject = await listedProjectsServices.fetchProjectById(Id);

      if (listedProject) {
        return res.status(200).json(listedProject);
      } else {
        return res.status(404).json({ message: "No Project Found" });
      }
    } catch (error) {
      console.log("ListedProjectsController : ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ListedProjectsController();
