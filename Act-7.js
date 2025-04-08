class Player {
    constructor(name, team) {
        this.name = name;
        this.score = 0;
        this.team = team;
    }

    attemptShot(successRate) {
        if (Math.random() < successRate) {
            this.score += 3; // 3 points for a successful shot
        }
    }
}

function generateSuccessRate() {
    return Math.random();
}

function playRound(players, attempts) {
    players.forEach(player => {
        const successRate = generateSuccessRate();
        for (let i = 0; i < attempts; i++) {
            player.attemptShot(successRate);
        }
    });
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function displayRankings(players) {
    const rankingsList = document.getElementById('rankings-list');
    rankingsList.innerHTML = '';
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.name} - ${player.score} points`;
        rankingsList.appendChild(listItem);
    });
}

function tieBreaker(players, attempts) {
    const tiebreakerMessage = document.getElementById('tiebreaker-message');
    tiebreakerMessage.textContent = `Tiebreaker needed between: ${players.map(p => p.name).join(', ')}`;
    
    const round2Message = document.getElementById('round2-message');
    round2Message.textContent = 'Round 2 Begins!';
    
    players.forEach(player => player.score = 0);
    playRound(players, attempts);
    
    const tiebreakerResults = document.getElementById('tiebreaker-results');
    tiebreakerResults.innerHTML = '';
    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} scored ${player.score} successful shots.`;
        tiebreakerResults.appendChild(listItem);
    });

    displayRankings(players);
    return rankPlayers(players)[0];
}

function determineChampion(players) {
    const championMessage = document.getElementById('champion-message');
    let rankedPlayers = rankPlayers(players);

    if (rankedPlayers[0].score === rankedPlayers[1].score) {
        let tiedPlayers = rankedPlayers.filter(p => p.score === rankedPlayers[0].score);
        let winner = tieBreaker(tiedPlayers, 3);
        championMessage.textContent = `The champion is ${winner.name} with ${winner.score} points!`;
    } else {
        championMessage.textContent = `The champion is ${rankedPlayers[0].name} with ${rankedPlayers[0].score} points!`;
    }
}

const app = document.getElementById("app");

const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "Basketball Game"
container.append(header);

const rankingsList = document.createElement("ul");
rankingsList.id = "rankings-list";
rankingsList.classList.add("list-group", "pt-3", "pb-2");
container.append(rankingsList);

const tiebreakerMessage = document.createElement("p");
tiebreakerMessage.id = "tiebreaker-message";
container.append(tiebreakerMessage);

const round2Message = document.createElement("p");
round2Message.id = "round2-message";
container.append(round2Message);

const tiebreakerResults = document.createElement("ul");
tiebreakerResults.id = "tiebreaker-results";
tiebreakerResults.classList.add("list-group", "pt-3", "pb-2");
container.append(tiebreakerResults);

const championMessage = document.createElement("p");
championMessage.id = "champion-message";
container.append(championMessage);

const controls = document.createElement("div");
controls.classList.add("input-group");
container.append(controls);

const playerNameInput = document.createElement("input");
playerNameInput.id = "player-name-input";
playerNameInput.classList.add("form-control");
playerNameInput.placeholder = "Add Player";
controls.append(playerNameInput);

const addPlayerButton = document.createElement("button");
addPlayerButton.id = "add-player-button";
addPlayerButton.classList.add("btn", "btn-outline-primary");
addPlayerButton.style.backgroundColor = '#b5ffff'; // added custom background color
addPlayerButton.textContent = "Add Player";
addPlayerButton.addEventListener("click", () => {
    const playerName = playerNameInput.value;
    if (playerName) {
        const playerList = document.getElementById('player-list');
        const listItem = document.createElement('li');
        listItem.textContent = playerName;
        playerList.appendChild(listItem);
        playerNameInput.value = '';
    }
});
controls.append(addPlayerButton);

const playerList = document.createElement("ul");
playerList.id = "player-list";
playerList.classList.add("list-group", "pt-3", "pb-2");
container.append(playerList);

const attemptsInput = document.createElement("input");
attemptsInput.id = "attempts-input";
attemptsInput.classList.add("form-control");
attemptsInput.type = "number";
attemptsInput.value = 5;
controls.append(attemptsInput);

const playButton = document.createElement("button");
playButton.id = "play-button";
playButton.classList.add("btn", "btn-outline-primary"); // changed from btn-outline-primary to btn-primary
playButton.style.backgroundColor = '#b5ffff'; // added custom background color
playButton.textContent = "Play";
playButton.addEventListener("click", () => {
    const players = Array.from(document.getElementById('player-list').children).map(player => new Player(player.textContent, ''));
    const attempts = parseInt(attemptsInput.value);
    playRound(players, attempts);
    displayRankings(players);
    determineChampion(players);
});
controls.append(playButton);