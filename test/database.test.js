require('./enviroment.test');

const mongoose = require('mongoose');
beforeAll(() => require('../src/models/index.model').connect());

afterAll(() => {
    mongoose.connection.close();
});

test('should connect to mongoDB when loaded', () => {
    expect(mongoose.connection.readyState).toBe(1);
});
