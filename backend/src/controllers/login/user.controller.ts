// Author: Kenil Patel

import { Request, Response } from 'express';
import axios from 'axios';
import UserServices from '../../services/user/user.services';

class UserController {
  constructor() {}

  async getUserData(req: Request, res: Response): Promise<void> {
    try {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          'Authorization': req.get('Authorization') || ''
        }
      });
      const data = response.data;
      
      // Extract login and name
      const { login, name } = data;

      // Store in the database
      await UserServices.setUser({ username: login, name });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
