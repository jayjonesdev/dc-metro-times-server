import { Router } from "express";
import { fetchRailIncidents, fetchRealTimeRailPredictions } from "../actions/rail";

const railRouter = Router();

railRouter.get('/incidents', async (_req, res) => {
    const incidents = await fetchRailIncidents();
    res.send(incidents);
});

railRouter.get('/realtime', async (_req, res) => {
    const realtimePredictions = await fetchRealTimeRailPredictions();
    res.send(realtimePredictions);
});

export default railRouter;