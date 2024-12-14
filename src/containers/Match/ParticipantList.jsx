import React from "react";
import styles from "./Match.module.css";

const participants = [
  { id: 1, name: "Nguyễn Văn A", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/94da0cf84f5eb343f8bc6cdb4b69649cbe87f64ff3f061fd39a44e80515c0240?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" },
  { id: 2, name: "Nguyễn Văn B", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9481bfceea552353a8498ad793fc7dc559126ff545e94048bbd0d8cf0ed9133b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" },
  { id: 3, name: "Nguyễn Văn C", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9481bfceea552353a8498ad793fc7dc559126ff545e94048bbd0d8cf0ed9133b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" },
  { id: 4, name: "Nguyễn Văn D", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9481bfceea552353a8498ad793fc7dc559126ff545e94048bbd0d8cf0ed9133b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" },
  { id: 5, name: "Nguyễn Văn E", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9481bfceea552353a8498ad793fc7dc559126ff545e94048bbd0d8cf0ed9133b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" }
];

function ParticipantList() {
  return (
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách thành viên</h2>
      <ul className={styles.participantList}>
        {participants.map((participant) => (
          <li key={participant.id} className={styles.participantItem}>
            <img src={participant.image} alt={`${participant.name}'s avatar`} className={styles.participantAvatar} />
            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>{participant.name}</h3>
              <p className={styles.participantDetails}>Chức năng: • Trình độ: </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ParticipantList;