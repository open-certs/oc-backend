const express = require('express');
const router = express.Router();
const { getGithubRepo } = require('./../controllers/project.controller');
const { validate } = require('../helpers/jwt.helper');
const {
    githubCertificateValidation
} = require('../validations/project.validation');

router.post(
    '/github/:owner/:repo',
    validate,
    githubCertificateValidation,
    getGithubRepo
);

const projectRouter = (app) => {
    app.use('/project', router);
};

module.exports = projectRouter;
