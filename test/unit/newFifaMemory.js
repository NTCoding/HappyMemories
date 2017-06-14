const assert = require('assert');
const FifaMemories = require('../../app/fifaMemories.js')
const should = require('should');

describe('2 player request', () => {

    const players = ['Reggie', 'Marc'];
    const result = FifaMemories.new(players);
    console.log('%j', result);

    it('randomly assigns a home and away player', () => {
        assert.equal(result.teams.length, 2);
        players.should.containEql(result.teams[0].player);
        players.should.containEql(result.teams[1].player);
        result.teams[0].player.should.not.equal(result.teams[1].player);
    });

    it('choose a 5 star team for player 1', () => {
        fiveStarTeams.should.containEql(result.teams[0].name);
    });

    it('chooses a 5 star team for player 2', () => {
        fiveStarTeams.should.containEql(result.teams[1].name);
    });
});

const fiveStarTeams = [
    'Real Madrid',
    'FC Barcelona',
    'FC Bayern',
    'Juventus',
    'Chelsea',
    'PSG',
    'Manchester Utd',
    'Atlético Madrid',
    'Manchester City',
    'Arsenal'
];