const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { ValidationError } = require('express-validation');
const router = require('./routes/index.route');
const { login } = require('./controllers/auth.controller');
const { getSystemErrorName } = require('util');

window.onerror = function (msg, url, lineNO, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = 'script error';
    if (string.indexOf(substring) > -1) {
        alert('Script Error: See Browser console for Detail');
    } else {
        var message = [
            'Message : ' + msg,
            'URL : ' + url,
            'Line : ' + lineNO,
            'Column : ' + columnNo,
            'Error Object: ' + JSON.stringify(error)
        ].join('-');
        alert(message);
    }
    return false;
};
try {
    ValidationError();
} catch (error) {
    console.log(error);
}
try {
    login();
} catch (error) {
    console.log(error);
}
try {
    SyntaxError();
} catch (error) {
    console.log(error);
}
try {
    getSystemErrorName();
} catch (error) {
    console.log(error);
}
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, _) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    if (err instanceof ValidationError) {
        return res.status(200).json({ error: String(err) });
    }
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
