<?php
include 'config.php'; // Ensure this path is correct

header('Content-Type: application/json'); // Set JSON header

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT name, strength, avg_goals_scored, avg_goals_conceded FROM PremierLeagueTeams");
    $stmt->execute();

    $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($teams);
} catch (PDOException $e) {
    // Return the error message as JSON
    echo json_encode(['error' => $e->getMessage()]);
}
