import 'dotenv/config';
import express, { Application } from 'express';
import EventProcessor from './helper/EventProcessor.class';
import railEvents from './events/rail.events';

const app: Application = express();
const PORT = process.env.PORT || 5555;

const railEventProcessor = new EventProcessor(railEvents);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
