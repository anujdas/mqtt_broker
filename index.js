const mosca = require('mosca');
const redis = require('redis');

const moscaConfig = {
  port: 1883,
  backend: {
    type: 'redis',
    redis: redis,
    db: 1,
    return_buffers: true,
  }, persistence: {
    factory: mosca.persistence.Redis
  }
};

const server = new mosca.Server(moscaConfig);

server.on('ready', () => console.log('Mosca is listening'));
server.on('clientConnected', client => console.log('client connected', client.id));
server.on('clientDisconnected', client => console.log('client disconnected', client.id));
server.on('published', (packet, client) => console.log('Published', packet.topic, packet.payload));

module.exports = server;
