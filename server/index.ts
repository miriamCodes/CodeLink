import express, { Express } from 'express';
import cors from 'cors';
import { router } from './router';
import { auth, requiresAuth } from 'express-openid-connect';
import 'dotenv/config';

const app: Express = express();
app.use(cors());
app.use(express.json());


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};


app.get('/', (req, res) => {
  res.send('Test auth route<a href="/login">Log in</a>.');
});

app.use(auth(config));
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


app.use(router);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});