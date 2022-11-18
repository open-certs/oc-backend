const express = require('express');
const { GITHUB_SCOPES } = require('../config/constants');
const { GITLAB_SCOPES } = require('../config/constants');
const { BITBUCKET_SCOPES } = require('../config/constants');
const { login } = require('../controllers/auth.controller');
const router = express.Router();
const passport = require('../helpers/passport.helper');

/* GET users github. */
router.get(
    '/github/',
    passport.authenticate('github', {
        scope: GITHUB_SCOPES,
        session: false
    })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        scope: GITHUB_SCOPES,
        failureRedirect: 'http://localhost:3000/',
        session: false
    }),
    login
);

/* GET users bitbucket */
router.get(
    '/bitbucket',
    passport.authenticate('bitbucket', {
        scope: BITBUCKET_SCOPES,
        session: false
    })
);

router.get(
    '/bitbucket/callback',
    passport.authenticate('bitbucket', {
        scope: BITBUCKET_SCOPES,
        session: false
    }),
    login
);

/* GET users Gitlab */
router.get(
    '/gitlab',
    passport.authenticate('gitlab', {
        scope: GITLAB_SCOPES.join(' '),
        session: false
    })
);

router.get(
    '/gitlab/callback',
    passport.authenticate('gitlab', {
        scope: GITLAB_SCOPES.join(' '),
        session: false
    }),
    login
);

router.use(passport.errorFormatter);

const authRouter = (app) => {
    app.use('/auth', router);
};
module.exports = authRouter;
