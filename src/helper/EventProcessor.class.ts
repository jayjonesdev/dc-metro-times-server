import EventEmitter from 'events';
import { Event } from '../types/event.types';

type Error = {
  event: Event;
  err: any;
};

class EventProcessor extends EventEmitter {
  private events: Event[];

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
        this.emit(event.name, data);
        setTimeout(() => this.processEvent(event), event.interval);
      })
      .catch((err) => this.emit('error', { event, err }));
  }

  private setupEventReceivers(): void {
    this.setMaxListeners(this.events.length + 1);

    this.events.forEach((event) => {
      this.on(event.name, (data: any) => {
        // TODO: socket.io event
        // console.log(data);
      });
    });

    this.on('error', (data: Error) => {
      // TODO: socket.io event, implement Logger
    });
  }

  setEvents(events: Event[]): void {
    this.events = events;
    this.restart();
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
