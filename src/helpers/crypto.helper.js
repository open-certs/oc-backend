const crypto = require('crypto');
const CustomError = require('../errors/custom.error');

const hash = (plainText) => {
    const hashedText = crypto
        .createHash('sha256')
        .update(String(plainText))
        .digest('base64');
    return hashedText;
};

const algorithm = 'aes-256-ctr';
const secretKey = hash(process.env.ENCRYPTION_SECRET_KEY).substring(0, 32);

const encrypt = (text) => {
    const hashedText = hash(text);
    const dataWord = text + '|' + hashedText;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(dataWord), cipher.final()]);

    return encrypted.toString('hex') + '|' + iv.toString('hex');
};

const decrypt = (cipherText) => {
    const data = cipherText.split('|');
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(data[1], 'hex')
    );

    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(data[0], 'hex')),
        decipher.final()
    ]);

    const decryptedString = decrpyted.toString();

    const dataWord = decryptedString.split('|');
    const newHash = hash(dataWord[0]);
    if (newHash === dataWord[1]) {
        return dataWord[0];
    } else {
        throw new CustomError('Decryption of access token failed');
    }
};

module.exports = {
    encrypt,
    decrypt
};
