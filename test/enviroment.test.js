require('dotenv').config({ path: '.test.env' });

test('should be in test enviroment when loaded', () => {
    expect(process.env.TEST).toBe('YES');
});
