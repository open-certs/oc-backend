const { validate, Joi } = require('express-validation');

const create = {
    body: Joi.object({
        includeRepositoryImage: Joi.boolean().required(),
        includeUserImage: Joi.boolean().required()
    })
}

exports.create = validate(create, {}, {});