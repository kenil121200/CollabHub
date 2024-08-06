import { client, dbName } from "../../config/mongoDb";
import { Project } from '../../types/ProjectTypes';

export class AddUserToProjectService {
  async addUserToProject(projectName: string, email: string, projectId: string): Promise<boolean> {
    const db = client.db(dbName);
    const projectCollection = db.collection<Project>("projects");
    const groupCollection = db.collection("groups");

    // Update the project to add the user email
    const project = await projectCollection.findOne({ projectName: projectName });
    if (!project) {
      console.log(`Project ${projectName} not found`);
      return false;
    }

    console.log(`Project found: `, project);

    const projectUpdateResult = await projectCollection.updateOne(
      { projectName: projectName },
      { $addToSet: { contributorsEmail: email } }
    );

    console.log(`Project update result: `, projectUpdateResult);

    if (projectUpdateResult.modifiedCount === 0) {
      console.log(`Failed to update project ${projectName}`);
      return false;
    }

    const groupUpdateResult = await groupCollection.updateOne(
      { projectId: projectId },
      { $addToSet: { memberList: email } }
    );

    console.log(`Group update result: `, groupUpdateResult);

    return groupUpdateResult.modifiedCount > 0;
  }
}