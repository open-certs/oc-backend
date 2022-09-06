const express = require('express');
const { GITHUB_SCOPES } = require('../config/constants');
const { GITLAB_SCOPES } = require('../config/constants');
const { BITBUCKET_SCOPES } = require('../config/constants');
const { login, errorHandler } = require('../controllers/auth.controller');
const router = express.Router();
const passport = require('../helpers/passport.helper');

/* GET users github. */
router.get(
    '/github/',
    passport.authenticate('github', {
        scope: GITHUB_SCOPES
    }),
    errorHandler
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        scope: GITHUB_SCOPES,
        failureRedirect: 'http://localhost:3000/'
    }),
    login
);

/* GET users bitbucket */
router.get(
    '/bitbucket',
    passport.authenticate('bitbucket', {
        scope: BITBUCKET_SCOPES
    }),
    errorHandler
);

router.get(
    '/bitbucket/callback',
    passport.authenticate('bitbucket', {
        scope: BITBUCKET_SCOPES
    }),
    login
);

/* GET users Gitlab */
router.get(
    '/gitlab',
    passport.authenticate('gitlab', {
        scope: GITLAB_SCOPES.join(' ')
    }),
    errorHandler
);

router.get(
    '/gitlab/callback',
    passport.authenticate('gitlab', {
        scope: GITLAB_SCOPES.join(' ')
    }),
    login
);

const authRouter = (app) => {
    app.use('/auth', router);
};
module.exports = authRouter;
