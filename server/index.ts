import express, { Express } from 'express';
import cors from 'cors';
import { router } from './router';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});