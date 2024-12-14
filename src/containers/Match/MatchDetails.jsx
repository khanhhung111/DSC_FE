import React from "react";
import styles from "./Match.module.css";
import { useNavigate } from 'react-router-dom';
function MatchDetails() {
  const navigate = useNavigate();
  return (
    <section className={styles.matchDetails}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="Pickleball match" className={styles.matchImage} />
      <div className={styles.matchInfo}>
        <h1 className={styles.matchTitle}>Pickleball Match</h1>
        <div className={styles.matchMeta}>
          <p className={styles.matchLevel}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a4b5a0eddec96f9735cdb5d7db770a1698166c27664b7ebed9da4cbd4d589bd?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="" className={styles.metaIcon} />
            All levels
          </p>
          <p className={styles.matchLocation}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a37b2e1b41f74422366e59f725b4a4a78cf3b432e93f670bcbb053b5b9674fe1?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="" className={styles.metaIcon} />
            Sân bóng rổ
          </p>
        </div>
        <p className={styles.participantCount}>Số người tham gia: 5/12</p>
        <p className={styles.matchPrice}>$ 30,000đ</p>
        <div className={styles.matchActions}>
          <button className={styles.joinButton} onClick={() => navigate('#')}>Tham gia</button>
          <button className={styles.participantsButton} onClick={() => navigate('/match')}>Người tham gia</button>
          <button className={styles.resultsButton} onClick={() => navigate('/resultmatch')}>Kết quả</button>
        </div>
      </div>
      <div className={styles.matchTeams}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a55b5d8d827e522a3dbb4d166371e83b7be7825a7a7deb5eebd7459c9194309b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="" className={styles.teamsIcon} />
        <p className={styles.teamsInfo}>4 teams - 6-12 members/team</p>
      </div>
    </section>
  );
}

export default MatchDetails;