const Hapi = require('hapi');
const config = require('config');
const http = require('request-promise');
//require('request-debug')(http);

const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || config.app.port,
    host: config.app.host
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Happy memories for you!!!');
    }
});

const slackToken = process.env.SLACK_TOKEN;

function slackMessageSearchUrl(query) {
    return "https://slack.com/api/search.messages" + "?query=" + query + "&count=200" + "&token=" + slackToken;
}

server.route({
    method: 'POST',
    path: '/search-slack',
    handler: function(request, reply) {
        const query = request.payload.text;
        const p = http({
                uri: slackMessageSearchUrl(query),
                json: true
            })
            .then(json => {
                if (json.messages.matches) {
                    const memories = json.messages.matches.filter(x => x.type === "message");
                    if (memories) return success(query, memories[0]);
                }
                return failure(query);
            });
        reply(p);
    }
});

function success(query, match) {
    return {
        response_type: 'in_channel',
        text: 'Here is a happy memory for ' + query,
        title: match.username + "'s happy " + query + " memory",
        title_link: match.previous.permalink,
        attachments: [{
            text: match.previous.text,
            author_name: "@" + match.previous.username,
        }, {
            text: match.text,
            author_name: "@" + match.username,
        }, {
            text: match.next.text,
            author_name: "@" + match.next.username,
        }]
    };
}

function failure(query) {
    return {
        text: 'There are no happy memories of ' + query
    };
}