const AuthenticationError = require('../../src/errors/authentication.error');
const { checkUser } = require('../../src/helpers/user.helper');

test('should forward control to next controller when given type and user type is same', async () => {
    const mReq = {
        user: {
            kind: 'github'
        }
    };
    const mRes = {};
    const mNext = jest.fn((x) => {
        expect(x).not.toBeTruthy();
    });

    checkUser('github')(mReq, mRes, mNext);

    expect(mNext).toBeCalledTimes(1);
});

test('should not forward control to next controller when given type and user type is not same', async () => {
    const mReq = {
        user: {
            kind: 'github'
        }
    };
    const mRes = {};
    const mNext = jest.fn((x) => {
        expect(x).toBeTruthy();
        expect(x instanceof AuthenticationError).toBeTruthy();
    });

    checkUser('gitlab')(mReq, mRes, mNext);

    expect(mNext).toBeCalledTimes(1);
});
