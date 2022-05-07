import { AxiosResponse } from 'axios';
import EventEmitter from 'events';
import { Event } from '../types/event.types';

type Error = {
  event: Event;
  err: any;
};

class EventProcessor extends EventEmitter {
  private events: Event[];
  private MAX_EVENT_LISTENERS = 3;

  constructor(events: Event[]) {
    super();
    this.events = events;
    this.setMaxListeners(this.MAX_EVENT_LISTENERS);

    this.setupEventReceivers = this.setupEventReceivers.bind(this);
    this.processEvent = this.processEvent.bind(this);

    this.setupEventReceivers();
    this.processEvents();
  }

  private processEvents() {
    this.events.forEach(this.processEvent);
  }

  private processEvent(event: Event) {
    event
      .action()
      .then((data: any) => {
        this.emit(event.name, data);
        setTimeout(() => this.processEvent(event), event.interval);
      })
      .catch((err) => this.emit('error', { event, err }));
  }

  private setupEventReceivers() {
    this.events.forEach((event) => {
      this.on(event.name, (data: any) => {
        // TODO: socket.io event
        console.log(data);
      });
    });

    this.on('error', (data: Error) => {
      // TODO: socket.io event, implement Logger
    });
  }

  setEvents(events: Event[]) {
    this.events = events;
    this.restart();
  }

  start() {
    if (this.eventNames().length === 0) this.processEvents();
  }

  stop() {
    this.removeAllListeners();
  }

  restart() {
    this.removeAllListeners();
    this.processEvents();
  }
}

export default EventProcessor;
