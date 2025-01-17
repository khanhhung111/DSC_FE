import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setKeyword(newValue);
    // Nếu input trống, gọi onSearch với chuỗi rỗng để reset về trạng thái ban đầu
    if (newValue === "") {
      onSearch("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Chỉ thực hiện tìm kiếm khi có keyword
    if (keyword.trim()) {
      onSearch(keyword);
    } else {
      // Nếu không có keyword, reset về trạng thái ban đầu
      onSearch("");
    }
  };
  
  // Optional: Đảm bảo trạng thái ban đầu khi component được mount
  useEffect(() => {
    if (!keyword) {
      onSearch("");
    }
  }, []);

  return (
    <form className={styles.searchBar} role="search" onSubmit={handleSearch}>
      <label htmlFor="clubSearch" className={styles.visuallyHidden}>
        Tìm kiếm
      </label>
      <input
        type="search"
        id="clubSearch"
        className={styles.searchInput}
        placeholder="Tìm kiếm giải đấu"
        value={keyword}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className={styles.searchButton}
        aria-label="Thực hiện tìm kiếm"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8078b41ec0fe3376c595ddb828f65d73a14699d5cbf96954433302b524a7c6fc?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt=""
          className={styles.searchIcon}
        />
      </button>
    </form>
  );
}

export default SearchBar;