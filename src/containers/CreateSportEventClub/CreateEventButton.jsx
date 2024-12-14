import React from 'react';
import styles from './CreateEventButton.module.css';

function CreateEventButton({ onClick }) {
  return (
    <button className={styles.createEventButton} onClick={onClick}>
      {/* <img src="..." alt="" className={styles.buttonIcon} /> */}
      <span className={styles.buttonText}>TẠO KÈO</span>
    </button>
  );
}

export default CreateEventButton;