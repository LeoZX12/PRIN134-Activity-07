class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

function getSuccessRate() {
    return 0.3 + Math.random() * 0.5;
}

function shootBalls(player, attempts) {
    const successRate = getSuccessRate();
    let successfulShots = 0;
    
    for (let i = 0; i < attempts; i++) {
        if (Math.random() < successRate) {
            successfulShots++;
        }
    }
    
    player.score += successfulShots;
    console.log(`${player.name} scored ${successfulShots} successful shots.`);
    return successfulShots;
}

function rankPlayers(players) {
    return players.slice().sort((a, b) => b.score - a.score);
}

function displayRankings(players) {
    const rankings = rankPlayers(players);
    console.log("\n🏆 Rankings after this round:");
    rankings.forEach((player, index) => {
        const medal = index === 0 ? "🥇" : 
                      index === 1 ? "🥈" : 
                      index === 2 ? "🥉" : " ";
        console.log(`${index + 1}. ${player.name} - ${player.score} points ${medal}`);
    });
    return rankings;
}

function checkForTies(rankedPlayers) {
    if (rankedPlayers.length < 2) return false;
    return rankedPlayers[0].score === rankedPlayers[1].score;
}

function getTiedPlayers(rankedPlayers) {
    const topScore = rankedPlayers[0].score;
    return rankedPlayers.filter(player => player.score === topScore);
}

function playBasketballGame() {
    console.log("🏀 Basketball Shooting Championship 🏀");
    
    const players = [
        new Player("James"),
        new Player("Curry"),
        new Player("Jordan"),
        new Player("Bryant"),
        new Player("Durant")
    ];
    
    const attemptsPerRound = 5;
    let round = 1;
    let currentPlayers = players;
    
    while (true) {
        console.log(`\n🏀 Round ${round} Begins!`);
        currentPlayers.forEach(player => {
            shootBalls(player, attemptsPerRound);
        });
        
        const rankings = displayRankings(players);
        
        if (!checkForTies(rankings)) {
            console.log(`\n🏆 The champion is ${rankings[0].name} with ${rankings[0].score} points! 🏆`);
            break;
        }
        
        const tiedPlayers = getTiedPlayers(rankings);
        const tiedNames = tiedPlayers.map(p => p.name).join(', ');
        console.log(`\n🔥 Tiebreaker needed between: ${tiedNames}`);
        
        tiedPlayers.forEach(player => player.score = 0);
        currentPlayers = tiedPlayers;
        round++;
    }
}

playBasketballGame();