var milight = require('./milight');

var Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000
});

server.route({
  method: 'GET',
  path: '/milights/{switch}',
  handler: function(req, reply) {
    var lightSwitch = req.params.switch || 'off';
    console.log("Den Server - ",req.params);
    milight[lightSwitch]();
    reply('ok');
  }
});

server.start(function(err) {
    if (err) { throw err; }
    console.log('\n--- Den Server running at:', server.info.uri);
});



const masterBServer = new Hapi.Server();
masterBServer.connection({
    host: '0.0.0.0',
    port: 3001
});

masterBServer.route({
  method: 'GET',
  path: '/milights/{zone}/{switch}',
  handler: function(req, reply) {
    console.log("Master Bedroom Server - ", req.params);
    if (![0,1,2,3,4].includes(Number(req.params.zone))){
      reply('error: zone must be 0,1,2,3,4');
      return;
    }
    const lightZone = Number(req.params.zone);
    var lightSwitch = (req.params.switch || 'off');
    milight[lightSwitch](lightZone);
    reply('ok');
  }
});

masterBServer.start(function(err) {
    if (err) { throw err; }
    console.log('--- Master Bedroom Server running at:', masterBServer.info.uri);
});
