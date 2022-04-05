const CustomError = require('./custom.error');

class RecaptchaError extends CustomError {
    constructor(message) {
        super(message, 403);
        this.name = 'Recaptcha error';
        this.type = 'RecaptchaError';
    }
}
module.exports = RecaptchaError;
