const CustomError = require('./custom.error');

class AuthenticationError extends CustomError {
    constructor(message, status = 401) {
        super(message, status);
        this.name = 'Authentication Error';
        this.type = 'Authentication Error';
    }
}
module.exports = AuthenticationError;
