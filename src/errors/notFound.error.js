const CustomError = require('./custom.error');

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
        this.name = 'Not Found Error';
        this.type = 'NotFoundError';
    }
}
module.exports = NotFoundError;
