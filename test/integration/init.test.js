require('../database.test');
require('../enviroment.test');
const app = require('../../src/app');
let server = null;

beforeAll(() => {
    server = app.listen();

    return new Promise((resolve, reject) => {
        server.on('error', reject);
        server.on('listening', resolve);
    });
});

afterAll(() => {
    server.close();
});

test('Should start the server on given port when loaded', () => {
    expect(server.listening).toBe(true);
});

exports.getLivePort = () => {
    if (!server)
        throw new Error(
            'Server not started.\n\n Call this method only inside a test.'
        );
    return server.address().port;
};
