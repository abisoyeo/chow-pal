const redis = require("redis");

let redisClient;

if (process.env.NODE_ENV === "production") {
  redisClient = redis.createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });
} else {
  redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });
}
redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient
  .connect()
  .then(() => {
    console.log("Redis client connected successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis client:", err);
  });

module.exports = redisClient;
