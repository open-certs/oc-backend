const { validate, Joi } = require('express-validation');

const githubCertificateValidation = {
    params: Joi.object({
        owner: Joi.string().strict().required(),
        repo: Joi.string().strict().required()
    })
};

exports.githubCertificateValidation = validate(
    githubCertificateValidation,
    {},
    {}
);
