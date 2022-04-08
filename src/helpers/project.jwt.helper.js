const jwt = require('jsonwebtoken');
const configConsts = require('../config/constants');
const ProjectTokenError = require('../errors/projectToken.error');

exports.sign = (payload) => {
    return jwt.sign(payload, process.env.PROJECT_TOKEN_SECRET, {
        expiresIn: configConsts.PROJECT_TOKEN_EXPIRY_HOURS + 'h'
    });
};

exports.verify = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.PROJECT_TOKEN_SECRET,
            function (err, decoded) {
                if (err) {
                    return reject(err.message);
                } else {
                    resolve(decoded);
                }
            }
        );
    });

exports.validateProject = (req, res, next) => {
    const token = req.headers['project-token'];
    // console.log(token);

    if (token) {
        exports
            .verify(token)
            .then((project) => {
                req.project = project;
                next();
            })
            .catch((err) => {
                next(new ProjectTokenError(String(err)));
            });
    } else {
        next(new ProjectTokenError('No project token supplied'));
    }
};
