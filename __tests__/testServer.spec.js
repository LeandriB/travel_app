const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('get test endpoint', function() {
    it('get test endpoint', async done => {
        const response = await request.get('/test')

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Test Passed');
        done();
    });
});
