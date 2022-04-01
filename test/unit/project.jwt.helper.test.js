require('../enviroment.test');
const ProjectTokenError = require('../../src/errors/projectToken.error');
const projectHelper = require('../../src/helpers/project.jwt.helper');

test('should return original project data after verifying signed token', async () => {
    const sampleData = {
        projectId: '123'
    };

    const token = projectHelper.sign(sampleData);
    const decryptedData = await projectHelper.verify(token);

    expect(decryptedData).toBeTruthy();
    expect(decryptedData.projectId).toBe(sampleData.projectId);
});

test('should validate project token and call the next middleware', async () => {
    const sampleData = {
        projectId: '123'
    };

    const token = projectHelper.sign(sampleData);
    const mReq = {
        headers: {
            'project-token': token
        }
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).not.toBeTruthy();
        expect(mReq.project).toBeTruthy();
        expect(mReq.project.projectId).toBe(sampleData.projectId);
    });

    projectHelper.validateProject(mReq, mRes, mNext);
});

test('should call mNext with error when no token is supplied', async () => {
    const mReq = {
        headers: {}
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(mReq.project).not.toBeTruthy();
        expect(err instanceof ProjectTokenError).toBeTruthy();
    });

    projectHelper.validateProject(mReq, mRes, mNext);
});

test('should call mNext with error when invalid token is supplied', async () => {
    const mReq = {
        headers: {
            'project-token': 'random-text'
        }
    };

    const mRes = {};

    const mNext = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(mReq.project).not.toBeTruthy();
        expect(err instanceof ProjectTokenError).toBeTruthy();
    });

    projectHelper.validateProject(mReq, mRes, mNext);
});
