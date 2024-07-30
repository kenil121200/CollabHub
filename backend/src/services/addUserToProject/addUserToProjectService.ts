import { client, dbName } from "../../config/mongoDb";
import { Project } from '../../types/ProjectTypes';
import { ObjectId, WithId } from "mongodb";

export class AddUserToProjectService {
  async addUserToProject(projectName: string, email: string): Promise<boolean> {
    const db = client.db(dbName);
    const collection = db.collection<Project>("projects");

    const project = await collection.findOne({ projectName: projectName });
    if (!project) {
      console.log(`Project ${projectName} not found`);
      return false;
    }

    console.log(`Project found: `, project);

    const result = await collection.updateOne(
      { projectName: projectName },
      { $addToSet: { contributorsEmail: email } }
    );

    console.log(`Update result: `, result);

    return result.modifiedCount > 0;
  }
}