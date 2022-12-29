import request from 'supertest';
import app from '../..';

describe('GET /probe', () => {
  it('returns true', async () => {
    const res = await request(app).get('/probe');

    expect(res.body).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });
});
