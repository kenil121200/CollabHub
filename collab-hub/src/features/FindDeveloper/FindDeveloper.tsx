import React, { useEffect, useState } from "react";
import DeveloperCard from "../../components/DeveloperCard";
import { NavBar } from "../../components";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/DeveloperCard/Sidebar";
import axios from "axios";

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

const FindDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Profile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get<Profile[]>(
          `${process.env.REACT_APP_BACKEND_LINK}/find-developers/developers`
        );
        setDevelopers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDevelopers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (skill: string) => {
    let updatedSkills;
    if (filterSkills.includes(skill)) {
      updatedSkills = filterSkills.filter((s) => s !== skill);
    } else {
      updatedSkills = [...filterSkills, skill];
    }
    setFilterSkills(updatedSkills);
  };

  const filteredDevelopers = developers.filter(
    (dev) =>
      (dev.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (filterSkills.length === 0 ||
        filterSkills.some((skill) => dev.skills.includes(skill)))
  );

  const handleClick = (developerId: any) => {
    navigate(`/getDeveloper/${developerId}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
        <button
          className={`md:hidden p-4 z-50 focus:outline-none ${
            isSidebarOpen ? "fixed right-0 top-0" : "relative"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Filters"}
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-white bg-opacity-75 z-40 md:hidden">
            <Sidebar onFilterChange={handleFilterChange} />
          </div>
        )}
        <Sidebar
          onFilterChange={handleFilterChange}
          className="hidden md:block md:w-1/4 xl:w-1/5"
        />
        <div className="flex-1 p-8 text-gray-800 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-black">Find Developers</h1>
            <input
              type="text"
              placeholder="Type here to search..."
              className="p-3 border rounded w-full md:w-1/2 focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-150"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map((dev) => (
              <DeveloperCard
                key={dev.email}
                developer={dev}
                onClick={() => handleClick(dev._id)}
              />
            ))
          ) : (
            <p className="text-black text-xl">No developers found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FindDeveloper;
