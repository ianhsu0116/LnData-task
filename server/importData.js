require("dotenv").config();
const connection = require("./utils/database");
const fs = require("fs");

// 將players.json內的資料丟入DB
fs.readFile("players.json", "utf-8", async (e, data) => {
  if (e) throw e;

  try {
    data = JSON.parse(data);
    let dataLength = data.length;
    let i = 0;

    while (i < dataLength) {
      await connection.queryAsync(
        "INSERT INTO players (name, team_acronym, team_name, games_played, minutes_per_game, field_goals_attempted_per_game, field_goals_made_per_game, field_goal_percentage, free_throw_percentage, three_point_attempted_per_game, three_point_made_per_game, three_point_percentage, points_per_game, offensive_rebounds_per_game, defensive_rebounds_per_game, rebounds_per_game, assists_per_game, steals_per_game, blocks_per_game, turnovers_per_game, player_efficiency_rating) VALUES (?)",
        [
          [
            data[i].name,
            data[i].team_acronym,
            data[i].team_name,
            data[i].games_played,
            data[i].minutes_per_game,
            data[i].field_goals_attempted_per_game,
            data[i].field_goals_made_per_game,
            data[i].field_goal_percentage,
            data[i].free_throw_percentage,
            data[i].three_point_attempted_per_game,
            data[i].three_point_made_per_game,
            data[i].three_point_percentage,
            data[i].points_per_game,
            data[i].offensive_rebounds_per_game,
            data[i].defensive_rebounds_per_game,
            data[i].rebounds_per_game,
            data[i].assists_per_game,
            data[i].steals_per_game,
            data[i].blocks_per_game,
            data[i].turnovers_per_game,
            data[i].player_efficiency_rating,
          ],
        ]
      );
      i++;
    }
  } catch (error) {
    console.log("error");
    console.log(error);
  }
});
