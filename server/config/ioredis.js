const Redis = require('ioredis')
// 6379 localhost
const redis = new Redis('redis://default:kVpXaCW6uyQprYf6UnKN3mrJ9hFwLr5K@redis-12887.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:12887')


module.exports = redis;
