//Author : Jainish Patel

import { ObjectId } from "mongodb";
import { client, dbName } from "../../config/mongoDb";
import { Project } from "../../types/ProjectTypes";

class ContributedProjectsServices {
  constructor() {}

  async fetchProjects(contributorEmail: string): Promise<Project[] | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Project>("projects");
      const contributedProjects = await collection.find({
        contributorsEmail: { $in: [contributorEmail] },
      });
      return contributedProjects.toArray();
    } catch (error) {
      console.error("Error fetching listed ptojects:", error);
      throw error;
    }
  }

  async fetchProjectById(id: string): Promise<Project | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Project>("projects");
      const contributedProject = await collection.findOne({
        _id: new ObjectId(id),
      });
      return contributedProject;
    } catch (error) {
      console.error("Error fetching contributed ptoject:", error);
      throw error;
    }
  }
}

export default new ContributedProjectsServices();
