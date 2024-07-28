// Author: Piyush Joshi

import React from "react";

interface Profile {
  _id: any;
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

interface DeveloperCardProps {
  developer: Profile;
  onClick?: () => void; // onClick should be a function
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  developer,
  onClick,
}) => {
  return (
    <div
      className="p-4 border-b border-gray-300 bg-white hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row items-center space-x-4">
        <img
          src={`https://ui-avatars.com/api/?name=${developer.firstName}+${developer.lastName}&background=random`}
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-black">
            {developer.firstName} {developer.lastName}
          </h3>
          <p className="text-gray-600">
            <strong>Title:</strong> {developer.email}
          </p>
          <p className="text-gray-600">
            <strong>Skills:</strong> {developer.skills.join(", ")}
          </p>
          <p className="text-gray-600">
            <strong>Background:</strong>{" "}
            {developer.age ? `${developer.age} years` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
