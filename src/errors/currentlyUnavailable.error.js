const CustomError = require('./custom.error');

class CurrentlyUnavailableError extends CustomError {
    constructor(message) {
        super(message, 503);
        this.name = 'Currently Unavailable Error';
        this.type = 'CurrentlyUnavailableError';
    }
}
module.exports = CurrentlyUnavailableError;
