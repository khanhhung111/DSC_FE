import React from "react";
import styles from "./MemberMatch.module.css";

function ParticipantList({ memberdata }) {
  const data = memberdata?.memberInfo?.$values || [];

  // Lọc dữ liệu để chỉ lấy những UserID duy nhất
  const uniqueData = [
    ...new Map(data.map((participant) => [participant.userId, participant])).values(),
  ];

  return (
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách thành viên</h2>
      <ul className={styles.participantList}>
        {uniqueData.map((participant, index) => {
          // Đảm bảo các thuộc tính của participant không bị undefined
          const fullName = participant?.fullName || "Tên không xác định";
          const roleActivity = participant?.roleActivity || "Chức năng không xác định";
          const levelName = participant?.levelName || "Trình độ không xác định";

          // Sử dụng avatar mặc định nếu không có avatar
          const avatarUrl = participant?.avatarUser || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac";

          return (
            <li key={index} className={styles.participantItem}>
              <img
                src={avatarUrl} // Hiển thị ảnh đại diện hoặc ảnh mặc định
                alt={`${fullName}'s avatar`} 
                className={styles.participantAvatar}
              />
              <div className={styles.participantInfo}>
                <h3 className={styles.participantName}>{fullName}</h3>
                <p className={styles.participantDetails}>
                  Chức năng: {roleActivity} • Trình độ: {levelName}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ParticipantList;
