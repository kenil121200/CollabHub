// Author: Jay Patel

import { Request, Response } from 'express';
import { DeveloperRequestService, acceptUserRequest, rejectUserRequest } from '../../services/developerRequest/DeveloperRequestService';

export const handleJoinRequest = async (req: Request, res: Response): Promise<void> => {
  const { projectId, userEmail } = req.body;

  if (!projectId || !userEmail) {
    res.status(400).json({ error: 'Project ID and User Email are required' });
    return;
  }
  console.log(projectId, userEmail)
  const developerRequestService = new DeveloperRequestService();
  const success = await developerRequestService.addRequestToProject(projectId, userEmail);

  if (success) {
    res.status(200).json({ message: 'Request added to project successfully' });
  } else {
    res.status(404).json({ error: 'Project not found or user already added' });
  }
};


// Accept user request
export const handleAcceptRequest = async (req: Request, res: Response) => {
    const { projectId, userEmail } = req.body;
  
    if (!projectId || !userEmail) {
      return res.status(400).json({ error: 'Project ID and User Email are required.' });
    }
  
    try {
      const success = await acceptUserRequest(projectId, userEmail);
      if (success) {
        return res.status(200).json({ message: 'User added to contributors successfully.' });
      } else {
        return res.status(404).json({ error: 'Project not found or user already a contributor.' });
      }
    } catch (error) {
      console.error('Error accepting user request:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  // Reject user request
  export const handleRejectRequest = async (req: Request, res: Response) => {
    const { projectId, userEmail } = req.body;
  
    if (!projectId || !userEmail) {
      return res.status(400).json({ error: 'Project ID and User Email are required.' });
    }
  
    try {
      const success = await rejectUserRequest(projectId, userEmail);
      if (success) {
        return res.status(200).json({ message: 'User removed from pending requests successfully.' });
      } else {
        return res.status(404).json({ error: 'Project not found or user not in pending requests.' });
      }
    } catch (error) {
      console.error('Error rejecting user request:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };
