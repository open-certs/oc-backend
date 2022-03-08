require('./enviroment.test');

const user = require('../src/controllers/user.controler');

test('should return profile when called with proper token', async () => {
    const mReq = {
        user: {
            name: 'Test User',
            username: 'Test-User',
            profileUrl: 'https://github.com/Test-User',
            avatar: 'https://avatars.githubusercontent.com/u/99425406?s=200&v=4',
            kind: 'github',
            accessToken: 'accessToken'
        }
    };
    const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeUndefined();
            expect(x.user).toBeTruthy();
            expect(x.user.username).toBe(mReq.user.username);
        })
    };
    const mNext = jest.fn();

    await user.profile(mReq, mRes, mNext);
});
