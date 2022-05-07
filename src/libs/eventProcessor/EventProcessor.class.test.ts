import { Event } from '../../types/event.types';
import EventProcessor from './EventProcessor.class';

describe('EventProcessor', () => {
  let events: Event[] = [];
  let bool = false;
  const eventProcessor = new EventProcessor(events);

  afterEach(() => {
    eventProcessor.stop();
    bool = false;
  });

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
