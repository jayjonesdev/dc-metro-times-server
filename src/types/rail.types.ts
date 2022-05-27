export interface RailPredictionResponse {
  Trains: RailPrediction[];
}

export type RailIncidentResponse = {
  IncidentID: string;
  Description: string;
  IncidentType: string;
  LinesAffected: string;
  DateUpdated: string;
}[];

export type RailPrediction = {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: string;
  Line: string;
  LocationCode: string;
  LocationName: string;
  Min: string;
};
