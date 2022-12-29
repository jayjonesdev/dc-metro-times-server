import { Router } from 'express';
import rootRouter from './root.controller';
import railRouter from './rail.controller';

const apiRouter = Router();

apiRouter.use('/rail', railRouter);
apiRouter.use('/', rootRouter);

export default apiRouter;
