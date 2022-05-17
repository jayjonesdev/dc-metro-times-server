import { Socket } from 'socket.io';

export interface Event {
  name: string;
  interval: number;
  action: () => Promise<any>;
}

export type Clients = { [key: string]: Socket };
