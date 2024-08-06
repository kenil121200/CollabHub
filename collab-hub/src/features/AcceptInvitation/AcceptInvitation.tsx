import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const paramsProjectName = searchParams.get('projectName');
    const paramsProjectId = searchParams.get('projectId');
    
    if (paramsProjectName && paramsProjectId) {
      setProjectName(paramsProjectName);
      setProjectId(paramsProjectId);
    } else {
      navigate('/'); // Redirect to home if parameters are missing
    }
  }, [searchParams, navigate]);

  const handleAccept = async () => {
    if (!projectId || !projectName) return;

    setIsLoading(true);
    const email = localStorage.getItem('email');

    if (!email) {
      console.error("User email not found in local storage.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/addUserToProject/add`, {
        projectName,
        projectId,
        email
      });
      alert('you have successfully joined the group!');
      navigate('/'); 
    } catch (error) {
      console.error('Error accepting invitation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    navigate('/'); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {projectName ? `Do you want to join the project: ${projectName}?` : 'Loading project details...'}
        </h2>
        <div className="flex justify-end">
          <button
            onClick={handleAccept}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
