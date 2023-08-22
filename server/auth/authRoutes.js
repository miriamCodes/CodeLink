"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
require("dotenv/config");
const authRouter = (0, express_1.Router)();
authRouter.get('/', (req, res) => {
    console.log('route endpoint hit');
    res.send('Test auth route<a href="/login">Log in</a>.');
});
authRouter.get('/test', (req, res) => {
    console.log('Test endpoint hit');
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
