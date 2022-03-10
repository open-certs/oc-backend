const { validate, Joi } = require('express-validation');
const { validObjectId } = require('../helpers/objectId.helper');

const create = {
    body: Joi.object({
        includeRepositoryImage: Joi.boolean().strict(),
        includeUserImage: Joi.boolean().strict()
    })
};

const objectId = Joi.string().custom((value, helper) => {
    if (!validObjectId(value)) {
        return helper.message('Object id is invalid');
    } else {
        return true;
    }
});

exports.create = validate(create, {}, {});

exports.certIdValidate = validate(
    {
        params: Joi.object({
            id: objectId.required()
        })
    },
    {},
    {}
);
