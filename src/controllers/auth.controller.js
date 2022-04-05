const { encrypt } = require('../helpers/crypto.helper');
const { sign } = require('../helpers/jwt.helper');

exports.login = (req, res, next) => {
    try {
        const user = req.user;
        user.accessToken = encrypt(user.accessToken);
        const token = sign(user);
        delete user.accessToken;
        return res.redirect(
            `${process.env.FRONTEND_URL}/recievedToken.html?token=${token}`
        );
        // return res.status(200).json({
        //     user,
        //     token
        // });
    } catch (e) {
        next(e);
    }
};
