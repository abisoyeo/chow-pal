const { RedisStore } = require("connect-redis");
const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Connect to Redis
redisClient
  .connect()
  .then(() => {
    console.log("Redis client connected successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis client:", err);
  });

const sessionConfig = {
  store: new RedisStore({
    client: redisClient,
    // ttl: 60 * 60 * 24 * 30, // Auto set from cookie max age by connect-redis
  }),
  secret: process.env.SESSION_SECRET || "a_default_secret_for_dev",
  resave: false,
  // name: "sessionId", // change name of cookie
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
};

module.exports = sessionConfig;
