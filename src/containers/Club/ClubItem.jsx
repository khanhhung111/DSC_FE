import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./ClubItem.module.css";

function ClubItem({ clubId, clubName, userCount, levelName, status, avatar }) {
  const navigate = useNavigate(); // Khởi tạo navigate
  const getStatusText = (status) => {
    switch (status) {
      case "Active":
        return "Đang Hoạt Động";
      case "Inactive":
        return "Dừng Hoạt Động";
      case "Expired":
        return "Hết Hạn";
      default:
        return status;
    }
  };
  // Đặt màu cho chữ dựa trên trạng thái
  const statusTextClass = status === "Active" ? styles.activeText : styles.inactiveText;

  // Hàm xử lý sự kiện khi người dùng click vào nút "Xem thêm"
  const handleViewMore = () => {
    navigate(`/detailClub/${clubId}`); // Điều hướng đến /detailClub/clubId
  };

  return (
    <article className={styles.clubItem}>
      {/* Avatar bên trái */}
      <img src={avatar} alt={`${clubName} avatar`} className={styles.clubLogo} />
      
      <div className={styles.clubInfo}>
        <h2 className={styles.clubName}>{clubName}</h2>
        <p className={styles.clubDetails}>
          {userCount} thành viên • Cấp độ: {levelName}
        </p>
        <p className={styles.clubStatus}>
        Trạng thái: <span className={statusTextClass}>{getStatusText(status)}</span>
        </p>
      </div>
      <button className={styles.viewMoreButton} onClick={handleViewMore}>Xem thêm</button>
    </article>
  );
}

export default ClubItem;
