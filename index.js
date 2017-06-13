const Hapi = require('hapi');
const config = require('config');

const server = new Hapi.Server();
server.connection({ port: config.app.port, host: config.app.host });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Happy memories for you!!!');
    }
});

server.route({
	method: 'POST',
	path: '/search-slack/{date}',
	handler: function(request, reply) {
        reply({ message: 'TODO' });
	}
});