const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.getUserData = async (req, res) => {
    try {
        const response = await fetch("https://api.github.com/user", {
            method: 'GET',
            headers: {
                'Authorization': req.get('Authorization')
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};