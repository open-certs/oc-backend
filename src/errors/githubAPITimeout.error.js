const CustomError = require('./custom.error');

class GithubAPITimeoutError extends CustomError {
    constructor(message) {
        super(message, 503);
        this.name = 'Github API Timeout Error';
        this.type = 'GithubAPITimeoutError';
    }
}
module.exports = GithubAPITimeoutError;
