import { createServer, Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { io } from 'socket.io-client';
import { Event } from '../../types/event.types';
import EventProcessor from './EventProcessor.class';

describe('EventProcessor', () => {
  let events: Event[] = [];
  let bool = false;
  const eventProcessor = new EventProcessor(events);
  // let ioServer: Server, serverSocket: Socket, httpServer: HttpServer;

  // beforeAll((done) => {
  //   httpServer = createServer();
  //   ioServer = new Server(httpServer);
  //   httpServer.listen(5555);
  //   console.log(httpServer.address())
  //   ioServer.on('connection', (socket) => {
  //     console.log(socket);
  //   });
  //   done();
  // });

  // beforeEach((done) => {
  //   const client = io('http://localhost:5555');
  //   client.on('connect', () => {
  //     console.log('connected');
  //   });
  //   done();
  // });

  // afterAll((done) => {
  //   ioServer.close();
  //   httpServer.close();
  //   done();
  // });

  afterEach(() => {
    eventProcessor.stop();
    bool = false;
  });

  // it('has no socket attached', () => {
  //   expect(eventProcessor.getSocket()).not.toBeUndefined;
  // });

  // it('has an attached socket', () => {
  //   eventProcessor.setSocket(serverSocket);
  //   const socket = eventProcessor.getSocket();
  //   console.log('serverSocket', socket)
  //   expect(socket).toBeUndefined;
  // });

  it('has a max of 1 listener', () => {
    const events: Event[] = [];
    const eventProcessor = new EventProcessor(events);

    expect(eventProcessor.getMaxListeners()).toEqual(1);
    expect(eventProcessor.eventNames()[0]).toEqual('error');
  });

  it('event action gets called', () => {
    events = [
      {
        name: 'Set bool',
        interval: 60 * 1000,
        action: () =>
          new Promise((resolve) => {
            bool = true;
            resolve(true);
          }),
      },
    ];
    eventProcessor.setEvents(events);

    expect(bool).toBeTruthy;
  });

  it('event processor has 3 events', () => {
    events = [
      {
        name: 'event one',
        interval: 60 * 1000,
        action: () => new Promise((resolve) => resolve(true)),
      },
      {
        name: 'event two',
        interval: 60 * 1000,
        action: () => new Promise((resolve) => resolve(true)),
      },
    ];
    eventProcessor.setEvents(events);

    expect(eventProcessor.getEvents().length).toBe(2);
    expect(eventProcessor.getMaxListeners()).toEqual(3);
    expect(eventProcessor.eventNames()).toEqual([
      'event one',
      'event two',
      'error',
    ]);
  });

  it('has zero events', () => {
    expect(eventProcessor.eventNames().length).toEqual(0);
  });

  it('has 3 events', () => {
    eventProcessor.start();
    expect(eventProcessor.eventNames().length).toEqual(3);
  });
});
