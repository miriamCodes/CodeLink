"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const { app } = require('./index');
describe('Router Tests', () => {
    describe('GET /repos/:username', () => {
        it('should fetch repositories for given username', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).get('/repos/testUsername');
            expect(response.status).toBe(200);
        }));
    });
    describe('GET /profile/:id', () => {
        it('should fetch profile for given id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).get('/profile/1');
            expect(response.status).toBe(200);
        }));
    });
});
describe('API Endpoints', () => {
    describe('Portfolio Routes', () => {
        it('should fetch repositories for a given username', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(app).get('/repos/testUsername');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        }));
    });
});
