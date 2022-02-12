const { sign } = require('../helpers/jwt.helper');

exports.login = (req, res) => {
    try {
        const user = req.user;
        delete user._raw;
        const token = sign({ user });
        return res.status(200).json({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(200).json({
            error: String(e)
        });
    }
};
