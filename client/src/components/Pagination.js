import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Pagination = (props) => {
  const { totalPages = 10, handleChangePage } = props;

  // 當前所在頁面
  const [currentPage, setCurrentPage] = useState(1);
  // 要顯示的按鈕數量
  const [pageArr, setPageArr] = useState([1]);

  // 拿到totalPages後，生成totalPagesArr
  useEffect(() => {
    let newArr = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        newArr.push(i + 1);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        newArr.push(i + 1);
      }
    }

    setPageArr(newArr);
  }, [totalPages]);

  // 頁碼改變時
  useEffect(() => {
    // 最後一頁 || 第一頁
    if (currentPage === totalPages || currentPage === 1) {
    }

    // 倒數第二頁
    else if (currentPage === totalPages - 1) {
      let newArr = [];
      let pageCopy = currentPage;

      // 重新組裝一組頁碼array
      for (let i = pageCopy - 3; i <= pageCopy + 1; i++) {
        newArr.push(i);
      }

      // 放入state
      setPageArr(newArr);
    }

    // 第二頁
    else if (currentPage === 2) {
      let newArr = [];
      let pageCopy = currentPage;

      // 重新組裝一組頁碼array
      for (let i = pageCopy - 1; i <= pageCopy + 3; i++) {
        newArr.push(i);
      }

      // 放入state
      setPageArr(newArr);
    }

    // 其他情況
    else {
      let newArr = [];
      let pageCopy = currentPage;

      // 重新組裝一組頁碼array
      for (let i = pageCopy - 2; i <= pageCopy + 2; i++) {
        newArr.push(i);
      }

      // 放入state
      setPageArr(newArr);
    }
  }, [currentPage]);

  return (
    <div className="Pagination">
      <ul className="Pagination-group">
        {pageArr.map((i, index) => (
          <Link
            key={index}
            to={`/?page=${i}&perPage=15`}
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
