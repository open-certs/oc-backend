class AuthenticationError extends Error {
    constructor(message, status = 401) {
        super(message);
        this.name = 'Authentication Error';
        this.status = status;
        this.type = 'Authentication Error';
    }
    getResponse() {
        return {
            message: this.message,
            type: this.type,
            name: this.name,
            logout: true
        };
    }
}
module.exports = AuthenticationError;
