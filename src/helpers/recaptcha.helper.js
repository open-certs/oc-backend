const axios = require('axios');
const CustomError = require('../errors/custom.error');

exports.validateReCaptcha = (req, res, next) => {
    const token = req.headers['recaptcha'];
    if (process.env.VALIDATE_RECAPTCHA == 'NO') {
        return next();
    }
    if (!token) {
        // return res.json({ error: 'recaptcha token not found!' });
        return next(new CustomError('Recaptcha token not provided!'));
    }

    // verify url
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRECT_KEY}&response=${token}`;

    // making request to verify url
    axios
        .post(verifyUrl)
        .then((body) => {
            // err
            if (!body.data.success) {
                // return res.json({
                //     error: 'captcha verification failed!'
                // });
                return next(new CustomError('Recaptcha verification failed!'));
            }
            // success
            next();
        })
        .catch((err) => {
            // return res.json({
            //     error: 'captcha verification failed!'
            // });
            console.log(err);
            return next(new CustomError('captcha verification failed!'));
        });
};
