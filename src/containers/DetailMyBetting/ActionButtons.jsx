import styles from './ActionButtons.module.css';
import { useNavigate } from 'react-router-dom';

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];

  const handleButtonClick = (href) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className={styles.actionButtons}>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/updatesportevent/${data?.activityId}`)}
      >
        Chỉnh Sửa
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermymatch/${data?.activityId}`)}
      >
        Người tham gia
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/approvemember/${data?.activityId}`)}
      >
        Phê duyệt
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick('/resultmatch')}
      >
        Kết quả
      </button>
    </div>
  );
}

export default ActionButtons;