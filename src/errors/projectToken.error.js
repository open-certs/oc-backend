const CustomError = require('./custom.error');

class ProjectTokenError extends CustomError {
    constructor(message) {
        super(message, 404);
        this.name = 'Project token error';
        this.type = 'ProjectTokenError';
    }
}
module.exports = ProjectTokenError;
