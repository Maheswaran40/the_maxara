
const express = require("express");
const router = express.Router();

const { testRedis } = require("../Controller/redisController");

router.get("/test", testRedis);

module.exports = router;
