const router = require("express").Router();
const connection = require("../utils/database");

router.use((req, res, next) => {
  console.log("有一請求進入playersRoute");
  next();
});

// ======================== routes ========================

// 測試用
router.get("/testAPI", async (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 篩選總共有幾個team (條件式搜尋用)
router.get("/totalTeam", async (req, res) => {
  try {
    let result = await connection.queryAsync(
      "SELECT team_name FROM players GROUP BY team_name"
    );

    // 送回前端
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(400).send({ success: false, errorMsg: error });
  }
});

// 搜尋
router.get("/search", async (req, res) => {
  let {
    name,
    team_name,
    page = 1,
    perPage = 15,
    order_by = "points_per_game", // 根據哪個欄位排序
    order_type = "DESC", // 升冪 / 降冪
  } = req.query;

  // 將name變成模糊搜尋格式
  name = name ? `%${name}%` : undefined;
  // 如果這次傳來的是all(等於不依照隊伍搜尋)，就變成undefined
  team_name = team_name === "all" ? undefined : team_name;

  try {
    let result;
    let dataCount;
    // 球隊名稱+球員一起搜尋
    if (team_name && name) {
      result = await connection.queryAsync(
        `SELECT * FROM players WHERE name LIKE ? AND team_name = ? ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ?`,
        [name, team_name, Number(perPage), (Number(page) - 1) * perPage]
      );

      // 計算總共有幾筆 (分頁用)
      dataCount = await connection.queryAsync(
        "SELECT COUNT(id) dataCount FROM players WHERE name LIKE ? AND team_name = ?",
        [name, team_name]
      );
    }
    // 只搜球員
    else if (name) {
      result = await connection.queryAsync(
        `SELECT * FROM players WHERE name LIKE ? ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ?`,
        [name, Number(perPage), (Number(page) - 1) * perPage]
      );

      // 計算總共有幾筆 (分頁用)
      dataCount = await connection.queryAsync(
        "SELECT COUNT(id) dataCount FROM players WHERE name LIKE ?",
        [name]
      );
    }
    // 只搜球隊名稱
    else if (team_name) {
      result = await connection.queryAsync(
        `SELECT * FROM players WHERE team_name = ? ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ?`,
        [team_name, Number(perPage), (Number(page) - 1) * perPage]
      );

      // 計算總共有幾筆 (分頁用)
      dataCount = await connection.queryAsync(
        "SELECT COUNT(id) dataCount FROM players WHERE team_name = ?",
        [team_name]
      );
    }
    // 單純排序 不搜尋
    else {
      result = await connection.queryAsync(
        `SELECT * FROM players  ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ?`,
        [Number(perPage), (Number(page) - 1) * perPage]
      );

      // 計算總共有幾筆 (分頁用)
      dataCount = await connection.queryAsync(
        "SELECT COUNT(id) dataCount FROM players"
      );
    }

    // 送回前端
    res
      .status(200)
      .send({ success: true, data: result, dataCount: dataCount[0] });
  } catch (error) {
    res.status(400).send({ success: false, errorMsg: error });
  }
});

// 拿到所有球員<=15人的球隊
router.get("/teamLess15Players", async (req, res) => {
  try {
    // 先拿到所有player
    let players = await connection.queryAsync(
      "SELECT id, team_name FROM players"
    );

    // 依照隊伍排好
    let sortedPlayers = {};
    players.forEach((item) => {
      if (sortedPlayers[item.team_name]) {
        sortedPlayers[item.team_name].push(item);
      } else {
        sortedPlayers[item.team_name] = [item];
      }
    });

    // 排除所有沒超過15人的隊伍
    let finalPlayer = {};
    for (let i in sortedPlayers) {
      if (sortedPlayers[i].length <= 15) {
        finalPlayer[i] = sortedPlayers[i];
      }
    }

    // 送回前端
    res.status(200).send({ success: true, data: finalPlayer });
  } catch (error) {
    console.log(error);
  }
});

// 依照頁數拿到指定資料
router.get("/", async (req, res) => {
  // 拿取當前頁碼及筆數
  let {
    page = 1,
    perPage = 15,
    order_by = "points_per_game", // 根據哪個欄位排序
    order_type = "DESC", // 升冪 / 降冪
  } = req.query;

  try {
    // 拿指定頁碼的資料
    let result = await connection.queryAsync(
      `SELECT * FROM players ORDER BY ${order_by} ${order_type} LIMIT ? OFFSET ?`,
      [Number(perPage), (Number(page) - 1) * perPage]
    );

    // 計算總共有幾筆 (分頁用)
    let dataCount = await connection.queryAsync(
      "SELECT COUNT(id) dataCount FROM players"
    );

    // 送回前端
    res
      .status(200)
      .send({ success: true, data: result, dataCount: dataCount[0] });
  } catch (error) {
    res.status(400).send({ success: false, errorMsg: error });
  }
});

module.exports = router;
