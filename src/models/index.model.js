const mongoose = require('mongoose');
mongoose.Promise = Promise;
exports.connect = function () {
    mongoose.connect(
        process.env.MONGO_DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            console.log('Database Connected');
        }
    );
    if (process.env.SHOW_MONGO) mongoose.set('debug', true);
    mongoose.connection.on('error', (e) => {
        console.log(
            'MongoDB connection error. Please make sure that MongoDB is running.'
        );
        throw e;
    });
};
