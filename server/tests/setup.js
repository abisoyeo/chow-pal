// Test setup file
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
process.env.CLIENT_URL = 'http://localhost:3000';

// Mock database for tests
process.env.DATABASE_URL = 'sqlite://memory';

// Mock session secret
process.env.SESSION_SECRET = 'test-secret-key';

// Mock database modules before any imports
jest.mock('../src/shared/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true)
  },
  Order: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  },
  Menu: {
    findAll: jest.fn()
  }
}));

// Mock session config
jest.mock('../src/shared/config/session', () => ({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Suppress console.log during tests unless debugging
if (process.env.DEBUG !== 'true') {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
}

// Set test timeout
jest.setTimeout(10000);
