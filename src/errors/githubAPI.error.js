const CustomError = require('./custom.error');

class GithubAPIError extends CustomError {
    constructor(message, status) {
        super(message, status);
        this.name = 'Github API Error';
        this.type = 'GithubAPIError';
    }
}
module.exports = GithubAPIError;
