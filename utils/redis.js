const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_URL,
})


client.on("connect", () => console.error("redis client is connected"));


module.exports = client;