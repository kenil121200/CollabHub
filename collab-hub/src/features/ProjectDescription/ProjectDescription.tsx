// Author: Jay Patel

import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

function ProjectDescription() {
  const { id } = useParams(); // Get the project ID from the URL
  
  const handleSendRequest = async () => {
    try {
      const userEmail = localStorage.getItem('email'); // Get the user email from localStorage
      if (!userEmail) {
        alert('User email not found. Please log in.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/join-project/join`, {
        projectId: id,
        userEmail: userEmail
      });

      if (response.status === 200) {
        console.log(response)
        alert('Request sent successfully!');
      } else {
        alert('Failed to send request.');
      }
    } catch (error) {
      console.error('Error sending join request:', error);
      alert('Failed to send request.');
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project ID: {id}</h1>
      <Button variant="contained" color="primary" onClick={handleSendRequest}>
        Send Request
      </Button>
    </div>
  );
}

export default ProjectDescription;
