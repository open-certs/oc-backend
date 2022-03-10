require('dotenv').config({ path: '.test.env' });
jest.setTimeout(10000);

test('should be in test enviroment when loaded', () => {
    expect(process.env.TEST).toBe('YES');
});
