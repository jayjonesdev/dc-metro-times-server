import { Router } from "express";

const railRouter = Router();

railRouter.get('/stations', (req, res) => {
    res.send(['A','B','C']);
});

export default railRouter;