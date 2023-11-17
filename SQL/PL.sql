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
VALUES ('Arsenal', 85, 1.9, 1.0),
    ('Aston Villa', 70, 1.3, 1.5),
    ('Brentford', 65, 1.2, 1.4),
    ('Brighton & Hove Albion', 68, 1.1, 1.3),
    ('Burnley', 60, 1.0, 1.6),
    ('Chelsea', 88, 2.0, 0.9),
    ('Crystal Palace', 67, 1.2, 1.3),
    ('Everton', 72, 1.4, 1.2),
    ('Fulham', 65, 1.1, 1.5),
    ('Leeds United', 70, 1.5, 1.4),
    ('Leicester City', 75, 1.6, 1.2),
    ('Liverpool', 90, 2.3, 0.8),
    ('Manchester City', 92, 2.5, 0.7),
    ('Manchester United', 85, 1.8, 1.0),
    ('Newcastle United', 68, 1.2, 1.3),
    ('Norwich City', 55, 0.9, 1.7),
    ('Southampton', 66, 1.1, 1.4),
    ('Tottenham Hotspur', 84, 1.7, 1.1),
    ('Watford', 60, 1.0, 1.6),
    ('West Ham United', 78, 1.6, 1.1),
    ('Wolverhampton Wanderers', 73, 1.3, 1.2);