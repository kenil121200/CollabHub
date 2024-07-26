import React, { useEffect, useState } from "react";
import axios from "axios";
import DeveloperCard from "../../components/DeveloperCard";

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

const FindDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get<Profile[]>(
          "http://localhost:8081/find-developers/developers"
        );
        setDevelopers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <>
      <div>
        {developers.map((developer) => (
          <DeveloperCard key={developer.email} developer={developer} />
        ))}
      </div>
    </>
  );
};

export default FindDeveloper;
