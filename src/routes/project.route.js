const express = require('express');
const router = express.Router();
const {
    getGitHubProjectToken,
    getGitLabProjectToken
} = require('./../controllers/project.controller');
const { validate } = require('../helpers/jwt.helper');
const {
    githubProjectValidation,
    gitlabProjectValidation
} = require('../validations/project.validation');

router.post(
    '/github/:owner/:repo',
    validate,
    githubProjectValidation,
    getGitHubProjectToken
);

router.post(
    '/gitlab/:id',
    validate,
    gitlabProjectValidation,
    getGitLabProjectToken
);

const projectRouter = (app) => {
    app.use('/project', router);
};

module.exports = projectRouter;
