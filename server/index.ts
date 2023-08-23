import express, { Express, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import authRouter from './auth/authRoutes';
import { auth } from 'express-openid-connect';
import 'dotenv/config';
import { router } from './router';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  clientSecret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  /* postLogoutRedirectUri: 'http://localhost:3000', */
  afterCallback: (req: Request, res: Response) => {
    console.log('After Callback Triggered');
    res.redirect('http://localhost:3000/profile');
  
  },
  authorizationParams: {
    response_type: 'code',
    response_mode: 'query'
  }
};

const app: Express = express();
app.get('/test', (req, res) => res.send('Test route'));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET!,
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


app.use(auth(config));


app.use(router);

app.use(authRouter);

export { app };