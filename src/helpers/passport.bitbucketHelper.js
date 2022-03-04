const passport = require('passport');
const BitbucketStrategy = require('passport-bitbucket-oauth2');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(
    new BitbucketStrategy({
        /*callbackURL:`${process.env.BASE_URL}/auth/bitbucket/callback`,*/
        clientID: process.env.BITBUCKET_CLIENT_ID,
        clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
        profileWithEmail: true,
        apiVersion: '2.0'
        
    }
    , function (accessToken, refreshToken, profile, done) {
        done(null, { accessToken, ...profile, kind: 'bitbucket' });
    })
);

module.exports = passport;