const Mosca = require('mosca');
const { URL } = require('url');

const port = parseInt(process.env.PORT) || 1883;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisSettings = ((url) => {
  const { username, password, hostname, port } = new URL(url);
  return { username, password, hostname, port };
})(redisUrl);

const moscaConfig = {
  port: port,
  backend: {
    type: 'redis',
    host: redisSettings.hostname,
    port: redisSettings.port,
    password: redisSettings.password,
    db: 0,
    return_buffers: true,
  }, persistence: {
    factory: Mosca.persistence.Redis,
    url: redisUrl,
  }
};

const server = new Mosca.Server(moscaConfig);

server.on('ready', () => console.log('Mosca is listening'));
server.on('clientConnected', client => console.log('client connected', client.id));
server.on('clientDisconnected', client => console.log('client disconnected', client.id));
server.on('published', (packet, client) => console.log('Published', packet.topic, packet.payload));

module.exports = server;
