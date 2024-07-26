// var express = require('express');
// var cors = require('cors');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// var bodyParser = require('body-parser');

// const CLIENT_ID = 'Ov23liNMTa93HINXy0z7';
// const CLIENT_SECRET = 'a5b32b5f01e01a65b2ebbdd106f396becf8c4347';

// var app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.get('/getAccessToken', async function (req, res) {

//     const params = new URLSearchParams({
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         code: req.query.code
//     });

//     await fetch("https://github.com/login/oauth/access_token?" + params.toString(), {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then((response) => {
//         return response.json()
//     }).then((data) => {
//         res.json(data);
//     });
// });

// app.get('/getUserData', async function (req, res) {

//     await fetch("https://api.github.com/user", {
//         method: 'GET',
//         headers: {
//             'Authorization': req.get('Authorization')
//         }
//     }).then((response) => {
//         return response.json()
//     }).then((data) => {
//         res.json(data);
//     });
// });


// app.listen(4000, function () {
//   console.log('CORS-enabled web server listening on port 4000');
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const repoRoutes = require('./routes/repoRoutes');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/repo', repoRoutes);

app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});