import React from "react";
import styles from "./LocationMap.module.css";

function LocationMap({ matchData }) {
  const data = matchData;

  return (
    <section className={styles.locationContainer}>
      {/* Card Container */}
      <div className={styles.card}>
        <h2 className={styles.locationTitle}>Danh Sách Quản Trị Viên:</h2>

        {/* Tên và Avatar Quản Trị Viên */}
        <div className={styles.adminContainer}>
          <img
            src={data.avatarLeader}
            alt="Admin Avatar"
            className={styles.adminAvatar}
          />
          <span className={styles.adminName}>{data.leaderFullName}</span>
        </div>
      </div>
    </section>
  );
}

export default LocationMap;
