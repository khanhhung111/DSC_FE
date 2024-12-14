import React from 'react';
import styles from './TestimonialCard.module.css';

function TestimonialCard({ title, description, linkText }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <a href="#" className={styles.link}>{linkText}</a>
    </div>
  );
}

export default TestimonialCard;