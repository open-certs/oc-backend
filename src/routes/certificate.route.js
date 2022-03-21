const express = require('express');
const {
    generateCertificate,
    getCert,
    getCertDetails
} = require('../controllers/certificate.controller');
const certificateValidation = require('../validations/certificate.validation');
const { validate } = require('../helpers/jwt.helper');
const { validateReCaptcha } = require('../helpers/recaptcha.helper');
const router = express.Router();
const { validateProject } = require('../helpers/project.jwt.helper');

const { certIdValidate } = require('../validations/certificate.validation');

router.post(
    '/',
    validate,
    validateProject,
    validateReCaptcha,
    certificateValidation.create,
    generateCertificate
);
router.get('/:id', getCert);

router.get('/certDetails/:id', certIdValidate, getCertDetails);

const certificateRouter = (app) => {
    app.use('/certificate', router);
};

module.exports = certificateRouter;
