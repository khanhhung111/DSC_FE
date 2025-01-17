import React, { useState, useEffect } from 'react';
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";

function ClubList({ clubs , isSearching}) {
  if (clubs.length === 0) {
    return (
      <div className={styles.noResults}>
        {isSearching 
          ? "Không tìm thấy giải đấu nào phù hợp"
          : "Không có giải đấu nào"}
      </div>
    );
  }

  return (
    <ul className={styles.clubList}>
      {clubs.map((club) => (
        <li key={club.tournamentId}>
          <ClubItem
            tournamentId={club.tournamentId}
            name={club.name}
            numberOfTeams={club.numberOfTeams}
            location={club.location}
            startDate={club.startDate}
            avatar={club.avatar || 'default-avatar-url'} // Đặt avatar mặc định nếu không có
          />
        </li>
      ))}
    </ul>
  );
};

export default ClubList;
