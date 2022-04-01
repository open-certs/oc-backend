exports.profile = (req, res, next) => {
    try {
        const user = req.user;
        delete user._json;
        delete user.accessToken;
        return res.status(200).json({
            user
        });
    } catch (e) {
        next(e);
    }
};
