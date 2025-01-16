import React from 'react';
import styles from './UpdateEventButton.module.css';

function UpdateEventButton({ onClick }) {
  return (
    <button className={styles.createEventButton} onClick={onClick}>
      {/* <img src="..." alt="" className={styles.buttonIcon} /> */}
      <span className={styles.buttonText}>CHỈNH SỬA KÈO</span>
    </button>
  );
}

export default UpdateEventButton;