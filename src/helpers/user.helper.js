const AuthenticationError = require('../errors/authentication.error');

exports.checkUser = (type) => {
    return (req, res, next) => {
        if (req.user.kind !== type) {
            return next(
                new AuthenticationError(
                    'Login Credentials not found for current service!'
                )
            );
        }
        return next();
    };
};
