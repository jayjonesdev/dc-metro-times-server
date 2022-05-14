import 'dotenv/config';
import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import EventProcessor from './libs/EventProcessor/EventProcessor.class';
import railEvents from './events/rail.events';
import { connect } from 'http2';

const app: Application = express();
const PORT = process.env.PORT || 5555;
const httpServer = createServer(app);
console.log(process.env.FRONTEND_URL);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let railEventProcessor: EventProcessor;

io.on('connection', (socket) => {
  // TODO: fix socket logic
  if (!railEventProcessor.getSocket()) railEventProcessor.setSocket(socket);
});

io.on('disconnect', () => {});

httpServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);

  railEventProcessor = new EventProcessor(railEvents);
});
