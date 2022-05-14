import EventEmitter from 'events';
import { Socket } from 'socket.io';
import { Event } from '../../types/event.types';

type Error = {
  event: Event;
  err: any;
};

/**
 * @Class
 * Event Processor is used to process user-defined events and emit socket-io events.
 */
class EventProcessor extends EventEmitter {
  private events: Event[];
  private socket: Socket | undefined;
  /**
   * @param {Event[]} events User-defined events
   */
  constructor(events: Event[]) {
    super();
    this.events = events;

    this.setupEventReceivers = this.setupEventReceivers.bind(this);
    this.processEvent = this.processEvent.bind(this);

    this.processEvents();
  }

  private processEvents(): void {
    this.setupEventReceivers();
    this.events.forEach(this.processEvent);
  }

  private processEvent(event: Event): void {
    event
      .action()
      .then((data: any) => {
        super.emit(event.name, data);
        setTimeout(() => this.processEvent(event), event.interval);
      })
      .catch((err) => this.emit('error', { event, err }));
  }

  private setupEventReceivers(): void {
    this.setMaxListeners(this.events.length + 1);

    this.events.forEach((event) => {
      super.on(event.name, (data: any) => {
        if (this.socket) this.socket.emit(event.name, data);
      });
    });

    super.on('error', (data: Error) => {
      // TODO: implement Logger
      if (this.socket) this.socket.emit('error', data);
    });
  }

  setEvents(events: Event[]): void {
    this.events = events;
    this.restart();
  }

  setSocket(socket: Socket): void {
    this.socket = socket;
  }

  getSocket(): Socket | undefined {
    return this.socket;
  }

  getEvents(): Event[] {
    return this.events;
  }

  start(): void {
    if (this.eventNames().length === 0) this.processEvents();
  }

  stop(): void {
    this.removeAllListeners();
  }

  restart(): void {
    this.removeAllListeners();
    this.processEvents();
  }
}

export default EventProcessor;
