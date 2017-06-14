const http = require('request-promise');
//require('request-debug')(http);

const oauthToken = process.env.SLACK_TOKEN;

exports.verificationToken = process.env.SLACK_VERIFICATION_TOKEN;

exports.searchForHappyMemory = (query) => {
    return http({
            uri: slackMessageSearchUrl(query),
            json: true
        })
        .then(json => {
        	if (json.messages.matches) {
                const memories = json.messages.matches.filter(x => x.type === "message");
                if (memories) return successResponse(query, memories[0]);
            }
            return failureResponse(query);
        });
}

function slackMessageSearchUrl(query) {
    return "https://slack.com/api/search.messages" + "?query=" + query + "&count=200" + "&token=" + oauthToken;
}

function successResponse(query, match) {
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

function failureResponse(query) {
    return {
        text: 'There are no happy memories of ' + query
    };
}