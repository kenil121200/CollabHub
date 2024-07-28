// Author: Piyush Joshi

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Developer {
  age: number;
  contactNumber: string;
  email: string;
  firstName: string;
  gender: string;
  isVisible: boolean;
  lastName: string;
  skills: string[];
  biography?: string;
  experience?: string[];
}

const ViewDeveloper = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);

  useEffect(() => {
    const fetchDeveloper = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/find-developers/developer/${id}`
      );
      setDeveloper(response.data);
    };
    fetchDeveloper();
  }, [id]);

  if (!developer) {
    return <div>Loading...</div>;
  }

  // URLs to LinkedIn and GitHub search pages
  const linkedInSearchUrl = `https://www.linkedin.com/search/results/all/?keywords=${developer.firstName}%20${developer.lastName}`;
  const githubSearchUrl = `https://github.com/search?q=${developer.firstName}+${developer.lastName}`;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 flex flex-col items-center p-4">
          <img
            src={`https://ui-avatars.com/api/?name=${developer.firstName}+${developer.lastName}&background=random`}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
          />
          <h1 className="text-3xl font-bold">{`${developer.firstName} ${developer.lastName}`}</h1>
          <p className="text-gray-600">{developer.email}</p>
          <p className="text-gray-600">{developer.contactNumber}</p>
          <p className="text-gray-600 mt-2">{developer.gender}</p>
          <p className="text-gray-600 mt-2">Age: {developer.age}</p>
          <div className="flex space-x-2 mt-2">
            {" "}
            {/* Container for buttons */}
            <a
              href={linkedInSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                LinkedIn
              </button>
            </a>
            <a href={githubSearchUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                GitHub
              </button>
            </a>
          </div>
        </div>
        <div className="md:col-span-2 p-4">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            {developer.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-4">Biography</h2>
          <p className="text-gray-700">
            {developer.biography || "Not provided."}
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-4">Experience</h2>
          <ul className="list-disc list-inside text-gray-700">
            {developer.experience ? (
              developer.experience.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>No experience details provided.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewDeveloper;
