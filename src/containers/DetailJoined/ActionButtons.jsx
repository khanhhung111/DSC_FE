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
        onClick={() => handleButtonClick('#')}
        style={{
          backgroundColor: '#EE1D52', // Màu nền
          color: 'white', // Màu chữ
          border: 'none', // Nếu bạn muốn xóa viền
          padding: '10px 20px', // Điều chỉnh padding theo ý muốn
          cursor: 'pointer', // Hiển thị con trỏ chuột khi di chuột qua button
          borderRadius: '100px', // Tùy chọn: làm tròn góc của button
          fontSize: '14px', // Tùy chọn: điều chỉnh kích thước chữ
        }}
      >
        Hủy Tham Gia
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermatch/${data?.activityId}`)} // Gửi activityId
      >
        Người tham gia
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