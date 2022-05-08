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
const { checkUser } = require('../helpers/user.helper');

router.post(
    '/github/:owner/:repo',
    validate,
    githubProjectValidation,
    checkUser('github'),
    getGitHubProjectToken
);

router.post(
    '/gitlab/:id',
    validate,
    gitlabProjectValidation,
    checkUser('gitlab'),
    getGitLabProjectToken
);

router.post(
    '/bitbucket/:workspace/:repo',
    validate,
    bitBucketProjectValidation,
    checkUser('bitbucket'),
    getBitBucketProjectToken
);

const projectRouter = (app) => {
    app.use('/project', router);
};

module.exports = projectRouter;
