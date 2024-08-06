// Author: Jainish Patel, Jay Patel

export interface Project {
  _id?: string;
  createdByEmail?: string;
  projectName: string;
  projectDescription: string;
  contributorsEmail?: string[];
  projectTechnologies: string;
  projectDomain: string;
  pendingRequestList?: string[]; // Add this line
}
