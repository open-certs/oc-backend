const CustomError = require('./custom.error');

class PassportError extends CustomError {
    constructor(message) {
        super(message, 401);
        this.name = 'Passport Error';
        this.type = 'PassportError';
    }

    handleError(res) {
        return res.redirect(
            `${process.env.FRONTEND_URL}/recievedToken.html?errorType=${this.type}`
        );
    }
}
module.exports = PassportError;
