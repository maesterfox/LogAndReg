// Loader

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var loader = document.querySelector(".main-fader");
    if (loader) {
      loader.style.opacity = "0";

      // Add an event listener for the transition end
      loader.addEventListener("transitionend", function () {
        loader.style.display = "none";
      });
    }
  }, 4000); // 4000 milliseconds = 4 seconds
});

// Game script begins

let matches = [];
let variations = 0;
let combinations = 0;
let teamData = []; // Global variable to store team data

function showModal(message) {
  const modal = document.getElementById("errorModal");
  const errorMessageElement = document.getElementById("errorMessage");

  errorMessageElement.textContent = message; // Set the error message
  modal.style.display = "block"; // Display the modal
}

function closeModal() {
  const modal = document.getElementById("errorModal");
  modal.style.display = "none"; // Hide the modal
}

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

document
  .getElementById("submitNumberOfMatches")
  .addEventListener("click", function () {
    const numberOfMatchesInput = document.getElementById("numberOfMatches");
    const numberOfMatches = parseInt(numberOfMatchesInput.value, 10);

    // Check if the number of matches is within a reasonable range
    if (numberOfMatches > 0 && numberOfMatches <= 20) {
      // Adjust the maximum limit as needed
      addSpecificNumberOfMatches(numberOfMatches);
    } else {
      // Display error using modal if the input is invalid or too large
      showModal(
        "Invalid number of matches. Please enter a positive number less than or equal to 20."
      );
    }
  });

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
  const outcomesContainer = document.getElementById("outcomesContainer");
  outcomesContainer.innerHTML = ""; // Clear previous content

  const uniqueVariations = getUniqueVariations();
  uniqueVariations.forEach((variation, index) => {
    // Create a new table for each bet variation
    const table = document.createElement("table");
    table.className = "resultsTable";
    table.innerHTML = `
    <caption class="bet-caption">Bet ${index + 1}</caption>
    <colgroup>
          <col style="max-width: 500px;">
          <col style="width: 100px;">
          <col style="width: 50px;">
      </colgroup>
      <thead>
          <tr>
              <th>Match</th>
              <th>%</th>
              <th>Goals</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    // Append individual matches as rows in the table
    variation.forEach((match) => {
      const outcome = getMatchOutcome([match]); // Passing single match as an array
      const predictedGoals = getPredictedGoals([match]); // Passing single match as an array
      const row = `
        <tr>
            <td>${match.homeTeam} vs ${match.awayTeam}</td>
            <td>${outcome}</td>
            <td>${predictedGoals}</td>
        </tr>
      `;
      table.querySelector("tbody").insertAdjacentHTML("beforeend", row);
    });

    outcomesContainer.appendChild(table);
  });
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
    const homeTeamAdvantage = match.homeTeamStrength * 0.1;

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

    outcome += `${formatPercentage(probHomeTeam)} - ${formatPercentage(
      probAwayTeam
    )}<br>`;
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
    const homeTeamAdvantage = match.homeTeamStrength * 0.06;

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
        (0.3 + probHomeTeam - probAwayTeam)
    );
    const awayTeamGoals = Math.round(
      ((match.awayTeamAvgGoalsScored + match.homeTeamAvgGoalsConceded) / 2) *
        (0.5 + probAwayTeam - probHomeTeam)
    );

    predictedGoals += `${homeTeamGoals} - ${awayTeamGoals}<br>`;
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
