// CreateBetButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBetButton.module.css'; // Tạo file CSS riêng cho nút

const CreateBetButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.greenButton}
      onClick={() => navigate(`/createsportevent`)}
    >
      + Tạo kèo thể thao
    </button>
  );
};

export default CreateBetButton;
