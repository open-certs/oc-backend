const CustomError = require('./custom.error');

class PassportError extends CustomError {
    constructor(message, status) {
        super(message, status);
        this.name = 'Passport Error';
        this.type = 'PassportError';
    }

    handleError(res) {
        return res.redirect(
            `${process.env.FRONTEND_URL}/recievedToken.html?errorType=${this.type}&errorMessage=${this.message}`
        );
    }
}
module.exports = PassportError;
