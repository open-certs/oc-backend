const express = require('express');
const { generateGithubCert } = require('../controllers/certificate.controller');
const { validate } = require('../helpers/jwt.helper');
const router = express.Router();

router.post('/github/:owner/:repo', validate, generateGithubCert);

const certificateRouter = (app) => {
    app.use('/certificate', router);
};

module.exports = certificateRouter;
