const authRouter = require('./auth.route');
const certificateRouter = require('./certificate.route');
const projectRouter = require('./project.route');
const userRouter = require('./users.route');
const router = (app) => {
    userRouter(app);
    authRouter(app);
    certificateRouter(app);
    projectRouter(app);
};

module.exports = router;
