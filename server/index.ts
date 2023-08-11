import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(cors());
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});