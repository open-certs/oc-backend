const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const router = (app) => {
    userRouter(app);
    authRouter(app);
};

module.exports = router;
