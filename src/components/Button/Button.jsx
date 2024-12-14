import React from 'react';
import styles from './Button.module.css';

function Button({ onClick,children, variant = 'primary' }) {
  return (
    <button type="button" onClick={onClick && onClick} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export default Button;