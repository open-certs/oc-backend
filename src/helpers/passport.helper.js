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
            callbackURL: `${process.env.BASE_URL}/auth/github/callback`
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, {
                accessToken,
                email: profile.email,
                name: profile.displayName,
                username: profile.username,
                profileUrl: profile.profileUrl,
                avatar: profile.photos[0].value,
                kind: 'github'
            });
        }
    )
);

module.exports = passport;
