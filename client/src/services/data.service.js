import axios from "axios";
import { API_URL } from "../config/config";

class DataService {
  // 依照頁碼拿到對應資料
  getData(page, perPage, order_by, order_type) {
    if (order_by || order_type) {
      return axios.get(
        `${API_URL}/players?page=${page}&perPage=${perPage}&order_by=${order_by}&order_type=${order_type}`,
        {
          withCredentials: true,
        }
      );
    } else {
      return axios.get(`${API_URL}/players?page=${page}&perPage=${perPage}`, {
        withCredentials: true,
      });
    }
  }

  // 拿到所有球隊名稱
  getAllTeams() {
    return axios.get(`${API_URL}/players/totalTeam`, {
      withCredentials: true,
    });
  }

  // 依照搜尋+頁碼拿到對應資料
  search({ keywords, team_name, order_by, order_type, page, perPage }) {
    return axios.get(
      `${API_URL}/players/search?page=${page}&perPage=${perPage}${
        team_name ? `&team_name=${team_name}` : ""
      }${keywords ? `&name=${keywords}` : ""}${
        order_by ? `&order_by=${order_by}` : ""
      }${order_type ? `&order_type=${order_type}` : ""}`,
      {
        withCredentials: true,
      }
    );
  }

  // 拿到所有球員<=15人的球隊
  getLess15Players() {
    return axios.get(`${API_URL}/players/teamLess15Players`, {
      withCredentials: true,
    });
  }
}

export default new DataService();
