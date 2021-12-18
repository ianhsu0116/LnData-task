import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Pagination = (props) => {
  const { defaultPage = 1, totalPages = 10, handleChangePage } = props;

  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return ""
  const team_name = new URLSearchParams(search).get("team_name") || "";
  const keywords = new URLSearchParams(search).get("keywords") || "";

  // 當前所在頁面
  const [currentPage, setCurrentPage] = useState(Number(defaultPage));

  // 要顯示的按鈕數量
  const [pageArr, setPageArr] = useState([1]);

  // 當 totalPages 改變時
  useEffect(() => {
    let newArr = [];
    let pageCopy = currentPage;

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

    // 第一頁 || 最後一頁
    if (currentPage === 1 || currentPage === totalPages) {
      // 不做任何事，直接return
      return;
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
        {pageArr.map((i, index) => (
          <Link
            key={index}
            to={
              team_name && keywords
                ? `/?page=${i}&perPage=15&team_name=${team_name}&keywords=${keywords}`
                : team_name
                ? `/?page=${i}&perPage=15&team_name=${team_name}`
                : keywords
                ? `/?page=${i}&perPage=15&keywords=${keywords}`
                : `/?page=${i}&perPage=15`
            }
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
      </ul>
    </div>
  );
};
