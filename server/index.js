"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const express_openid_connect_1 = require("express-openid-connect");
require("dotenv/config");
const router_1 = require("./router");
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    clientSecret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    /* postLogoutRedirectUri: 'http://localhost:3000', */
    afterCallback: (req, res) => {
        console.log('After Callback Triggered');
        res.redirect('http://localhost:3000/profile');
    },
    authorizationParams: {
        response_type: 'code',
        response_mode: 'query'
    }
};
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
//
app.get('/logout', (req, res) => {
    console.log('Logout endpoint hit');
    const returnTo = encodeURIComponent('http://localhost:3000');
    const logoutURL = `${process.env.ISSUER_BASE_URL}/v2/logout?client_id=${process.env.CLIENT_ID}&returnTo=${returnTo}`;
    console.log('Constructed Logout URL:', logoutURL);
    res.redirect(logoutURL);
});
app.use((0, express_openid_connect_1.auth)(config));
app.use(router_1.router);
app.use(authRoutes_1.default);
