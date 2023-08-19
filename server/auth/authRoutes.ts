import { Router } from 'express';
import {  requiresAuth } from 'express-openid-connect';
import 'dotenv/config';

const authRouter: Router = Router();

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
    console.log('route endpoint hit');
    res.send('Test auth route<a href="/login">Log in</a>.');
});

authRouter.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.send('Test route is working');
});

authRouter.get('/profile', requiresAuth(), (req, res) => {
    console.log('OIDC User Object:', JSON.stringify(req.oidc.user));
    res.send(JSON.stringify(req.oidc.user));
});

authRouter.get('/callback', (req, res) => {
    res.redirect('/profile');
});

export default authRouter;