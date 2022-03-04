const { validate, Joi } = require('express-validation');

const create = {
    body: Joi.object({
        includeRepositoryImage: Joi.boolean().strict(),
        includeUserImage: Joi.boolean().strict()
    })
};

exports.create = validate(create, {}, {});
