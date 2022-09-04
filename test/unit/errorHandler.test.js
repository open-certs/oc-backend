require('../enviroment.test');
const { errorHandler } = require('../../src/helpers/errorhandler.helper');
const NotFoundError = require('../../src/errors/notFound.error');
const CustomError = require('../../src/errors/custom.error');
const { ValidationError } = require('express-validation');
const AuthenticationError = require('../../src/errors/authentication.error');
const CurrentlyUnavailableError = require('../../src/errors/currentlyUnavailable.error');

test('should return customError when a customError is found', () => {
    const mReq = {};
    const mError = new CustomError('testing', 401);
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(mError.status);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe(mError.type);
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return NotFoundError when a NotFoundError is found', () => {
    const mReq = {};
    const mError = new NotFoundError('testing');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(404);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe(mError.type);
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return AuthenticationError when a NotFoundError is found', () => {
    const mReq = {};
    const mError = new AuthenticationError('testing');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(401);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe(mError.type);
            expect(x.error.logout).toBeTruthy();
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return CurrentlyUnavailableError when a NotFoundError is found', () => {
    const mReq = {};
    const mError = new CurrentlyUnavailableError('testing');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(503);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe(mError.type);
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return validationError with details when a validationError is found', () => {
    const mReq = {};
    const mError = new ValidationError({}, {});
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(400);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe('ValidationError');
            expect(x.error.details).toBeTruthy();
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return Error with trace when a Error is found in development', () => {
    const mReq = {
        app: {
            get: jest.fn(() => 'development')
        }
    };
    const mError = new Error('testing error');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(500);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe('Error');
            expect(x.error.trace).toBeTruthy();
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should return Error without trace when a error is found in production', () => {
    const mReq = {
        app: {
            get: jest.fn(() => 'production')
        }
    };
    const mError = new Error('testing error');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(500);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe('Error');
            expect(x.error.trace).toBeUndefined();
            expect(x.error.message).toBe('Something went wrong');
        })
    };
    const mNext = jest.fn();

    errorHandler(mError, mReq, mRes, mNext);
});

test('should call handleError with getResponse when a custom error occurs', () => {
    const mReq = {};
    const mError = new CustomError('testing error');
    const handleError = jest.spyOn(mError, 'handleError');
    const getResponse = jest.spyOn(mError, 'getResponse');
    const mRes = {
        status: jest.fn((x) => {
            expect(x).toBe(mError.status);
            return mRes;
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeTruthy();
            expect(x.error.type).toBe('CustomError');
        })
    };
    const mNext = jest.fn();
    errorHandler(mError, mReq, mRes, mNext);
    expect(handleError).toBeCalledTimes(1);
    expect(getResponse).toBeCalledTimes(1);
});
