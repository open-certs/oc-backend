require('../enviroment.test');

const data = {};

jest.mock('axios', () => {
    return {
        post: () => {
            return new Promise((resolve, reject) => {
                if (data.error) {
                    return reject(data.error);
                }
                resolve(data.body);
            });
        }
    };
});

const CustomError = require('../../src/errors/custom.error');
const RecaptchaError = require('../../src/errors/recaptcha.error');
const recaptcha = require('../../src/helpers/recaptcha.helper');

beforeAll(() => {
    process.env.VALIDATE_RECAPTCHA = 'YES';
});

afterEach(() => {
    data.error = undefined;
    data.body = undefined;
});

test('should call next middleware when recaptcha is validated successfully', async () => {
    data.body = {
        data: {
            success: true
        }
    };
    const mReq = {
        headers: {
            recaptcha: 'token'
        }
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).not.toBeTruthy();
    });

    recaptcha.validateReCaptcha(mReq, mRes, mNext);
});

test('should throw recaptcha error when recaptcha token is missing', async () => {
    const mReq = {
        headers: {}
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(err instanceof RecaptchaError).toBeTruthy();
    });

    recaptcha.validateReCaptcha(mReq, mRes, mNext);
});

test('should throw recaptcha error when recaptcha validation result is false', async () => {
    data.body = {
        data: {
            success: false
        }
    };
    const mReq = {
        headers: {
            recaptcha: 'token'
        }
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(err instanceof RecaptchaError).toBeTruthy();
    });

    recaptcha.validateReCaptcha(mReq, mRes, mNext);
});

test('should throw custom error when axios request fails', async () => {
    data.error = new Error('http error');

    const mReq = {
        headers: {
            recaptcha: 'token'
        }
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(err instanceof CustomError).toBeTruthy();
    });

    recaptcha.validateReCaptcha(mReq, mRes, mNext);
});

test('should not validate recaptcha when validate recaptcha is NO', async () => {
    process.env.VALIDATE_RECAPTCHA = 'NO';

    const mReq = {
        headers: {}
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).not.toBeTruthy();
    });

    recaptcha.validateReCaptcha(mReq, mRes, mNext);
});
