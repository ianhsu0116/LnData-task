# LnData Web Engineer Pre-Test

## Task說明
players.json內為nba球員名單，請以此份資料，依照以下系統需求完成NBA球員查詢系統。

### 資料庫
1. 請在本機端建置MySQL資料庫，依照players.json內的資料格式自行設計table schema，db名稱為nba，編碼為utf-8，table名稱為players。

### API
1. 請以Node.js搭配Express實作rest api project，連接MySQL內的nba資料庫取得資料，api port設定為9999，回傳格式為JSON。
2. 寫一支程式名為importData.js，執行後可將players.json內的球員資料全部匯入players資料表中。資料匯入完成後，請將資料庫及內含的資料export成nba.sql(必須可以匯入)。
3. 依照前端系統需求設計所需的API，API數量、名稱均不限(須滿足前端需求)，唯一要求是取得球員list的API必須有分頁的功能(當次request只回傳要顯示的資料量)。
4. 前端頁面透過呼叫API的方式取得資料庫中的資料並呈現在頁面上。

### 前端系統介面
#### 介面佈局
1. Header：左邊顯示LnData的logo(https://www.lndata.com/images/logo/logo_160.png)，右邊顯示Avatar示意圖
2. Menu選單：顯示「Player List」功能
3. Main Content：主畫面中有搜尋條件及表格兩個區塊，在搜尋條件中設定搜尋條件後送出，表格內會顯示相對應的資料。
![](https://i.imgur.com/vOp928r.png)

#### 介面需求
1. 表格需可依不同欄位排序，可排序欄位如示意圖所示，預設以Points欄位排序，最高的在最前面，資料預設為顯示全部球員名單。
2. 表格需有分頁功能，每頁顯示15筆資料，顯示欄位如示意圖所示。
3. 搜尋條件如下：
 + Team -> 球隊名稱，可選擇ALL或是單一球隊，球隊名稱請從附件資料中整理出來。
 + keywords -> 可輸入關鍵字比對球員名稱(部分比對)
4. 按下「Search」按鈕後依照搜尋條件顯示符合條件的資料於表格中。
5. 按下每筆資料的Detail圖示，會跳至另一頁面顯示該球員的所有詳細資料，如以下示意圖，顯示的欄位名稱與資料key值對應關係請參閱下方對應表。
![](https://i.imgur.com/o76uYrR.png)

6. 按下「Show Charts」按鈕後，會跳出視窗，以圓餅圖或柱狀圖(會是其他形式的圖表)，顯示球員人數在15人以下(含15人)的球隊每支球隊的人數統計資料。
![](https://i.imgur.com/yXpRQSq.png)

7. 請依照您的喜好與標準美化系統介面, 色彩樣式不拘。


#### 資料格式與介面顯示對照表：

|排序 |      JSON欄位名稱              |     介面顯示  | 
|--- |          -----                |     -----    | 
| 1  | name                          |   Name       | 
| 2  | team_acronym                  |   Team       |
| 3  | team_name                     |   TeamName   |
| 4  | games_played                  |   Games      |
| 5  | minutes_per_game              |   MPG        |
| 6  | field_goals_attempted_per_game|   FGA        |
| 7  | field_goals_made_per_game     |   FGM        |
| 8  | field_goal_percentage         |   FG%        |
| 9  | free_throw_percentage         |   FT%        |
| 10 | three_point_attempted_per_game|   3PA        |
| 11 | three_point_made_per_game     |   3PM        |
| 12 | three_point_percentage        |   3PT%       |
| 13 | points_per_game               |   Points     |
| 14 | offensive_rebounds_per_game   |   ORebounds  |
| 15 | defensive_rebounds_per_game   |   DRebounds  |
| 16 | rebounds_per_game             |   Rebounds   |
| 17 | assists_per_game              |   Assists    |
| 18 | steals_per_game               |   Steals     |
| 19 | blocks_per_game               |   Blocks     |
| 20 | turnovers_per_game            |   Turnovers  |
| 21 | player_efficiency_rating      |   Efficiency |

EX.頁面上的「Team」欄位請顯示json資料中的team_acronym ...，以此類推。

----
### 注意事項：
1. 請以Node.js + express + ES6完成API專案，以React.js + ES6 完成前端頁面專案，兩個專案也可合併成一個專案。
2. 不限制使用的函式庫及程式編寫方式
3. 程式需可執行，並提供簡單的程式說明及架設文件

----
project完成後請將project及相關文件打包寄至 rick.chen@lndata.com<br>
Please send back your project and document to rick.chen@lndata.com