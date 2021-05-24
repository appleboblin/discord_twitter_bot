// requirements
const redis = require('redis');

//const { redisPath } = require('../config.json');
const { redisPath } = require('../token.json');

module.exports = async () => {
  return await new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: redisPath,
    });
    // check if error
    client.on('error', (err) => {
      console.error('Redis error:', err);
      client.quit();
      reject(err);
    });
    // check if ready
    client.on('ready', () => {
      resolve(client);
    });
  });
};

module.exports.expire = (callback) => {
  const expired = () => {
    const sub = redis.createClient({ url: redisPath });
    sub.subscribe('__keyevent@0__:expired', () => {
      sub.on('message', (channel, message) => {
        callback(message);
      });
    });
  };

  const pub = redis.createClient({ url: redisPath });
  pub.send_command(
    'config',
    ['set', 'notify-keyspace-events', 'Ex'],
    expired()
  );
};
