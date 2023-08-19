import { Router } from 'express';
import { requiresAuth } from 'express-openid-connect';
import 'dotenv/config';

const authRouter: Router = Router();

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