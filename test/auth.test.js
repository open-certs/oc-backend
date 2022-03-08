require('./enviroment.test');

const auth = require('../src/controllers/auth.controller');

test('should return valid jwt token when recieved verified github user', async () => {
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
        redirect: jest.fn((x) => {
            const url = new URL(x);
            const frontEndUrl = new URL(process.env.FRONTEND_URL);
            expect(url.hostname).toBe(frontEndUrl.hostname);
            expect(url.pathname).toBe('/recievedToken.html');
            expect(url.searchParams.get('token')).toBeTruthy();
        }),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeUndefined();
        })
    };
    const mNext = jest.fn();

    await auth.login(mReq, mRes, mNext);
});
