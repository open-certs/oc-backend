const passport = require('passport');
const GitHubStrategy = require('passport-github2');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, { accessToken, ...profile, kind: 'github' });
        }
    )
);

module.exports = passport;
