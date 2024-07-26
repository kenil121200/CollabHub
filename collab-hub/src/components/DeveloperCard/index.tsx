import React from "react";
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  isVisible: boolean;
  gender: string;
  skills: string[];
  typeOfUser: string;
  contactNumber: string;
  previouslyDoneProjects?: string[];
}
const DeveloperCard = ({ developer }: { developer: Profile }) => {
  return <div>{developer.firstName}</div>;
};

export default DeveloperCard;
