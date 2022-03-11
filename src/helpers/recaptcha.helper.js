const axios = require('axios');

exports.validateReCaptcha = (req, res, next) => {
    const token = req.headers['recaptcha'];
    if (process.env.VALIDATE_RECAPTCHA == 'NO') {
        return next();
    }
    if (!token) {
        return res.json({ error: 'recaptcha token not found!' });
    }

    // verify url
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRECT_KEY}&response=${token}`;

    // making request to verify url
    axios
        .post(verifyUrl)
        .then((body) => {
            // err
            if (!body.data.success) {
                return res.json({
                    error: 'captcha verification failed!'
                });
            }
            // success
            next();
        })
        .catch(() => {
            return res.json({
                error: 'captcha verification failed!'
            });
        });
};
