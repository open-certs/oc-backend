const { ValidationError } = require('express-validation');
const CustomError = require('../errors/custom.error');

// eslint-disable-next-line prettier/prettier, no-unused-vars
exports.errorHandler = (err, req, res, _) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            error: err.getResponse()
        });
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({
            error: {
                message: 'Bad request',
                type: 'ValidationError',
                name: 'Validation Error',
                details: err.details
            }
        });
    }
    const isDevelopment = req.app.get('env') === 'development';
    return res.status(500).json({
        error: {
            message: isDevelopment ? String(err) : 'Something went wrong',
            type: 'Error',
            name: 'Unexpected error',
            trace: isDevelopment ? err.stack : undefined
        }
    });
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
};
