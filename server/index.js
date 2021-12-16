const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./utils/database");
const cors = require("cors");
//const session = require("express-session");

app.use((req, res, next) => {
  let current = new Date();
  console.log("有人來訪" + current.toLocaleString());
  next();
});

app.use(
  cors({
    // 因為開放跨源讀寫 cookie，所以必須要設定好源(origin)
    // 限定來源
    origin: ["http://localhost:3000"],
    // 允許跨源存取 cookie
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// players路由
const playersRoute = require("./routes/players");
app.use("/api/players", playersRoute);

app.get("/", (req, res) => {
  res.send("home");
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, code: "不知名錯誤！", message: err });
});

app.listen(9999, () => {
  connection.connect();
  console.log("server is running on port 9999");
});
