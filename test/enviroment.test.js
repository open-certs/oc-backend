require('dotenv').config({ path: '.test.env' });
require('../src/models/index.model').connect();

test('should be in test enviroment when loaded', () => {
    expect(process.env.TEST).toBe('YES');
});
