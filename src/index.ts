import 'dotenv/config';
import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { randomUUID } from 'crypto';
import cors from 'cors';
import EventProcessor from './libs/EventProcessor/EventProcessor.class';
import railEvents from './events/rail.events';
import { Clients } from './types/event.types';
import apiRouter from './controllers';

const app: Application = express();
const PORT = process.env.PORT || 5555;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});
const clients: Clients = {};

let railEventProcessor: EventProcessor;

io.on('connection', (socket) => {
  const id = randomUUID();
  clients[id] = socket;

  socket.once('disconnect', () => delete clients[id]);

  railEventProcessor.setClients(clients);
});

app.use(cors());
app.use(apiRouter);

httpServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);

  railEventProcessor = new EventProcessor(railEvents);
});
