"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
require("dotenv/config");
const authRouter = (0, express_1.Router)();
console.log('Environment Variables:', process.env);
/* const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    clientSecret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    afterCallback: (req, res, session, state) => {
        console.log('After Callback Triggered');
        res.redirect('http://localhost:3000/profile');
        return session;
    },
    authorizationParams: {
        response_type: 'code',
        response_mode: 'query'
    }
}; */
authRouter.get('/', (req, res) => {
    res.send('Test auth route<a href="/login">Log in</a>.');
});
authRouter.get('/test', (req, res) => {
    res.send('Test route is working');
});
authRouter.get('/profile', (0, express_openid_connect_1.requiresAuth)(), (req, res) => {
    console.log('OIDC User Object:', JSON.stringify(req.oidc.user));
    res.send(JSON.stringify(req.oidc.user));
});
authRouter.get('/callback', (req, res) => {
    res.redirect('/profile');
});
exports.default = authRouter;
