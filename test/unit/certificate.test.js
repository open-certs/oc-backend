require('../enviroment.test');
require('../database.test');
const { Types } = require('mongoose');
const certificateController = require('../../src/controllers/certificate.controller');
const Certificate = require('../../src/models/certificate.model');

test('should return certificate details when valid certificate id is provided', async () => {
    const certificate = new Certificate({
        userGithubId: 'test-open-certs-userId',
        userName: 'test-open-certs-userId',
        projectRepo: 'open-certs',
        projectOwner: 'open-certs',
        commitCount: 0,
        pullRequestCount: 0,
        lastContributionDate: new Date(),
        images: []
    });
    await certificate.save();
    const mReq = {
        params: {
            id: String(certificate._id)
        }
    };
    const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeUndefined();
            expect(String(x.certificate._id)).toBe(String(certificate._id));
        })
    };

    await certificateController.getCertDetails(mReq, mRes);
});

test('should return no certificate details when non-existing certificate id is provided', async () => {
    const mReq = {
        params: {
            id: new Types.ObjectId()
        }
    };

    const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeUndefined();
            expect(x.certificate).toBe(null);
        })
    };

    await certificateController.getCertDetails(mReq, mRes);
});
