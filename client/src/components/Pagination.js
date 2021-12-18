import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Pagination = (props) => {
  const { defaultPage = 1, totalPages = 10, handleChangePage } = props;

  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return ""
  const team_name = new URLSearchParams(search).get("team_name") || "";
  const keywords = new URLSearchParams(search).get("keywords") || "";
  const order_by = new URLSearchParams(search).get("order_by") || "";
  const order_type = new URLSearchParams(search).get("order_type") || "";

  // 當前所在頁面
  const [currentPage, setCurrentPage] = useState(1);

  // 要顯示的按鈕數量
  const [pageArr, setPageArr] = useState([1]);

  // 當網址列的頁碼改變，就重設currentPage，以觸發下方的effect
  useEffect(() => {
    setCurrentPage(Number(defaultPage));
  }, [defaultPage]);

  // 當 totalPages 改變時
  useEffect(() => {
    let newArr = [];
    let pageCopy = currentPage;

    // 防止輸入的頁碼 > 總頁碼
    // 若是trun, 直接導回去第一頁
    if (currentPage > totalPages) pageCopy = 1;

    // 如果總頁數小於五
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        newArr.push(i + 1);
      }
    }

    // 第一頁
    else if (currentPage === 1) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy; i <= pageCopy + 4; i++) {
        newArr.push(i);
      }
    }

    // 最後一頁
    else if (currentPage === totalPages) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 4; i <= pageCopy; i++) {
        newArr.push(i);
      }
    }

    // 倒數第二頁
    else if (currentPage === totalPages - 1) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 3; i <= pageCopy + 1; i++) {
        newArr.push(i);
      }
    }

    // 第二頁
    else if (currentPage === 2) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 1; i <= pageCopy + 3; i++) {
        newArr.push(i);
      }
    }

    // 其他情況
    else {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 2; i <= pageCopy + 2; i++) {
        newArr.push(i);
      }
    }
    // 放入state
    setPageArr(newArr);
  }, [totalPages]);

  // 頁碼改變時
  useEffect(() => {
    let newArr = [];
    let pageCopy = currentPage;

    console.log(pageCopy);
    // 防止輸入的頁碼 > 總頁碼
    // 若是trun, 直接導回去第一頁
    if (currentPage > totalPages) pageCopy = 1;

    if (currentPage === 1 || currentPage === totalPages) {
      // 第一頁 || 最後一頁
      // 總頁數 <= 5，不做任何事，直接return
      if (totalPages <= 5) return;

      // 第一頁
      if (currentPage === 1) {
        for (let i = pageCopy; i <= pageCopy + 4; i++) {
          newArr.push(i);
        }
      }

      // 最後一頁
      else if (currentPage === totalPages) {
        for (let i = pageCopy - 4; i <= pageCopy; i++) {
          newArr.push(i);
        }
      }
    }

    // 倒數第二頁
    else if (currentPage === totalPages - 1) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 3; i <= pageCopy + 1; i++) {
        newArr.push(i);
      }
    }

    // 第二頁
    else if (currentPage === 2) {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 1; i <= pageCopy + 3; i++) {
        newArr.push(i);
      }
    }

    // 其他情況
    else {
      // 重新組裝一組頁碼array
      for (let i = pageCopy - 2; i <= pageCopy + 2; i++) {
        newArr.push(i);
      }
    }
    // 放入state
    setPageArr(newArr);
  }, [currentPage]);

  return (
    <div className="Pagination">
      <ul className="Pagination-group">
        {/* 回到第一頁 */}
        {currentPage > 3 && (
          <Link
            to={`/?page=${1}&perPage=15${
              team_name ? `&team_name=${team_name}` : ""
            }${keywords ? `&keywords=${keywords}` : ""}${
              order_by ? `&order_by=${order_by}` : ""
            }${order_type ? `&order_type=${order_type}` : ""}`}
            className={`Pagination-group-item`}
            className={`Pagination-group-item`}
            onClick={() => {
              setCurrentPage(1);
              handleChangePage(1);
            }}
          >
            ...
          </Link>
        )}
        {pageArr.map((i, index) => (
          <Link
            key={index}
            to={`/?page=${i}&perPage=15${
              team_name ? `&team_name=${team_name}` : ""
            }${keywords ? `&keywords=${keywords}` : ""}${
              order_by ? `&order_by=${order_by}` : ""
            }${order_type ? `&order_type=${order_type}` : ""}`}
            className={`Pagination-group-item ${
              currentPage === i ? "Pagination-group-itemActive" : ""
            }`}
            onClick={() => {
              setCurrentPage(i);
              handleChangePage(i);
            }}
          >
            {i}
          </Link>
        ))}

        {/* 跳到最後頁 */}
        {currentPage < totalPages - 2 && (
          <Link
            to={`/?page=${totalPages}&perPage=15${
              team_name ? `&team_name=${team_name}` : ""
            }${keywords ? `&keywords=${keywords}` : ""}${
              order_by ? `&order_by=${order_by}` : ""
            }${order_type ? `&order_type=${order_type}` : ""}`}
            className={`Pagination-group-item`}
            onClick={() => {
              setCurrentPage(totalPages);
              handleChangePage(totalPages);
            }}
          >
            ...
          </Link>
        )}
      </ul>
    </div>
  );
};
