import { Request, Response } from 'express';
import { AddUserToProjectService } from '../../services/addUserToProject/addUserToProjectService';

export const addUserToProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectName, email } = req.body;

    if (!projectName || !email) {
      res.status(400).json({ error: 'Project name and email are required' });
      return;
    }

    const addUserToProjectService = new AddUserToProjectService();
    const success = await addUserToProjectService.addUserToProject(projectName, email);

    if (success) {
      res.status(200).json({ message: 'User added to project successfully' });
    } else {
      res.status(404).json({ error: 'Project not found or user already added' });
    }
  } catch (error) {
    console.error('Error adding user to project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};