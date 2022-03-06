require('./enviroment.test');

const certificateController = require('../src/controllers/certificate.controller');
const Certificate = require('../src/models/certificate.model');

test('should return certificate details when valid certificate id is provided', async () => {
    const existingCertificate = await Certificate.findOne({});
    const mReq = {
        params: {
            id: String(existingCertificate._id)
        }
    };
    const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((x) => {
            expect(x).toBeTruthy();
            expect(x.error).toBeUndefined();
            expect(String(x.certificate._id)).toBe(
                String(existingCertificate._id)
            );
        })
    };

    await certificateController.getCertDetails(mReq, mRes);
});
