import React from 'react';
import styles from './NavigationPill.module.css';

function NavigationPill({ text, href }) {
  return (
    <a href={href} className={styles.navigationPill}>
      {text}
    </a>
  );
}

export default NavigationPill;