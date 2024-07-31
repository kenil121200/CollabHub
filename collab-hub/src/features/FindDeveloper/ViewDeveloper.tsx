import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from '../../types/ProjectTypes';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId]= useState<String | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/find-developers/developer/${id}`
      );
      setDeveloper(response.data);
    };
    fetchDeveloper();
  }, [id]);

  const openModal = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("User email not found in local storage.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<Project[]>(
        `${process.env.REACT_APP_BACKEND_LINK}/listedProjects/fetchProjects`,
        { "createdByEmail": email }
      )
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteDeveloper = async () => {
    if (!selectedProject || !developer) return;
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("User email not found in local storage.");
      return;
    }

    const payload = {
      email: developer.email,
      name: `${developer.firstName} ${developer.lastName}`,
      projectName: selectedProject.projectName,
      projectModerator: email,
      subject: "Invitation to join the open-source project",
      projectId: selectedProjectId,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/invitation/send`,
        payload
      );
      alert("Invitation sent successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error inviting developer:", error);
    }
  };

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
            <button
              onClick={openModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Invite
            </button>
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {projects.length === 0 ? (
                  <div>
                    <p className="text-gray-700">You have no listed projects.</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Invite {developer.firstName} {developer.lastName} to project:
                    </h2>
                    <select
                      value={selectedProject ? selectedProject._id : ""}
                      onChange={(e) => {
                        const selectedProjectName = e.target.value;
                        const project = projects.find(p => p._id === selectedProjectName);
                        console.log(project)
                        if (!project) {
                          setSelectedProject(null);
                          setSelectedProjectId(null);
                        } else {
                          setSelectedProject(project);
                          setSelectedProjectId(project._id || "");
                        }
                       console.log(selectedProject)
                       console.log(selectedProjectId)
                       console.log(selectedProjectName)
                      }}
                      className="w-full mb-4 p-2 border rounded"
                    >
                      <option value="" disabled>
                        Select a project
                      </option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-end">
                      <button
                        onClick={inviteDeveloper}
                        disabled={!selectedProject}
                        className={`font-bold py-2 px-4 rounded mr-2 ${!selectedProject ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        No
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDeveloper;
