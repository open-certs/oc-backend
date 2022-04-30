const { validate, Joi } = require('express-validation');

const githubProjectValidation = {
    params: Joi.object({
        owner: Joi.string().strict().required(),
        repo: Joi.string().strict().required()
    })
};

const gitlabProjectValidation = {
    params: Joi.object({
        id: Joi.number().required()
    })
};

exports.githubProjectValidation = validate(githubProjectValidation, {}, {});
exports.gitlabProjectValidation = validate(gitlabProjectValidation, {}, {});
