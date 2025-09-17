const request = require('supertest');
const createApp = require('../src/app');

describe('Server Basic Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('Health Check', () => {
    test('GET /api/health should return OK status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'OK'
      });
    });
  });

  describe('CORS and Headers', () => {
    test('should have CORS headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });

  describe('404 Handling', () => {
    test('should return 404 for unknown API routes', async () => {
      const response = await request(app)
        .get('/api/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('GET /api/unknown-route');
    });

    test('should return 404 for unknown POST routes', async () => {
      const response = await request(app)
        .post('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
      expect(response.body.message).toContain('POST /api/nonexistent');
    });
  });
});
