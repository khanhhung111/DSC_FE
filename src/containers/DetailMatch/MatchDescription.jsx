import React from "react";
import styles from './MatchDescription.module.css';

function MatchDescription() {
  return (
    <section className={styles.matchDescription}>
      <h2 className={styles.descriptionTitle}>2025 PLAY MEMBERSHIP Pickball</h2>
      <h3>Tiêu chuẩn về sân và trang thiết bị</h3>
      <ul>
        <li>Sân chơi pickleball có kích thước 6m x 13,5m gần giống với sân đôi cầu lông.</li>
        <li>Vợt pickleball được làm từ các loại vật liệu tổng hợp và polymer.</li>
        <li>Lưới vợt không được cao hơn 80cm.</li>
      </ul>
      <h3>Luật giao bóng</h3>
      <ul>
        <li>Sân chơi pickleball có kích thước 6m x 13,5m gần giống với sân đôi cầu lông.</li>
        <li>Vợt pickleball được làm từ các loại vật liệu tổng hợp và polymer.</li>
        <li>Lưới vợt không được cao hơn 80cm.</li>
      </ul>
    </section>
  );
}

export default MatchDescription;