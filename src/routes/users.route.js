const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

const userRouter = (app) => {
    app.use('/users', router);
};
module.exports = userRouter;
