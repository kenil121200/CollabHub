// Author: Tathya Kapadia
// Author : Jainish Patel

import { ObjectId } from "mongodb";
import { client, dbName } from "../../config/mongoDb";
import { Project } from "../../types/ProjectTypes";
import { Group } from "../../types/GroupTypes";

class ListedProjectsServices {
  constructor() {}

  async createNewProject(listedProject: Project): Promise<String> {
    try {
      const db = client.db(dbName);
      const projectsCollection = db.collection<Project>("projects");

      const projectsResult = await projectsCollection.insertOne(listedProject);

      if (projectsResult.insertedId) {
        const groupsCollection = db.collection<Group>("groups");

        let group: Group = {
          projectId: projectsResult.insertedId.toString(),
          projectName: listedProject.projectName,
          memberList: [],
        };
        group.memberList.push(listedProject.createdByEmail);

        await groupsCollection.insertOne(group);

        return "Project created successfully";
      } else {
        throw new Error("Project creation failed");
      }
    } catch (error) {
      console.error("Error creating project: ", error);
      throw new Error("Internal server error");
    }
  }

  async fetchProjects(createdByEmail: string): Promise<Project[] | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Project>("projects");
      const listedProjects = await collection.find({
        createdByEmail: createdByEmail,
      });
      return listedProjects.toArray();
    } catch (error) {
      console.error("Error fetching listed ptojects:", error);
      throw error;
    }
  }

  async fetchAllProjects(): Promise<Project[] | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Project>("projects");
      const allProjects = await collection.find({}).toArray();
      return allProjects;
    } catch (error) {
      console.error("Error fetching all projects:", error);
      throw error;
    }
  }
  async fetchProjectById(id: string): Promise<Project | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Project>("projects");
      const listedProject = await collection.findOne({ _id: new ObjectId(id) });
      return listedProject;
    } catch (error) {
      console.error("Error fetching listed ptoject:", error);
      throw error;
    }
  }
}

export default new ListedProjectsServices();
