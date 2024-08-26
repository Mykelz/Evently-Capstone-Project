const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL
});


client.on("connect", () => console.log("redis client is connected"));


module.exports = client;