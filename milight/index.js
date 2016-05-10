var milight = require('./milight');

var Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: '0.0.0.0', 
    port: parseInt(process.env.PORT, 10) || 3000
});

server.route({
  method: 'GET'
, path: '/milights/{switch}'
, handler: function(req, reply) {
    var lightSwitch = req.params.switch || 'off';
    console.log(req.params);
    milight[lightSwitch]();
    reply('ok');
  }
});

// Start the server
server.start(function(err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
