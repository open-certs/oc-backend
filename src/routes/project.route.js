const express = require('express');
const router = express.Router();
const {
    getGitHubProjectToken,
    getGitLabProjectToken,
    getBitBucketProjectToken
} = require('./../controllers/project.controller');
const { validate } = require('../helpers/jwt.helper');
const {
    githubProjectValidation,
    gitlabProjectValidation,
    bitBucketProjectValidation
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

router.post(
    '/bitbucket/:workspace/:repo',
    validate,
    bitBucketProjectValidation,
    getBitBucketProjectToken
);

const projectRouter = (app) => {
    app.use('/project', router);
};

module.exports = projectRouter;
