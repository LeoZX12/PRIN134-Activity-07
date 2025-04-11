
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

function getTiedPlayersNames(rankedPlayers) {
    const topScore = rankedPlayers[0].score;
    const tiedPlayers = rankedPlayers.filter(player => player.score === topScore);
    return tiedPlayers.map(p => p.name).join(', ');
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
    
    console.log("\n🏀 Round 1 Begins!");
    players.forEach(player => {
        shootBalls(player, attemptsPerRound);
    });
    
    const rankings = displayRankings(players);
    
    if (checkForTies(rankings)) {
        const tiedNames = getTiedPlayersNames(rankings);
        console.log("\n🔥 Tiebreaker needed between: " + tiedNames);
        

        const topScore = rankings[0].score;
        const tiedPlayers = rankings.filter(player => player.score === topScore);
        tiedPlayers.forEach(player => player.score = 0);
        
        console.log("\n🏀 Round 2 Begins!");
        tiedPlayers.forEach(player => {
            shootBalls(player, attemptsPerRound);
        });

        const finalRankings = displayRankings(players);
        console.log("\n🏆 The champion is " + finalRankings[0].name + 
                    " with " + finalRankings[0].score + " points! 🏆");
    } else {
        console.log("\n🏆 The champion is " + rankings[0].name + 
                    " with " + rankings[0].score + " points! 🏆");
    }
}
playBasketballGame();