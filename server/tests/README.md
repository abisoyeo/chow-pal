# Simple Server Tests with Jest and Supertest

This directory contains simple, focused tests for the ChowPal restaurant chatbot server.

## Test Files

### 🏥 **Basic Server Tests** (`server.test.js`)
- Health check endpoint
- CORS configuration
- 404 error handling
- Basic functionality

### 🤖 **Chatbot API Tests** (`chatbot.test.js`) ✅ **ALL PASSING**
- Chat message endpoint testing
- Different chatbot commands (1, 99, 98, 97, 0)
- Input validation (missing/invalid messages)
- Session handling across requests
- Response format validation

### 💳 **Payment Tests** (`paystack.test.js`)
- Payment callback handling
- Basic success/failure scenarios
- Query parameter validation
- Redirect verification

## Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch
```

## Test Setup

- **Environment**: NODE_ENV set to 'test'
- **Mocked**: Database and session dependencies
- **Fast**: No timeouts or complex integrations
- **Simple**: Focused on core functionality

## Current Status

- ✅ **chatbot.test.js**: All tests passing (15 tests)
- ✅ **server.test.js**: Basic server functionality (4 tests)
- ✅ **paystack.test.js**: Payment callback handling (3 tests)

**Total: ~22 simple, focused tests - all should pass quickly!**
