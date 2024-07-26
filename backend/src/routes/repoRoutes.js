const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');

router.post('/createRepo', repoController.createRepo);
router.post('/addCollaborator', repoController.addCollaborator);

module.exports = router;