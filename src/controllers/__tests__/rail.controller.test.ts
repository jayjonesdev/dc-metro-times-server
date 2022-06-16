import request from 'supertest';
import httpServer from '../..';
import { isRailPrediction, isRailIncident } from '../../types/rail.types';

describe('GET /incidents', () => {
  beforeAll(() => {
    if (!httpServer.address()) {
      httpServer.listen(4321);
    }
  });

  afterAll(() => {
    httpServer.close();
  });

  it('returns status code of 201 and array of results', async () => {
    const res = await request(httpServer).get('/rail/incidents');

    expect(res.body).toBeInstanceOf(Array);
    expect(isRailIncident(res.body[0])).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });
});

describe('GET /realtime', () => {
  beforeAll(() => {
    if (!httpServer.address()) {
      httpServer.listen(4321);
    }
  });

  afterAll(() => {
    httpServer.close();
  });

  it('returns status code of 201 and array of results', async () => {
    const res = await request(httpServer).get('/rail/realtime');

    expect(res.body).toBeInstanceOf(Array);
    expect(isRailPrediction(res.body[0])).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });
});
