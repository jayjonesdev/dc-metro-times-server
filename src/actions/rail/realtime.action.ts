import axios, { AxiosResponse } from 'axios';
import { RailPredictionResponse } from '../../types/rail.types';

const fetchRealTimeRailPredictions = (): Promise<
  AxiosResponse<RailPredictionResponse>
> =>
  axios
    .get('https://api.wmata.com/StationPrediction.svc/json/GetPrediction/ALL', {
      headers: {
        api_key: process.env.WMATA_API_KEY as string,
      },
    })
    .then((res) => res.data);

export default fetchRealTimeRailPredictions;
