import { Router } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import 'dotenv/config';

const authRouter: Router = Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

authRouter.get('/', (req, res) => {
    res.send('Test auth route<a href="/auth/login">Log in</a>.');
});

authRouter.use(auth(config));
authRouter.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

export default authRouter;