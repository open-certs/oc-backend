class CustomError extends Error {
    constructor(message, status = 200) {
        super(message);
        this.name = 'Expected error';
        this.status = status;
        this.type = 'CustomError';
    }
    getResponse() {
        return { message: this.message, type: this.type, name: this.name };
    }
}
module.exports = CustomError;
