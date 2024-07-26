const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.createRepo = async (req, res) => {
  const { accessToken, repoName, repoDescription, privateRepo } = req.body;

  const url = 'https://api.github.com/user/repos';
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: repoName,
      description: repoDescription,
      private: privateRepo
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.message);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCollaborator = async (req, res) => {
  const { accessToken, owner, repo, username } = req.body;

  const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`;
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.message);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};