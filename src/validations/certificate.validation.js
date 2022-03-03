const { validate, Joi } = require('express-validation');

const create = {
    body: Joi.object({
        includeRepositoryImage: Joi.boolean().strict().required(),
        includeUserImage: Joi.boolean().strict().required()
    })
};

exports.create = validate(create, {}, {});
