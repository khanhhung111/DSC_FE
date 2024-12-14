
import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <form className={styles.searchBar} role="search">
      <label htmlFor="clubSearch" className={styles.visuallyHidden}>
        Tìm kiếm câu lạc bộ
      </label>
      <input
        type="search"
        id="clubSearch"
        className={styles.searchInput}
        placeholder="Tìm kiếm"
        aria-label="Tìm kiếm câu lạc bộ"
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
