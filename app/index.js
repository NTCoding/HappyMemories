const Hapi = require('hapi');
const config = require('config');
const slack = require('./slack');

const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || config.app.port,
    host: config.app.host
});

server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Happy memories for you!!!');
    }
});

server.route({
    method: 'POST',
    path: '/search-slack',
    handler: function(request, reply) {
        reply(slack.searchForHappyMemory(request.payload.text));
    }
});