import React from "react";
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";

function ClubList({ clubs }) {
  if (clubs.length === 0) {
    return <div>Không có câu lạc bộ nào phù hợp</div>;
  }

  return (
    <ul className={styles.clubList}>
      {clubs.map((club) => (
        <li key={club.clubId}>
          <ClubItem
            clubId={club.clubId}
            clubName={club.clubName}
            levelName={club.levelName}
            status={club.status}
            userCount={club.userCount}
            avatar={club.avatar}
          />
        </li>
      ))}
    </ul>
  );
}

export default ClubList;
