import React from "react";
import styles from "./MemberMatch.module.css";
import {dateFormatting} from "../../utils/formatHelper";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
function ParticipantList({ memberdata }) {
  const clubId = memberdata?.clubId;
  const data = memberdata?.users?.$values || []; // Lấy mảng các thành viên từ API
  const navigate = useNavigate(); // Khởi tạo navigate
  const handleApproveMembersClick = () => {
    // Chuyển hướng đến trang danh sách thành viên chờ duyệt
    navigate(`/approveclub/${clubId}`); // Thay thế '/pending-members' bằng URL bạn muốn chuyển tới
  };
  return (
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách thành viên</h2>
      <ul className={styles.participantList}>
        {data.map((participant, index) => (
          <li key={index} className={styles.participantItem}>
<img
  src={participant.avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"}
  alt={`${participant.avatar ? participant.avatar : 'default'}'s avatar`} // Nếu avatar không có thì hiển thị tên mặc định
  className={styles.participantAvatar}
/>

            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>{participant.fullName}</h3>
              <p className={styles.participantDetails}>
                Chức năng: {participant.role} • Ngày Tham Gia: {dateFormatting(participant.joinDate)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ParticipantList;
