import 'dotenv/config';
import express, { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import apiRouter from './controllers';

const app: Application = express();
const PORT = process.env.PORT || 5555;
const httpServer = createServer(app);

app.use(cors());
app.use(apiRouter);

httpServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});

export default httpServer;