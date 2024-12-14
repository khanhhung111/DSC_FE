import React from "react";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast
import styles from "./ClubItem.module.css";
import { dateFormatting } from "../../utils/formatHelper";


function ClubItem({ tournamentId, name, numberOfTeams, location, startDate, avatar }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm xử lý sự kiện khi người dùng click vào nút "Xem thêm"
  const handleViewMore = () => {
    navigate(`/detailtournamentjoin/${tournamentId}`); // Điều hướng đến /detailClub/clubId
  };


  return (
    <article className={styles.clubItem}>
      {/* Avatar bên trái */}
      <img src={avatar} alt={`${name} avatar`} className={styles.clubLogo} />

      {/* Thông tin giải đấu */}
      <div className={styles.clubInfo}>
        <h2 className={styles.name} style={{ fontSize: "24px", fontWeight: 500 }}>{name}</h2>
        
        {/* Ngày bắt đầu */}
        <p className={styles.clubDetails}>
          <CalendarOutlined style={{ marginRight: "8px", color: "#faad14" }} />
          Ngày bắt đầu: {dateFormatting(startDate)}
        </p>

        {/* Số đội */}
        <p className={styles.clubDetails}>
          <UserOutlined style={{ marginRight: "8px", color: "green" }} />
          {numberOfTeams} đội
        </p>

        {/* Khu vực */}
        <p className={styles.clubStatus}>
          <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          Khu vực: {location}
        </p>
      </div>

      <button className={styles.viewMoreButton} onClick={handleViewMore}>
        Xem Thêm
      </button>
    </article>
  );
}

export default ClubItem;
