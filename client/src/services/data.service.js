import axios from "axios";
// import dotenv from "dotenv";
// import { API_URL } from "../config/config";
// dotenv.config();

class DataService {
  // 依照頁碼拿到對應資料
  getData(page, perPage) {
    return axios.get(
      `http://localhost:9999/api/players?page=${page}&perPage=${perPage}`,
      {
        withCredentials: true,
      }
    );
  }

  // 拿到所有球隊名稱
  getAllTeams() {
    return axios.get(`http://localhost:9999/api/players/totalTeam`, {
      withCredentials: true,
    });
  }

  // 依照頁碼拿到對應資料
  search({ keywords, team_name, page, perPage }) {
    if (page && perPage) {
      return axios.get(
        `http://localhost:9999/api/players/search?name=${keywords}&team_name=${team_name}&page=${page}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
    } else {
      return axios.get(
        `http://localhost:9999/api/players/search?name=${keywords}&team_name=${team_name}`,
        {
          withCredentials: true,
        }
      );
    }
  }
}

export default new DataService();
