// Author: Piyush Joshi

import { Request, Response } from "express";
import { Profile } from "../../types/ProfileTypes";
import findDeveloperServices from "../../services/profile/findDeveloper.services";

class FindDeveloperController {
  constructor() {}

  async getDevelopers(req: Request, res: Response): Promise<void> {
    try {
      const developers: Profile[] =
        await findDeveloperServices.fetchAllDevelopers();

      console.log(developers);

      if (developers) {
        res.status(200).json(developers);
      }
    } catch (errors) {
      console.error("Error fetching developers:", errors);

      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDeveloper(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const developer = await findDeveloperServices.fetchDeveloper(id);

      if (developer) {
        res.status(200).json(developer);
      } else {
        res.status(404).json({ message: "Developer not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new FindDeveloperController();
