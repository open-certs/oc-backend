exports.profile = (req, res) => {
    try {
        const user = req.user;
        delete user._json;
        delete user.accessToken;
        return res.status(200).json({
            user
        });
    } catch (e) {
        console.log(e);
        res.status(200).json({
            error: String(e)
        });
    }
};
