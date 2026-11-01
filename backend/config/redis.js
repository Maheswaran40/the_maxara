
const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err.message);
});

redisClient.on("ready", () => {
    console.log("Redis is ready");
});

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    console.log("Redis connected successfully");
};

module.exports = { redisClient, connectRedis };
