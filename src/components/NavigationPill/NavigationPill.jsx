import React from 'react';
import styles from './NavigationPill.module.css';

function NavigationPill({ text, onClick }) {
  return (
    <button className={styles.pill} onClick={onClick}>
      {text}
    </button>
  );
}

export default NavigationPill;
