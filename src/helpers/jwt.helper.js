const jwt = require('jsonwebtoken');
const configConsts = require('../config/constants');
const AuthenticationError = require('../errors/authentication.error');
const { decrypt } = require('./crypto.helper');

exports.sign = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: configConsts.AUTH_TOKEN_EXPIRY_HOURS + 'h'
    });
};

exports.verify = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return reject(err.message);
            } else {
                resolve(decoded);
            }
        });
    });

exports.validate = (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token);

    if (token) {
        exports
            .verify(token)
            .then((user) => {
                user.accessToken = decrypt(user.accessToken);
                req.user = user;
                next();
            })
            .catch((err) => {
                // console.log(err);
                // return res.status(200).json({
                //     error: err,
                //     logout: true
                // });
                //next(new CustomError(String(err)));
                next(new AuthenticationError(String(err)));
            });
    } else {
        // return res.status(200).json({
        //     error: 'No token supplied',
        //     logout: true
        // });
        //next(new CustomError('No token supplied'));
        next(new AuthenticationError('No Token Supplied'));
    }
};
