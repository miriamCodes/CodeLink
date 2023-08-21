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
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = require("jwks-rsa");
require("dotenv/config");
//
const secretRetriever = (0, jwks_rsa_1.expressJwtSecret)({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`
});
const customSecretFunction = (req, token) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        secretRetriever(req, req.headers.authorization || '', (token === null || token === void 0 ? void 0 : token.header) || {}, (err, secret) => {
            if (err) {
                console.log('Error in customSecretFunction:', err);
                reject(err);
            }
            else {
                resolve(secret);
            }
        });
    });
});
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: customSecretFunction,
    audience: process.env.CLIENT_ID,
    issuer: `https://${process.env.ISSUER_BASE_URL}/`,
    algorithms: ['RS256']
});
exports.default = checkJwt;
