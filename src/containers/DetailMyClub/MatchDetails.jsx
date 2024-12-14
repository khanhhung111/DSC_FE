import React from "react";
import styles from './MatchDetails.module.css';
import { amountFormatting } from '../../utils/formatHelper';
import { UserOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';

function MatchDetails({ matchData }) {
  console.log("match", matchData);
  const data = matchData;

  return (
    <section className={styles.matchDetails}>
      <div className={styles.matchContent}>
        {/* Avatar bên trái */}
        <img
          src={data.avatar}
          alt="Club Avatar"
          className={styles.avatar}
        />

        {/* Thông tin bên phải */}
        <div className={styles.clubInfo}>
          <h1 className={styles.matchTitle}>{data?.activityName}</h1>

          {/* Tên Club */}
          <div className={styles.clubName}>{data.clubName}</div>  {/* Tên Club */}

          {/* Trình Độ */}
          <div className={styles.levelName}><TrophyOutlined className={styles.icon} /> Trình Độ: {data.levelName}</div>  {/* Trình Độ */}

          {/* Số thành viên */}
          <div className={styles.infoItem}>
          <UserOutlined className={styles.icon} />
            <span> {data.userCount} thành viên</span>
          </div>

          {/* Trạng thái */}
          <div className={styles.infoItem}>
          <BulbOutlined className={styles.icon} />
            <span>
              Trạng thái:
              <span className={styles.statusSpace}> </span> {/* Thêm khoảng trắng */}
              <span
                className={data.status === "Active" ? styles.activeStatus : styles.inactiveStatus}
              >
                {data.status}
              </span>
            </span>
          </div>

          {/* Vị trí */}
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;
