const express = require('express');
const { profile } = require('../controllers/user.controler');
const { validate } = require('../helpers/jwt.helper');
const router = express.Router();

router.get('/me', validate, profile);

const userRouter = (app) => {
    app.use('/users', router);
};

module.exports = userRouter;
