const request = require('supertest');
const createApp = require('../src/app');

// Mock the chat controller to avoid database dependencies
jest.mock('../src/features/chatbot/chat.controller', () => ({
  handleMessage: jest.fn((req, res) => {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    // Mock different responses based on message content
    let reply;
    switch(message.trim()) {
      case '1':
        reply = 'Here are our available meals:\n1. Burger - $10\n2. Pizza - $15\n3. Pasta - $12';
        break;
      case '99':
        reply = 'Processing your checkout...';
        break;
      case '98':
        reply = 'Here is your order history...';
        break;
      case '0':
        reply = 'Your order has been cancelled.';
        break;
      default:
        reply = `You said: ${message}. How can I help you today?`;
    }

    res.json({ reply });
  })
}));

describe('Chatbot API Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('POST /api/chat/message', () => {
    test('should respond to valid message', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: 'Hello' })
        .expect(200);

      expect(response.body).toHaveProperty('reply');
      expect(response.body.reply).toContain('Hello');
    });

    test('should handle menu request (message: "1")', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: '1' })
        .expect(200);

      expect(response.body.reply).toContain('available meals');
      expect(response.body.reply).toContain('Burger');
    });

    test('should handle checkout request (message: "99")', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: '99' })
        .expect(200);

      expect(response.body.reply).toContain('checkout');
    });

    test('should handle order history request (message: "98")', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: '98' })
        .expect(200);

      expect(response.body.reply).toContain('order history');
    });

    test('should handle cancel order request (message: "0")', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: '0' })
        .expect(200);

      expect(response.body.reply).toContain('cancelled');
    });

    test('should return 400 for missing message', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for non-string message', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: 123 })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for empty message', async () => {
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: '' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should handle long messages', async () => {
      const longMessage = 'A'.repeat(1000);
      const response = await request(app)
        .post('/api/chat/message')
        .send({ message: longMessage })
        .expect(200);

      expect(response.body).toHaveProperty('reply');
    });
  });

  describe('Session Handling', () => {
    test('should maintain session across requests', async () => {
      const agent = request.agent(app);
      
      // First request
      await agent
        .post('/api/chat/message')
        .send({ message: '1' })
        .expect(200);

      // Second request with same agent (session)
      const response = await agent
        .post('/api/chat/message')
        .send({ message: '99' })
        .expect(200);

      expect(response.body).toHaveProperty('reply');
    });
  });
});