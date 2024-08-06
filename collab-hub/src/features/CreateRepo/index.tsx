import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CreateRepoForm: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('This repository was created using CollabHub');
  const [isPrivate, setIsPrivate] = useState(false);
  const [collaborators, setCollaborators] = useState<{ name: string, role: string,  avatar_url: string}[]>([]);
  const [newCollaborator, setNewCollaborator] = useState('');
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('push');
  const [isRepoNameAvailable, setIsRepoNameAvailable] = useState<boolean | null>(null);
  const [userRepos, setUserRepos] = useState<string[]>([]);
  const [newCollaboratorAvatar, setNewCollaboratorAvatar] = useState('');
  const [searchResults, setSearchResults] = useState<{ login: string, avatar_url: string; }[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const GITHUB_TOKEN = localStorage.getItem('accessToken');
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        const repoNames = response.data.map((repo: any) => repo.name.toLowerCase());
        setUserRepos(repoNames);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    };

    fetchUserRepos();
  }, []);

  const checkRepoName = (name: string) => {
    if (name === '') {
      setIsRepoNameAvailable(null);
      return;
    }
    const repoExists = userRepos.includes(name.toLowerCase());
    setIsRepoNameAvailable(!repoExists);
  };

  const handleRepoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setRepoName(name);
    checkRepoName(name);
  };

  const handleCollaboratorSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setNewCollaborator(searchTerm);
  
    if (searchTerm.length > 2) {
      try {
        const GITHUB_TOKEN = localStorage.getItem('accessToken');
        const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        setSearchResults(response.data.items.map((item: any) => ({
          login: item.login,
          avatar_url: item.avatar_url
        })));
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error searching collaborators:', error);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSelectCollaborator = (login: string, avatar_url: string) => {
    setNewCollaborator(login);
    setNewCollaboratorAvatar(avatar_url);
    setIsDropdownVisible(false);
  };

  const handleAddCollaborator = () => {
    if (newCollaborator) {
      setCollaborators([...collaborators, { name: newCollaborator, role: newCollaboratorRole, avatar_url: newCollaboratorAvatar }]);
      setNewCollaborator('');
      setNewCollaboratorRole('push');
      setSearchResults([]);
      setIsDropdownVisible(false);
      setNewCollaboratorAvatar('');
    }
  };

  const handleRemoveCollaborator = (name: string) => {
    setCollaborators(collaborators.filter(collab => collab.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if repoName is empty
    if (!repoName.trim()) {
      setErrorMessage('Repository name cannot be empty');
      return;
    }
  
    try {
      const createRepoResponse = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/repo/createRepo`, {
        accessToken: localStorage.getItem('accessToken'),
        repoName,
        repoDescription: description,
        privateRepo: isPrivate,
      });

      if (createRepoResponse.status === 200) {
        const createdRepo = createRepoResponse.data;
        console.log('Created repository:', createdRepo);
  
        if (collaborators.length > 0) {
            for (const collaborator of collaborators) {
                try {
                await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/repo/addCollaborator`, {
                    accessToken: localStorage.getItem('accessToken'),
                    owner: JSON.parse(localStorage.getItem('user') || '{}').login,
                    repo: createdRepo.name,
                    username: collaborator.name,
                    permission: collaborator.role,
                });
                } catch (collabError) {
                console.error(`Error adding collaborator ${collaborator.name}:`, collabError);
                setErrorMessage(`Failed to add collaborator ${collaborator.name}`);
                // Optionally, handle partial success here
                }
            }
            }
        }

        alert('Repository created and collaborators added successfully!');
        setRepoName('');
        setDescription('This repository was created using CollabHub');
        setIsPrivate(false);
        setCollaborators([]);
        setNewCollaborator('');
        setNewCollaboratorRole('push');
        setIsRepoNameAvailable(null);
        setUserRepos([]);
        setSearchResults([]);
        setIsDropdownVisible(false);
    } catch (error) {
      console.error('Error creating repository or adding collaborators:', error);
      setErrorMessage('Failed to create repository or add collaborators');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a New GitHub Repository</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Repository Name:</label>
          <input
            type="text"
            value={repoName}
            onChange={handleRepoNameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {isRepoNameAvailable !== null && (
            <div>
              {isRepoNameAvailable ? (
                <span className="text-green-500">✔ Repository name is available</span>
              ) : (
                <span className="text-red-500">✘ Repository name is not available</span>
              )}
            </div>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Visibility:</span>
          <label className="inline-flex items-center mt-2">
            <input
              type="radio"
              checked={!isPrivate}
              onChange={() => setIsPrivate(false)}
              className="form-radio"
            />
            <span className="ml-2">Public</span>
          </label>
          <label className="inline-flex items-center mt-2 ml-4">
            <input
              type="radio"
              checked={isPrivate}
              onChange={() => setIsPrivate(true)}
              className="form-radio"
            />
            <span className="ml-2">Private</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Add Collaborators:</label>
          <div className="flex items-center relative">
            <div className="relative">
                <input
                    type="text"
                    value={newCollaborator}
                    onChange={handleCollaboratorSearch}
                    className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {isDropdownVisible && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                        {searchResults
                        .filter(result => result.login !== JSON.parse(localStorage.getItem('user') || '{}').login)
                        .map((result) => (
                            <li
                            key={result.login}
                            onClick={() => handleSelectCollaborator(result.login, result.avatar_url)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                            >
                            <img src={result.avatar_url} alt={`${result.login} avatar`} className="w-6 h-6 rounded-full mr-2" />
                            {result.login}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <select
              value={newCollaboratorRole}
              onChange={(e) => setNewCollaboratorRole(e.target.value)}
              className="mt-1 ml-2 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="pull">Pull</option>
              <option value="triage">Triage</option>
              <option value="push">Push</option>
              <option value="maintain">Maintain</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="button"
              onClick={handleAddCollaborator}
              className="mt-1 ml-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">List of Collaborators:</label>
            <ul>
                {collaborators.map((collab, index) => (
                <li key={index} className="flex items-center mt-2">
                    <img src={collab.avatar_url} alt={`${collab.name} avatar`} className="w-6 h-6 rounded-full mr-2" />
                    {collab.name} (Role: {collab.role.charAt(0).toUpperCase() + collab.role.slice(1)})
                    <button
                    type="button"
                    onClick={() => handleRemoveCollaborator(collab.name)}
                    className="ml-2 bg-red-500 text-white font-semibold px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Remove
                    </button>
                </li>
                ))}
            </ul>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md"
        >
          Create Repository
        </button>
      </form>
    </div>
  );
};

export default CreateRepoForm;
