let matches = [];
let variations = 0;
let combinations = 0;

function startPredictions() {
    // Reset the matches array
    matches = [];

    // Prompt for the number of matches
    const numberOfMatches = parseInt(prompt("Number of matches:"));
    if (isNaN(numberOfMatches) || numberOfMatches <= 0) {
        alert("Invalid input. Please enter a positive number.");
        return;
    }

    // Prompt for team, strength, and average goals for each match
    for (let i = 0; i < numberOfMatches; i++) {
        const homeTeam = prompt(`Enter team ${i + 1} (Home team):`);
        const homeTeamStrength = parseInt(prompt(`Team ${homeTeam} strength (1-100):`));
        const homeTeamAvgGoalsScored = parseFloat(prompt(`Average goals scored per game by ${homeTeam}:`));
        const homeTeamAvgGoalsConceded = parseFloat(prompt(`Average goals conceded per game by ${homeTeam}:`));

        const awayTeam = prompt(`Enter team ${i + 1} (Away team):`);
        const awayTeamStrength = parseInt(prompt(`Team ${awayTeam} strength (1-100):`));
        const awayTeamAvgGoalsScored = parseFloat(prompt(`Average goals scored per game by ${awayTeam}:`));
        const awayTeamAvgGoalsConceded = parseFloat(prompt(`Average goals conceded per game by ${awayTeam}:`));

        if (
            !homeTeam || isNaN(homeTeamStrength) || homeTeamStrength < 1 || homeTeamStrength > 100 ||
            !awayTeam || isNaN(awayTeamStrength) || awayTeamStrength < 1 || awayTeamStrength > 100 ||
            isNaN(homeTeamAvgGoalsScored) || isNaN(homeTeamAvgGoalsConceded) ||
            isNaN(awayTeamAvgGoalsScored) || isNaN(awayTeamAvgGoalsConceded)
        ) {
            alert("Invalid input. Please enter valid team names, strengths (1-100), and average goals.");
            return;
        }

        matches.push({
            homeTeam,
            homeTeamStrength,
            homeTeamAvgGoalsScored,
            homeTeamAvgGoalsConceded,
            awayTeam,
            awayTeamStrength,
            awayTeamAvgGoalsScored,
            awayTeamAvgGoalsConceded
        });
    }

    // Prompt for number of variations and combinations
    variations = parseInt(prompt("Number of variations (bets):"));
    combinations = parseInt(prompt("Number of combinations (matches p/b):"));

    if (isNaN(variations) || isNaN(combinations) || variations <= 0 || combinations <= 0) {
        alert("Invalid input. Please enter positive numbers.");
        return;
    }

    generateOutcomes();
}

function generateOutcomes() {
    const tableBody = document.querySelector('#results tbody');
    tableBody.innerHTML = '';

    const uniqueVariations = getUniqueVariations();
    for (let i = 0; i < uniqueVariations.length; i++) {
        const variation = uniqueVariations[i];
        const outcome = getMatchOutcome(variation);
        const predictedGoals = getPredictedGoals(variation);
        const outcomeRow = `
            <tr>
                <td>${i + 1}</td>
                <td>${variation.map(match => `${match.homeTeam} vs ${match.awayTeam}`).join('<br>')}</td>
                <td>${outcome}</td>
                <td>${predictedGoals}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', outcomeRow);
    }
}

function getUniqueVariations() {
    const uniqueVariations = [];
    while (uniqueVariations.length < variations) {
        const variation = [];
        while (variation.length < combinations) {
            const randomMatch = getRandomMatch();
            if (!variation.some(match => match.homeTeam === randomMatch.homeTeam && match.awayTeam === randomMatch.awayTeam)) {
                variation.push(randomMatch);
            }
        }
        uniqueVariations.push(variation);
    }
    return uniqueVariations;
}

function getRandomMatch() {
    return matches[Math.floor(Math.random() * matches.length)];
}

function getMatchOutcome(matchVariation) {
    let outcome = '';
    for (const match of matchVariation) {
        const totalStrength = match.homeTeamStrength + match.awayTeamStrength;
        const homeTeamAdvantage = match.homeTeamStrength * 0.10;

        const homeTeamAdjustedAvgGoalsScored = match.homeTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded;
        const awayTeamAdjustedAvgGoalsScored = match.awayTeamAvgGoalsScored + match.awayTeamAvgGoalsConceded;

        const probHomeTeam = (match.homeTeamStrength + homeTeamAdvantage + homeTeamAdjustedAvgGoalsScored - match.awayTeamAvgGoalsConceded) / totalStrength;
        const probAwayTeam = (match.awayTeamStrength + awayTeamAdjustedAvgGoalsScored - match.homeTeamAvgGoalsConceded) / totalStrength;

        outcome += `${match.homeTeam}: ${formatPercentage(probHomeTeam)}, ${match.awayTeam}: ${formatPercentage(probAwayTeam)}<br>`;
    }
    return outcome;
}

function getPredictedGoals(matchVariation) {
    let predictedGoals = '';
    for (const match of matchVariation) {
        const homeTeamAdvantage = match.homeTeamStrength * 0.02;
        const homeTeamGoals = Math.round((match.homeTeamAvgGoalsScored + homeTeamAdvantage + match.awayTeamAvgGoalsConceded) / 2);
        const awayTeamGoals = Math.round((match.awayTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded) / 2);

        predictedGoals += `${match.homeTeam} vs ${match.awayTeam}: ${homeTeamGoals} - ${awayTeamGoals}<br>`;
    }
    return predictedGoals;
}

function formatPercentage(value) {
    return (value * 100).toFixed(2) + '%';
}
