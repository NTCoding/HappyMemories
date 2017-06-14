exports.new = (players, rating) => {
    const teams = teamsForRating((rating || "").toString());
    return {
        teams: players.map(p => {
            return {
                name: selectRandom(teams),
                player: p
            };
        })
    };
}

function teamsForRating(r) {
    if (!r) return fiveStarTeams;
    if (r === "4.5") return fourPointFiveStarTeams;
    if (r === "4") return fourStarTeams;
    if (r === "4-5") return fourStarTeams.concat(fourPointFiveStarTeams).concat(fiveStarTeams);
    if (r === "4.5-5") return fourPointFiveStarTeams.concat(fiveStarTeams);

    throw new Error('Unknown rating: ' + r);
}

function selectRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

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