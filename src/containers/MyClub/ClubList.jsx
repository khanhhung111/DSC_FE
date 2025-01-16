import React, { useState, useEffect } from 'react';
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";
import moment from 'moment';

function ClubList({ clubs , isSearching}) {
  if (clubs.length === 0) {
    return (
      <div className={styles.noResults}>
        {isSearching 
          ? "Không tìm thấy câu lạc bộ nào phù hợp"
          : "Không có câu lạc bộ nào"}
      </div>
    );
  }
  return (
    <ul className={styles.clubList}>
      {clubs.map((club) => {
        // Tính toán ngày mới (30 ngày sau ngày tạo)
        const expirationDate = moment(club.createDate).add(30, 'days').format('DD-MM-YYYY');

        return (
          <li key={club.clubId}>
            <ClubItem 
              clubId={club.clubId}
              clubName={club.clubName}
              levelName={club.levelName}
              status={club.status}
              userCount={club.userCount}
              avatar={club.avatar}
              createdate={expirationDate} // Gửi ngày hết hạn thay vì ngày tạo
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ClubList;