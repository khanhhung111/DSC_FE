import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './TestimonialCard.module.css';

function TestimonialCard({ title, description, linkText, link }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleNavigation = () => {
    if (link) {
      navigate(link); // Chuyển hướng đến trang được chỉ định
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <button onClick={handleNavigation} className={styles.link}>
        {linkText}
      </button>
    </div>
  );
}

export default TestimonialCard;
