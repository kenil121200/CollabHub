export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  age?: number;
  isVisible: boolean;
  gender: string;
  skills: string[];
  typeOfUser: UserType;
  contactNumber: string;
  previouslyDoneProjects?: string[];
}

export interface UserType {
  Developer: "Developer";
  ProjectManager: "Project Manager";
}
