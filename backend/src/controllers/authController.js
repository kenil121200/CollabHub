const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const CLIENT_ID = 'Ov23liNMTa93HINXy0z7';
const CLIENT_SECRET = 'a5b32b5f01e01a65b2ebbdd106f396becf8c4347';

exports.getAccessToken = async (req, res) => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code
    });

    try {
        const response = await fetch(`https://github.com/login/oauth/access_token?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};