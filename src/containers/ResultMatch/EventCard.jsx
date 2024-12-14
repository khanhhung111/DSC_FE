import React from "react";
import styles from './EventCard.module.css';
import { useNavigate } from 'react-router-dom';

function EventCard() {
  const navigate = useNavigate();

  const buttons = [
    { text: 'Tham gia', href: '#' },
    { text: 'Người tham gia', href: '/match' },
    { text: 'Kết quả', href: '/resultmatch' },
  ];

  const handleButtonClick = (href) => {
    if (href !== '#') {
      navigate(href);
    }
  };

  return (
    <div className={styles.actionButtons}>
      {buttons.map((item, index) => (
        <button
          key={index}
          className={styles.button}
          onClick={() => handleButtonClick(item.href)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}

export default EventCard;