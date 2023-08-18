import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import { router } from './router';
import authRouter from './auth/authRoutes';
import { auth } from 'express-openid-connect'; 
import 'dotenv/config';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  clientSecret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  afterCallback: (req: Request, res) => {
    console.log('After Callback Triggered');
    res.redirect('http://localhost:3000/profile');
  
  },
  authorizationParams: {
    response_type: 'code',
    response_mode: 'query'
  }
};

const app: Express = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://dev-ufx4hgreuueebbg6.us.auth0.com'],
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

app.use(auth(config));

app.use(authRouter);

app.use('/profile', router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
