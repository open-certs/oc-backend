const authRouter = require('./auth.route');
const certificateRouter = require('./certificate.route');
const userRouter = require('./users.route');
const router = (app) => {
    userRouter(app);
    authRouter(app);
    certificateRouter(app);
};

module.exports = router;
