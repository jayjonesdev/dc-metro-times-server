export interface Event {
  name: string;
  interval: number;
  action: () => Promise<any>;
}

export type Error = {
  event: string;
  err: any;
};
