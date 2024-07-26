import { Request, Response } from 'express';
import axios from 'axios';

class UserController {
  constructor() {}

  async getUserData(req: Request, res: Response): Promise<void> {
    try {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          'Authorization': req.get('Authorization') || ''
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
