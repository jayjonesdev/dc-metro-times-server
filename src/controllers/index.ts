import { Router } from 'express';
import railRouter from './rail.controller';

const apiRouter = Router();

apiRouter.use('/rail', railRouter);

export default apiRouter;