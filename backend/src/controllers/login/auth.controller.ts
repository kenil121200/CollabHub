import { Request, Response } from 'express';
import axios from 'axios';

const CLIENT_ID = 'Ov23liNMTa93HINXy0z7';
const CLIENT_SECRET = 'a5b32b5f01e01a65b2ebbdd106f396becf8c4347';

class AuthController {
  constructor() {}

  async getAccessToken(req: Request, res: Response): Promise<void> {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code as string,
    });

    try {
      const response = await axios.post(`https://github.com/login/oauth/access_token?${params.toString()}`, {}, {
        headers: {
          'Accept': 'application/json',
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new AuthController();
