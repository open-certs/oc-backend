const express = require('express');
const {
    generateGithubCert,
    getCert
} = require('../controllers/certificate.controller');
const certificateValidation = require('../validations/certificate.validation');
const { validate } = require('../helpers/jwt.helper');
const router = express.Router();

router.post(
    '/github/:owner/:repo',
    validate,
    certificateValidation.create,
    generateGithubCert
);
router.get('/:id', getCert);

const certificateRouter = (app) => {
    app.use('/certificate', router);
};

module.exports = certificateRouter;
