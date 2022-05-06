export interface Event {
  name: string;
  interval: number;
  action: () => Promise<any>;
}
