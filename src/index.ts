import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import apiRouter from './controllers';

const app: Express = express();

app.use(cors());
app.use(apiRouter);

export default app;
