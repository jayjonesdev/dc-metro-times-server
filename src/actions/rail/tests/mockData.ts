const mockedRailIncidentResponse = {
  data: {
    Incidents: [
      {
        IncidentID: '6E037E72-0AE5-4484-B246-E68E8E46C3AE',
        Description:
          'Trains will operate every 20 minutes w/6-car trains. Delays possible, plan additional travel time.',
        IncidentType: 'Alert',
        LinesAffected: 'GR; YL;',
        DateUpdated: '2022-05-02T04:48:00',
      },
    ],
  },
};

const mockedRealTimeRailPredictionsResponse = {
  data: {
    Trains: [
      {
        Car: '6',
        Destination: 'Vienna',
        DestinationCode: 'K08',
        DestinationName: 'Vienna/Fairfax-GMU',
        Group: '2',
        Line: 'OR',
        LocationCode: 'D03',
        LocationName: "L'Enfant Plaza",
        Min: '5',
      },
    ],
  },
};

export { mockedRailIncidentResponse, mockedRealTimeRailPredictionsResponse };
