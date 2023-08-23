const request = require('supertest');
const { app } = require('./index');


describe('Router Tests', () => {

    describe('GET /repos/:username', () => {
        it('should fetch repositories for given username', async () => {
            const response = await request(app).get('/repos/testUsername');
            expect(response.status).toBe(200);
        });
    });

    describe('GET /profile/:id', () => {
        it('should fetch profile for given id', async () => {
            const response = await request(app).get('/profile/1');
            expect(response.status).toBe(200);
        });
    });

});

describe('API Endpoints', () => {

    describe('Portfolio Routes', () => {
        it('should fetch repositories for a given username', async () => {
            const response = await request(app).get('/repos/testUsername');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });

    });

});


