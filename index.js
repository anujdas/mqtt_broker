const mosca = require('mosca');
const redis = require('redis');

const port = parseInt(process.env.PORT) || 1883;
const redisPort = parseInt(process.env.REDIS_PORT) || 6379;

const moscaConfig = {
  port: port,
  backend: {
    type: 'redis',
    redis: redis,
    host: process.env.REDIS_HOST || 'localhost',
    port: redisPort,
    db: 0,
    return_buffers: true,
  }, persistence: {
    factory: mosca.persistence.Redis,
    host: process.env.REDIS_HOST || 'localhost',
    port: redisPort,
  }
};

const server = new mosca.Server(moscaConfig);

server.on('ready', () => console.log('Mosca is listening'));
server.on('clientConnected', client => console.log('client connected', client.id));
server.on('clientDisconnected', client => console.log('client disconnected', client.id));
server.on('published', (packet, client) => console.log('Published', packet.topic, packet.payload));

module.exports = server;
