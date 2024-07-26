import { Request, Response } from 'express';
import axios from 'axios';

class RepoController {
  constructor() {}

  async createRepo(req: Request, res: Response): Promise<void> {
    const { accessToken, repoName, repoDescription, privateRepo } = req.body;

    const url = 'https://api.github.com/user/repos';
    const options = {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const body = {
      name: repoName,
      description: repoDescription,
      private: privateRepo
    };

    try {
      const response = await axios.post(url, body, options);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  async addCollaborator(req: Request, res: Response): Promise<void> {
    const { accessToken, owner, repo, username } = req.body;

    const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`;
    const options = {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.put(url, {}, options);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }
}

export default new RepoController();
