// Define variables
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

    // Prompt for team and strength for each match
    for (let i = 0; i < numberOfMatches; i++) {
        const teamA = prompt(`Enter team ${i + 1} (Home team):`);
        const teamAStrength = parseInt(prompt(`Team ${teamA} strength (1-100):`));
        const teamB = prompt(`Enter team ${i + 1} (Away team):`);
        const teamBStrength = parseInt(prompt(`Team ${teamB} strength (1-100):`));

        if (
            !teamA ||
            !teamB ||
            isNaN(teamAStrength) || teamAStrength < 1 || teamAStrength > 100 ||
            isNaN(teamBStrength) || teamBStrength < 1 || teamBStrength > 100
        ) {
            alert("Invalid input. Please enter valid team names and strengths (1-100).");
            return;
        }

        matches.push({
            teams: `${teamA} vs ${teamB}`,
            strengths: [teamAStrength, teamBStrength],
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

    for (let i = 1; i <= variations; i++) {
        for (let j = 1; j <= combinations; j++) {
            const outcome = getMatchOutcome();
            const outcomeRow = `
                <tr>
                    <td>${j}</td>
                    <td>${matches.map(match => match.teams).join('<br>')}</td>
                    <td>${outcome}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', outcomeRow);
        }
    }
}

function getMatchOutcome() {
    let outcome = '';
    for (const match of matches) {
        const [teamA, teamB] = match.teams.split(' vs ');
        const probA = match.strengths[0] / (match.strengths[0] + match.strengths[1]);
        const probB = 1 - probA;

        outcome += `${teamA}: ${formatPercentage(probA)}, ${teamB}: ${formatPercentage(probB)}<br>`;
    }
    return outcome;
}

function formatPercentage(value) {
    return (value * 100).toFixed(2) + '%';
}
