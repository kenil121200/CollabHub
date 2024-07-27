import { Request, Response } from 'express';
import axios from 'axios';

const CLIENT_ID = 'Ov23liNMTa93HINXy0z7';
const CLIENT_SECRET = 'a5b32b5f01e01a65b2ebbdd106f396becf8c4347';

class AuthController {
  constructor() {}

  async getAccessToken(req: Request, res: Response): Promise<void> {
    const code = req.query.code as string;
    console.log(req.query);
    if (!code) {
      console.log('Missing authorization code');
      
      res.status(400).json({ error: 'Missing authorization code' });
      return;
    }

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    });

    try {
      const response = await axios.post(
        `https://github.com/login/oauth/access_token?${params.toString()}`,
        {},
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      console.log(response.data);
      if (response.data.error) {
        res.status(400).json(response.data);
      } else {
        res.status(200).json(response.data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: (error as any).response?.data });
    }
  }
}

export default new AuthController();
