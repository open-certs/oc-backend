const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;

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

passport.use(
    new BitbucketStrategy(
        {
            callbackURL: `${process.env.BASE_URL}/auth/bitbucket/callback`,
            clientID: process.env.BITBUCKET_CLIENT_ID,
            clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
            profileWithEmail: true,
            apiVersion: '2.0'
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, {
                accessToken,
                email: '',
                name: profile.displayName,
                username: profile.username,
                profileUrl: profile.profileUrl,
                avatar: profile._json.links.avatar.href,
                kind: 'bitbucket'
            });
        }
    )
);

module.exports = passport;
