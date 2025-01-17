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
      {clubs.map((tournament) => (
        <li key={tournament.tournamentId}>
          <ClubItem
            tournamentId={tournament.tournamentId}
            name={tournament.name}
            numberOfTeams={tournament.numberOfTeams}
            location={tournament.location}
            startDate={tournament.startDate}
            avatar={tournament.avatar || 'default-avatar-url'} // Đặt avatar mặc định nếu không có
            tournamentType={tournament.tournamentType}
          />
        </li>
      ))}
    </ul>
  );
};

export default ClubList;
