import React from "react";
import styles from "./MemberMatch.module.css";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';
function MatchDetails({ memberdata }) {
  const navigate = useNavigate();
  const data = memberdata;
  console.log("memberdata",data)

  // Kiểm tra xem data?.activity có tồn tại hay không
  if (!data?.clubName) {
    return (
      <section className={styles.matchDetails}>
        <h1>Chưa có thành viên tham gia</h1>
      </section>
    );
  }

  return (
    <section className={styles.matchDetails}>
      <img
        src={data.avatar}
        alt="Pickleball match"
        className={styles.matchImage}
        styles
      />
      <div className={styles.matchInfo}>
        <h1 className={styles.matchTitle}>{data.clubName}</h1>
        <div className={styles.levelName}><TrophyOutlined className={styles.icon} /> Trình Độ: {data.levelName}</div>  {/* Trình Độ */}
        <div className={styles.infoItem}>
          <UserOutlined className={styles.icon} />
            <span> {data.userCount} thành viên</span>
          </div>
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
        <div className={styles.matchActions}>
          <button className={styles.participantsButton} onClick={() => navigate(`/updateclub/${data.clubId}`)}>Chỉnh Sửa</button>
          <button className={styles.joinButton} onClick={() => navigate(`/membermyclub/${data.clubId}`)}>Thành Viên</button>
          <button className={styles.participantsButton} onClick={() => navigate(`/sportbettingclub/${data?.clubId}`)}>Kèo</button>
          <button
        className={styles.stopButton} // class thêm cho nút dừng hoạt động
        onClick={() => navigate('/resultmatch')}
      >
        Dừng Hoạt Động
      </button>
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;
