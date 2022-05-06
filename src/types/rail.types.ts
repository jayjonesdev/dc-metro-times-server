export type RailPredictionResponse = {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: string;
  Line: string;
  LocationCode: string;
  LocationName: string;
  Min: string;
}[];

export type RailIncidentResponse = {
  IncidentID: string;
  Description: string;
  StartLocationFullName: string | null;
  EndLocationFullName: string | null;
  PassengerDelay: 0;
  DelaySeverity: string | null;
  IncidentType: string;
  EmergencyText: string | null;
  LinesAffected: string;
  DateUpdated: string;
}[];
