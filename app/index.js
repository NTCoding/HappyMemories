const Hapi = require('hapi');
const config = require('config');
const Slack = require('./slack');
const Boom = require('boom');
const FifaMemories = require('./fifaMemories');

const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || config.app.port,
    host: config.app.host
});

server.auth.scheme('slack', (server, options) => {
    return {
        authenticate: (request, reply) => {
            return reply.continue({
                credentials: {}
            });
        },
        payload: (request, reply) => {
            const token = () => request.payload.token;
            if (!request.payload) {
                return reply(Boom.unauthorized('No payload', 'slack'));
            } else if (!request.payload.token) {
                return reply(Boom.unauthorized('No verification token', 'slack'));
            } else if (request.payload.token !== Slack.verificationToken) {
                return reply(Boom.unauthorized('Invalid verification token', 'slack'));
            } else {
                return reply.continue();
            }
        },
        options: {
            payload: true
        }
    };
});

server.auth.strategy('slack1', 'slack');

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
    config: {
        auth: 'slack1',
        handler: function(request, reply) {
            reply(Slack.searchForHappyMemory(request.payload.text));
        }
    }
});

server.route({
    method: 'POST',
    path: '/slack-new-fifa-memory',
    config: {
        auth: 'slack1',
        handler: (request, reply) => {
            try {
                if (request.payload.text === 'help') return reply(fifaHelpResponse);
                const commandParams = request.payload.text.split(' ');
                const names = commandParams[0].split(",");
                const starRating = commandParams[1];
                const mem = FifaMemories.new(names, starRating);
                const res = {
                    response_type: 'in_channel',
                    text: buildMessage(names, starRating),
                    attachments: mem.teams.map(t => {
                        return {
                            text: t.name,
                            author_name: t.player
                        }
                    })
                };
                reply(res);
            } catch(err) {
                reply({ text: 'Sorry, you did something wrong. Command help: \n' + fifaHelpResponse});
            }
        }
    }
});

const fifaHelpResponse = 
    `Arguments: [players (comma-separated)] [rating (optional)]
    Ratings: 4, 4.5, 5, 4-5, 4.5-5
    Examples:
        - Ben,Marc 4
        - Ed,Trev 4-5
        - Dan,Jenna 4.5-5
    `

function buildMessage(names, starRating) {
    const base = 'Time to create a new fifa memory with ' + names.join(" & ");
    if (!starRating) return base;
    else return base + " with teams at rating: " + starRating;
}

server.register([{
    register: require('good'),
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    response: '*',
                    error: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}], (err) => {
    server.start((err) => {
        if (err) throw err;
        console.log(`Server running at: ${server.info.uri}`);
    });
});