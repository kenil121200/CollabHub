import { ObjectId } from "mongodb";
export interface Project {
  _id?: ObjectId;
  createdByEmail: string;
  projectName: string;
  projectDescription: string;
  contributorsEmail: string[];
  projectTechnologies: string;
  projectDomain: string;
}
