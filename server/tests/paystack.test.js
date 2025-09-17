const request = require('supertest');
const createApp = require('../src/app');

// Mock the paystack controller
jest.mock('../src/features/paystack/paystack.controller', () => ({
  verifyPayment: jest.fn((req, res) => {
    const { reference, trxref } = req.query;
    
    if (!reference && !trxref) {
      return res.status(400).json({ 
        error: 'Payment reference is required' 
      });
    }

    const paymentRef = reference || trxref;

    // Mock different payment scenarios
    if (paymentRef === 'successful_payment_123') {
      return res.redirect(`${process.env.CLIENT_URL}?payment=success`);
    } else if (paymentRef === 'failed_payment_456') {
      return res.redirect(`${process.env.CLIENT_URL}?payment=failed`);
    } else if (paymentRef === 'invalid_ref') {
      return res.status(400).json({ 
        error: 'Invalid payment reference' 
      });
    }

    // Default successful payment
    return res.redirect(`${process.env.CLIENT_URL}?payment=success`);
  })
}));

describe('Paystack API Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /api/paystack/callback', () => {
    test('should handle successful payment callback', async () => {
      const response = await request(app)
        .get('/api/paystack/callback')
        .query({ reference: 'successful_payment_123' })
        .expect(302); // Redirect

      expect(response.headers.location).toContain('payment=success');
    });

    test('should return 400 for missing payment reference', async () => {
      const response = await request(app)
        .get('/api/paystack/callback')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('reference is required');
    });

    test('should redirect to correct client URL', async () => {
      const response = await request(app)
        .get('/api/paystack/callback')
        .query({ reference: 'test_ref' })
        .expect(302);

      expect(response.headers.location).toContain(process.env.CLIENT_URL);
    });
  });
});
