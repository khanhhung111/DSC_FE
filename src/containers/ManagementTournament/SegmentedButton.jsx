import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SegmentedButton.module.css';

const SegmentedButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.segmentedButtonBlock}>
      <div className={styles.segmentedButton}>
        {/* Nút "Kèo tôi tham gia" */}
        <button
          className={`${styles.segment} ${styles.segmentStart}`}
          onClick={() => navigate('/managementtournament')}
        >
          <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d463d07f35821ef253604cac8153187c3397fac6d7fa47830208c70fbc661f5c?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
        alt=""
        className={styles.segmentIcon}
      />
         Đang Tham Gia
        </button>

        {/* Nút "Kèo của tôi" */}
        <button
          className={`${styles.segment} ${styles.segmentEnd}`}
          onClick={() => navigate('/Tournamentall')}
        >
           
          Chưa Tham Gia
        </button>
      </div>
    </div>
  );
};

export default SegmentedButton;
