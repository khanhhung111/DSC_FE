import React from 'react';
import styles from './SportSelection.module.css';

const sports = [
  { emoji: '⚽', name: 'Bóng đá' },
  { emoji: '🏐', name: 'Bóng chuyền' },
  { emoji: '🏀', name: 'Bóng rổ' },
  { emoji: '🏸', name: 'Cầu lông' },
  { emoji: '🎱', name: 'Bida' },
];

function SportSelection({ onSelectSport, selectedSport }) {
  return (
    <div className={styles.sportGrid}>
      {sports.map((sport, index) => (
        <button 
          key={index} 
          className={`${styles.sportButton} ${selectedSport === sport.name ? styles.selected : ''}`}
          onClick={() => onSelectSport(sport.name)}
        >
          <span className={styles.sportEmoji}>{sport.emoji}</span>
          <span className={styles.sportName}>{sport.name}</span>
        </button>
      ))}
    </div>
  );
}

export default SportSelection;