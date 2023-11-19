CREATE TABLE PremierLeagueTeams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    strength INT NOT NULL CHECK (
        strength BETWEEN 0 AND 100
    ),
    avg_goals_scored FLOAT NOT NULL,
    avg_goals_conceded FLOAT NOT NULL
);
INSERT INTO PremierLeagueTeams (
        name,
        strength,
        avg_goals_scored,
        avg_goals_conceded
    )
VALUES (1, 'Arsenal', 90, 2.3, 0.9),
    (2, 'Aston Villa', 78, 2.1, 1.1),
    (3, 'Brentford', 69, 1.6, 1.3),
    (4, 'Brighton & Hove Albion', 72, 1.9, 1.3),
    (5, 'Burnley', 47, 1.2, 2.1),
    (6, 'Chelsea', 78, 1.9, 1.2),
    (7, 'Crystal Palace', 58, 1.2, 1.3),
    (8, 'Everton', 59, 1.3, 1.8),
    (9, 'Fulham', 58, 1.1, 1.5),
    (10, 'Sheffield United', 49, 1.5, 2.4),
    (12, 'Liverpool', 88, 2.2, 1),
    (13, 'Manchester City', 92, 2.5, 0.9),
    (14, 'Manchester United', 69, 1.8, 1.4),
    (15, 'Newcastle United', 72, 2, 1.1),
    (16, 'Bournemouth', 55, 1.1, 1.8),
    (18, 'Tottenham Hotspur', 84, 2.1, 1.1),
    (20, 'West Ham United', 65, 1.7, 1.4),
    (22, 'Nottingham Forest', 61, 1.4, 2.1),
    (23, 'Luton', 54, 1.1, 2.5),
    (24, 'Wolves', 65, 1.4, 1.9);