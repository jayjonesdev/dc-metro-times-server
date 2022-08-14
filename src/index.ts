import 'dotenv/config';
import express, { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import apiRouter from './controllers';

const PORT = process.env.PORT || 5555;

const init = (port: string | number) => {
  const app: Application = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(apiRouter);

  httpServer.listen(port, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });

  return httpServer;
};

init(PORT);

export default init;
