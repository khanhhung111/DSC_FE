// CreateBetButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBetButton.module.css'; // Tạo file CSS riêng cho nút

const CreateBetButton = ({ clubId }) => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.greenButton}
      onClick={() => navigate(`/createsporteventclub/${clubId}`)}
    >
      + Tạo kèo thể thao
    </button>
  );
};

export default CreateBetButton;
