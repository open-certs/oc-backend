const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = crypto
    .createHash('sha256')
    .update(String(process.env.ENCRYPTION_SECRET_KEY))
    .digest('base64')
    .substring(0, 32);

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex') + '|' + iv.toString('hex');
};

const decrypt = (hash) => {
    const data = hash.split('|');
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(data[1], 'hex')
    );

    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(data[0], 'hex')),
        decipher.final()
    ]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};
