const Hapi = require('hapi');
const config = require('config');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || config.app.port, host: config.app.host });

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
	path: '/search-slack',
	handler: function(request, reply) {
        const searchText = request.payload.text;
        const slackMessage = {
            response_type: 'in_channel',
            text: 'You are searching for happy memories on: ' + searchText,
            attachments: [
                {
                    text: 'Unfortunately, this plugin does not work yet. It will soon, though'
                }
            ]
        };
        reply(slackMessage);
	}
});