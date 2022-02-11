const userRouter = require('./users.route');
const router = (app) => {
    userRouter(app);
};

module.exports = router;
