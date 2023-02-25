const express = require('express');

const router = express.Router();

const authenticationMiddleWare = require('../middleware/auth');
const { login, dashboard } = require('../controllers/main');
router.route('/login').post(login);
router.route('/dashboard').get(authenticationMiddleWare, dashboard);

module.exports = router;
