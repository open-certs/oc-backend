const express = require('express');
const { GITHUB_SCOPES } = require('../config/constants');
const { BITBUCKET_SCOPES } = require('../config/constants');
const { login } = require('../controllers/auth.controller');
const router = express.Router();
const passport = require('../helpers/passport.helper');


/* GET users listing. */
router.get(
    '/github/',
    passport.authenticate('github', {
        scope: GITHUB_SCOPES
    }),
    login
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
    login
);

router.get(
    '/bitbucket/callback',
    passport.authenticate('bitbucket',{
        scope: BITBUCKET_SCOPES
    }),
    login
);

const authRouter = (app) => {
    app.use('/auth', router);
};
module.exports = authRouter;
