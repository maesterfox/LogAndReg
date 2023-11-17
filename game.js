let matches = [];
let variations = 0;
let combinations = 0;
let teamData = []; // Global variable to store team data

// Function to fetch team data
function fetchTeamData() {
  fetch("./php/getPL.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      teamData = data; // Store the fetched data in the global variable
      populateTeamDropdowns(data); // Populate existing dropdowns
    })
    .catch((error) => console.error("Error:", error));
}

function populateTeamDropdowns(data, parentElement = document) {
  const teamDropdowns = parentElement.querySelectorAll(".teamDropdown");

  teamDropdowns.forEach((dropdown) => {
    dropdown.innerHTML = ""; // Clear existing options
    data.forEach((team) => {
      let option = new Option(team.name, team.name);
      dropdown.add(option);
    });
  });
}

// Function to dynamically add match input fields
function addMatchInputFields() {
  const dynamicMatchInputsDiv = document.getElementById("dynamicMatchInputs");

  const newMatchDiv = document.createElement("div");
  newMatchDiv.className = "match-input";
  newMatchDiv.innerHTML = `
        <label for="homeTeam">Home Team:</label>
        <select class="homeTeam teamDropdown"></select>
        <label for="awayTeam">Away Team:</label>
        <select class="awayTeam teamDropdown"></select>
    `;

  dynamicMatchInputsDiv.appendChild(newMatchDiv);
  populateTeamDropdowns(teamData, newMatchDiv); // Populate new dropdowns
}

// Event listener for the submit number of matches button
document
  .getElementById("submitNumberOfMatches")
  .addEventListener("click", function () {
    const numberOfMatchesInput = document.getElementById("numberOfMatches");
    const numberOfMatches = parseInt(numberOfMatchesInput.value, 10);

    if (numberOfMatches > 0) {
      addSpecificNumberOfMatches(numberOfMatches);
    } else {
      // Clear the match inputs if the number is not positive
      document.getElementById("dynamicMatchInputs").innerHTML = "";
    }
  });

// Function to add a specific number of match input fields
function addSpecificNumberOfMatches(numberOfMatches) {
  const dynamicMatchInputsDiv = document.getElementById("dynamicMatchInputs");
  dynamicMatchInputsDiv.innerHTML = ""; // Clear existing inputs

  for (let i = 0; i < numberOfMatches; i++) {
    addMatchInputFields(); // Add new match input fields
  }
}

// Event listener for the submit number of matches button
document
  .getElementById("submitNumberOfMatches")
  .addEventListener("click", function () {
    const numberOfMatchesInput = document.getElementById("numberOfMatches");
    const numberOfMatches = parseInt(numberOfMatchesInput.value, 10);

    if (numberOfMatches > 0) {
      addSpecificNumberOfMatches(numberOfMatches);
    } else {
      document.getElementById("dynamicMatchInputs").innerHTML = "";
    }
  });

// Function to reset the form and clear dynamic content
function resetForm() {
  document.getElementById("matchDataForm").reset();
  document.getElementById("dynamicMatchInputs").innerHTML = "";
  matches = [];
  // Reset other application state variables as needed
}

// Event listener for the reset button
document.getElementById("resetForm").addEventListener("click", resetForm);

// Initialize event listeners
document.addEventListener("DOMContentLoaded", function () {
  fetchTeamData(); // Fetch team data when the DOM content is loaded

  const startPredictionsButton = document.getElementById("startPredictions");
  startPredictionsButton.addEventListener("click", startPredictions);
});

// Predictions

function startPredictions() {
  matches = [];
  const numberOfMatchesInput = document.getElementById("numberOfMatches");
  const numberOfMatches = parseInt(numberOfMatchesInput.value);
  if (isNaN(numberOfMatches) || numberOfMatches <= 0) {
    showModal("Invalid input. Please enter a positive number.");
    return;
  }

  const matchInputs = document.querySelectorAll(".match-input");
  matchInputs.forEach((inputDiv, index) => {
    if (index < numberOfMatches) {
      const homeTeamName = inputDiv.querySelector(".homeTeam").value;
      const awayTeamName = inputDiv.querySelector(".awayTeam").value;

      // Find the team data from the fetched 'teamData'
      const homeTeamData = teamData.find((team) => team.name === homeTeamName);
      const awayTeamData = teamData.find((team) => team.name === awayTeamName);

      if (!homeTeamData || !awayTeamData) {
        showModal("Team data not found. Please check the team names.");
        return;
      }

      matches.push({
        homeTeam: homeTeamName,
        homeTeamStrength: homeTeamData.strength,
        homeTeamAvgGoalsScored: homeTeamData.avg_goals_scored,
        homeTeamAvgGoalsConceded: homeTeamData.avg_goals_conceded,
        awayTeam: awayTeamName,
        awayTeamStrength: awayTeamData.strength,
        awayTeamAvgGoalsScored: awayTeamData.avg_goals_scored,
        awayTeamAvgGoalsConceded: awayTeamData.avg_goals_conceded,
      });
    }
  });

  variations = parseInt(document.getElementById("variations").value);
  combinations = parseInt(document.getElementById("combinations").value);

  if (
    isNaN(variations) ||
    isNaN(combinations) ||
    variations <= 0 ||
    combinations <= 0
  ) {
    showModal("Invalid input. Please enter positive numbers.");
    return;
  }

  generateOutcomes();
}

function generateOutcomes() {
  const tableBody = document.querySelector("#results tbody");
  tableBody.innerHTML = "";

  const uniqueVariations = getUniqueVariations();
  for (let i = 0; i < uniqueVariations.length; i++) {
    const variation = uniqueVariations[i];
    const outcome = getMatchOutcome(variation);
    const predictedGoals = getPredictedGoals(variation);
    const outcomeRow = `
            <tr>
                <td>${i + 1}</td>
                <td>${variation
                  .map((match) => `${match.homeTeam} vs ${match.awayTeam}`)
                  .join("<br>")}</td>
                <td>${outcome}</td>
                <td>${predictedGoals}</td>
            </tr>
        `;
    tableBody.insertAdjacentHTML("beforeend", outcomeRow);
  }
}

function getUniqueVariations() {
  const uniqueVariations = [];
  while (uniqueVariations.length < variations) {
    const variation = [];
    while (variation.length < combinations) {
      const randomMatch = getRandomMatch();
      if (
        !variation.some(
          (match) =>
            match.homeTeam === randomMatch.homeTeam &&
            match.awayTeam === randomMatch.awayTeam
        )
      ) {
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
  let outcome = "";
  for (const match of matchVariation) {
    const totalStrength = match.homeTeamStrength + match.awayTeamStrength;
    const homeTeamAdvantage = match.homeTeamStrength * 0.15;

    const homeTeamAdjustedAvgGoalsScored =
      match.homeTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded;
    const awayTeamAdjustedAvgGoalsScored =
      match.awayTeamAvgGoalsScored + match.awayTeamAvgGoalsConceded;

    const probHomeTeam =
      (match.homeTeamStrength +
        homeTeamAdvantage +
        homeTeamAdjustedAvgGoalsScored -
        match.awayTeamAvgGoalsConceded) /
      totalStrength;
    const probAwayTeam =
      (match.awayTeamStrength +
        awayTeamAdjustedAvgGoalsScored -
        match.homeTeamAvgGoalsConceded) /
      totalStrength;

    outcome += `${match.homeTeam}: ${formatPercentage(probHomeTeam)}, ${
      match.awayTeam
    }: ${formatPercentage(probAwayTeam)}<br>`;
  }
  return outcome;
}

function getMatchOutcomeProbabilities(match) {
  const totalStrength = match.homeTeamStrength + match.awayTeamStrength;
  const homeTeamAdvantage = match.homeTeamStrength * 0.05;

  const homeTeamAdjustedAvgGoalsScored =
    match.homeTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded;
  const awayTeamAdjustedAvgGoalsScored =
    match.awayTeamAvgGoalsScored + match.awayTeamAvgGoalsConceded;

  const probHomeTeam =
    (match.homeTeamStrength +
      homeTeamAdvantage +
      homeTeamAdjustedAvgGoalsScored -
      match.awayTeamAvgGoalsConceded) /
    totalStrength;
  const probAwayTeam =
    (match.awayTeamStrength +
      awayTeamAdjustedAvgGoalsScored -
      match.homeTeamAvgGoalsConceded) /
    totalStrength;

  return {
    homeTeam: probHomeTeam,
    awayTeam: probAwayTeam,
  };
}

function getPredictedGoals(matchVariation) {
  let predictedGoals = "";
  for (const match of matchVariation) {
    const homeTeamAdvantage = match.homeTeamStrength * 0.03;

    // Calculate the match outcome probabilities for the current match
    const outcomeProbabilities = getMatchOutcomeProbabilities(match);
    const probHomeTeam = outcomeProbabilities.homeTeam;
    const probAwayTeam = outcomeProbabilities.awayTeam;

    // Adjust the home and away team goals based on the match outcome probabilities and round to integers
    const homeTeamGoals = Math.round(
      ((match.homeTeamAvgGoalsScored +
        homeTeamAdvantage +
        match.awayTeamAvgGoalsConceded) /
        2) *
        (0.5 + probHomeTeam - probAwayTeam)
    );
    const awayTeamGoals = Math.round(
      ((match.awayTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded) / 2) *
        (0.5 + probAwayTeam - probHomeTeam)
    );

    predictedGoals += `${match.homeTeam} vs ${match.awayTeam}: ${homeTeamGoals} - ${awayTeamGoals}<br>`;
  }
  return predictedGoals;
}

function formatPercentage(value) {
  return (value * 100).toFixed(2) + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  const startPredictionsButton = document.getElementById("startPredictions");
  startPredictionsButton.addEventListener("click", startPredictions);
});
