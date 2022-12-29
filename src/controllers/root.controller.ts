import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/probe', async (_req, res) => {
  res.send(true);
});

export default rootRouter;
