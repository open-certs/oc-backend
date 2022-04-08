require('../enviroment.test');

const AuthenticationError = require('../../src/errors/authentication.error');
const crypto = require('../../src/helpers/crypto.helper');

test('should return the correct plainText when decrypted using valid encrypted text', () => {
    const plainText = 'openCerts';
    const encryptedText = crypto.encrypt(plainText);

    const decryptedText = crypto.decrypt(encryptedText);

    expect(decryptedText).toBe(plainText);
});

test('should throw error while decrypting invalid encrypted text', () => {
    const randomText = 'openCerts';
    let thrownError = null;

    try {
        crypto.decrypt(randomText);
    } catch (e) {
        thrownError = e;
        console.log(e);
    }

    expect(thrownError).toBeTruthy();
    expect(thrownError instanceof AuthenticationError).toBeTruthy();
});

test('should throw error while decrypting invalid formatted encrypted text', () => {
    const randomText = 'open|1234123412341234';
    let thrownError = null;

    try {
        crypto.decrypt(randomText);
    } catch (e) {
        thrownError = e;
        console.log(e);
    }

    expect(thrownError).toBeTruthy();
    expect(thrownError instanceof AuthenticationError).toBeTruthy();
});
