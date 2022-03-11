const express = require('express');
const {
    generateGithubCert,
    getCert,
    getCertDetails
} = require('../controllers/certificate.controller');
const certificateValidation = require('../validations/certificate.validation');
const { validate } = require('../helpers/jwt.helper');
const { validateReCaptcha } = require('../helpers/recaptcha.helper');
const router = express.Router();

const { certIdValidate } = require('../validations/certificate.validation');

router.post(
    '/github/:owner/:repo',
    validate,
    validateReCaptcha,
    certificateValidation.create,
    generateGithubCert
);
router.get('/:id', getCert);

router.get('/certDetails/:id', certIdValidate, getCertDetails);

const certificateRouter = (app) => {
    app.use('/certificate', router);
};

module.exports = certificateRouter;
