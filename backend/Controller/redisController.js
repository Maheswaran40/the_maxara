const redisClient = require("../config/redis")

 const testRedis = async (req, res) => {
  try {
    await redisClient.set("message", "Redis is working!", {
      EX: 60,
    });

    const message = await redisClient.get("message");

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = { testRedis };