const mosca = require('mosca');
const redis = require('redis');

const moscaConfig = {
  port: process.env.PORT || 1883,
  backend: {
    type: 'redis',
    redis: redis,
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    db: 0,
    return_buffers: true,
  }, persistence: {
    factory: mosca.persistence.Redis,
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  }
};

const server = new mosca.Server(moscaConfig);

server.on('ready', () => console.log('Mosca is listening'));
server.on('clientConnected', client => console.log('client connected', client.id));
server.on('clientDisconnected', client => console.log('client disconnected', client.id));
server.on('published', (packet, client) => console.log('Published', packet.topic, packet.payload));

module.exports = server;
