const jwt = require('jsonwebtoken');
const configConsts = require('../config/constants');
const CustomError = require('../errors/custom.error');

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
                req.user = user;
                next();
            })
            .catch((err) => {
                // console.log(err);
                // return res.status(200).json({
                //     error: err,
                //     logout: true
                // });
                next(new CustomError(String(err)));
            });
    } else {
        // return res.status(200).json({
        //     error: 'No token supplied',
        //     logout: true
        // });
        next(new CustomError('No token supplied'));
    }
};
