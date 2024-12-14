import React from 'react';
import styles from './EventTypeSelection.module.css';

const eventTypes = ['Giao hữu', 'Buổi tập', 'Buổi học', 'Thi đấu', 'Họp mặt'];

function EventTypeSelection({ onSelectType, selectedType }) {
  return (
    <div className={styles.eventTypeGrid}>
      {eventTypes.map((type, index) => (
        <button 
          key={index} 
          className={`${styles.eventTypeButton} ${selectedType === type ? styles.selected : ''}`}
          onClick={() => onSelectType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default EventTypeSelection;