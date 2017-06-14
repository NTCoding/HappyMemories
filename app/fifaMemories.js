exports.new = (players) => {
	return {
		teams: players.map(p => {
			return { name: selectRandom(fiveStarTeams), player: p };
		})
	};
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