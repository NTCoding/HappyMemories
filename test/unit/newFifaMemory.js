const assert = require('assert');
const FifaMemories = require('../../app/fifaMemories.js')
const should = require('should');

describe('2 player Memory', () => {

    const players = ['Reggie', 'Marc'];
    const result = FifaMemories.new(players);

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

describe('choosing a star rating', () => {

    it('Chooses 4.5 star teams when 4.5 star rating is chosen', () => {
        for (var i = 0; i < 100; i++) {
            const result = FifaMemories.new(['a', 'b'], 4.5);
            fourPointFiveStarTeams.should.containEql(result.teams[0].name);
            fourPointFiveStarTeams.should.containEql(result.teams[1].name);
        }

    });

    it('Chooses 4 star teams when 4 star rating is chosen', () => {
        for (var i = 0; i < 100; i++) {
            const result = FifaMemories.new(['a', 'b'], 4);
            fourStarTeams.should.containEql(result.teams[0].name);
            fourStarTeams.should.containEql(result.teams[1].name);
        }
    });

    it('Chooses a range of 4, 4.5, and 5 when "4-5" rating is chosen', () => {
        const allTeams = fourStarTeams.concat(fourPointFiveStarTeams).concat(fiveStarTeams);
        for (var i = 0; i < 100; i++) {
            const result = FifaMemories.new(['a', 'b'], 4);
            allTeams.should.containEql(result.teams[0].name);
            allTeams.should.containEql(result.teams[1].name);
        }
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

const fourPointFiveStarTeams = ["Bor. Dortmund",
    "Spurs", "Liverpool", "Napoli", "Inter", "Roma", "Sevilla FC", "Everton", "Villarreal CF", "Bayer 04",
    "VfL Wolfsburg", "Lazio", "Bor. M'gladbach", "Milan", "Athletic Bilbao", "AS Monaco", "SL Benfica", "Valencia CF",
    "FC Porto", "FC Schalke 04"
];

const fourStarTeams = ["Fiorentina", "Sporting CP", "Olym. Lyonnais", "OGC Nice", "Celta Vigo", "Zenit", "Real Sociedad", "Leicester City",
    "West Ham", "Beşiktaş", "Southampton", "Stoke City", "Olym. Marseille", "Fenerbahçe", "Hertha BSC", "Crystal Palace", "Real Betis", "Watford",
    "Torino", "1899 Hoffenheim", "Spartak Moscow", "RCD Espanyol", "Galatasaray", "1. FC Köln", "Swansea City", "UD Las Palmas", "Ajax", "Málaga CF",
    "Shakhtar Donetsk", "Sunderland", "SD Eibar", "Werder Bremen", "RC Deportivo", "FC Krasnodar", "Giron. Bordeaux", "FC Augsburg", "PSV", "Sassuolo",
    "Chievo Verona", "Feyenoord", "AS Saint-Étienne", "Udinese", "CSKA Moscow", "Lokomotiv Moscow", "West Brom", "Tigres", "Medipol Başakşehir",
    "1. FSV Mainz 05", "Rubin Kazan", "Sampdoria", "Atalanta", "Stade Rennais", "Deport. Alavés", "Hull City", "Bologna", "Middlesbrough", "Hamburger SV",
    "RB Leipzig", "SC Braga", "LOSC Lille", "CD Leganés", "Genoa", "Eint. Frankfurt"
];