import express, { Express } from 'express';
import cors from 'cors';
import { router } from './router';
import authRouter from './auth/authRoutes';
import 'dotenv/config';

const app: Express = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRouter);





app.use(router);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});