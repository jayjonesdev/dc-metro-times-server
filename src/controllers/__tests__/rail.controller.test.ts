import request from 'supertest';
import app from '../..';
import { isRailPrediction, isRailIncident } from '../../types/rail.types';

describe('GET /incidents', () => {
  it('returns status code of 201 and array of results', async () => {
    const res = await request(app).get('/rail/incidents');

    expect(res.body).toBeInstanceOf(Array);
    expect(isRailIncident(res.body[0])).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });
});

describe('GET /realtime', () => {
  it('returns status code of 201 and array of results', async () => {
    const res = await request(app).get('/rail/realtime');

    expect(res.body).toBeInstanceOf(Array);
    expect(isRailPrediction(res.body[0])).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });
});
