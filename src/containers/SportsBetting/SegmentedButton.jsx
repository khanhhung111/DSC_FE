import React from 'react';
import styles from './SegmentedButton.module.css';

const SegmentedButton = () => {
  const segments = ['Tất cả', 'Bóng đá', 'Bóng chuyền', 'Cầu lông', 'Pickleball'];

  return (
    <div className={styles.segmentedButtonBlock}>
      <div className={styles.segmentedButton}>
        {segments.map((segment, index) => (
          <button
            key={index}
            className={`${styles.segment} ${index === 0 ? styles.segmentStart : ''} ${index === segments.length - 1 ? styles.segmentEnd : ''}`}
          >
            {index === 0 && <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d463d07f35821ef253604cac8153187c3397fac6d7fa47830208c70fbc661f5c?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="" className={styles.segmentIcon} />}
            {segment}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedButton;