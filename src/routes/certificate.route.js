const express = require('express');
const {
    generateGithubCert,
    getCert
} = require('../controllers/certificate.controller');
const certificateValidation = require('../validations/certificate.validation');
const { validate } = require('../helpers/jwt.helper');
const { ValidateCaptcha } = require('../helpers/recaptcha.helper');
const router = express.Router();

router.post(
    '/github/:owner/:repo',
    validate,
    ValidateCaptcha,
    certificateValidation.create,
    generateGithubCert
);
router.get('/:id', getCert);

const certificateRouter = (app) => {
    app.use('/certificate', router);
};

module.exports = certificateRouter;
