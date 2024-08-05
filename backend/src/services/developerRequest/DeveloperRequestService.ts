// Author: Jay Patel

import { client, dbName } from "../../config/mongoDb";
import { Project } from '../../types/ProjectTypes';
import { Group } from '../../types/GroupTypes';
import { ObjectId } from 'mongodb'; // Import ObjectId from 'mongodb'

export class DeveloperRequestService {
  async addRequestToProject(projectId: string, userEmail: string): Promise<boolean> {
    const db = client.db(dbName);
    const projects = db.collection<Project>("projects");

     // Correctly casting projectId from string to ObjectId
     const projectObjectId = new ObjectId(projectId);

     // Attempt to add the user to the pendingRequestList
     const result = await projects.updateOne(
       { _id: projectObjectId }, // Use the cast ObjectId here
       { $addToSet: { pendingRequestList: userEmail } },
       { upsert: true }
     );

    if (result.modifiedCount === 0) {
      console.log(`Request already exists or failed to add for project ID: ${projectId}`);
      return false;
    }

    console.log(`Request added to pending list for project ID: ${projectId}`);
    return true;
  }
}

// Add user to contributors and remove from pending requests
export const acceptUserRequest = async (projectId: string, userEmail: string): Promise<boolean> => {
    const db = client.db(dbName);
    const projects = db.collection<Project>('projects');
    const groups = db.collection<Group>('groups'); // Reference to the groups collection
  
    // Find and update the project
    const projectUpdateResult = await projects.updateOne(
      { _id: new ObjectId(projectId) },
      {
        $addToSet: { contributorsEmail: userEmail },
        $pull: { pendingRequestList: userEmail },
      }
    );
  
    // Check if the project update was successful
    if (projectUpdateResult.modifiedCount === 0) {
      console.log(`Failed to add user ${userEmail} to project ${projectId}`);
      return false;
    }
  
    // Add user to the group's member list
    const groupUpdateResult = await groups.updateOne(
      { projectId: projectId },
      { $addToSet: { memberList: userEmail } }
    );
  
    // Check if the group update was successful
    if (groupUpdateResult.modifiedCount === 0) {
      console.log(`Failed to add user ${userEmail} to group with projectId ${projectId}`);
      return false;
    }
  
    console.log(`User ${userEmail} added to contributors and member list for project ${projectId}`);
    return true;
  };
  
  // Remove user from pending requests
  export const rejectUserRequest = async (projectId: string, userEmail: string): Promise<boolean> => {
    const db = client.db(dbName);
    const projects = db.collection<Project>('projects');
  
    // Find and update the project
    const result = await projects.updateOne(
      { _id: new ObjectId(projectId) },
      { $pull: { pendingRequestList: userEmail } }
    );
  
    return result.modifiedCount > 0;
  };