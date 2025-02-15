import styles from './EventCard.module.css';
import { useNavigate } from 'react-router-dom';
import {requestJoinActivity} from '../../utils/activity';
import { toast } from 'react-toastify';

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];
  console.log('data',data);
  const userId = localStorage.getItem('userId');
  const activityId = data?.activityId;
  console.log('activityId',activityId);
  const handleJoinActivity = async () => {
    try {
      const response = await requestJoinActivity(userId, activityId );
      
      // Kiểm tra phản hồi
      if (response.data.success == true) {
        console.log("result", response);
        toast.success(response.data.message, {
          autoClose: 1200,
        });
      } else {
        throw new Error(response?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra khi chấp nhận yêu cầu.", {
        autoClose: 1000,
      });
    }
  };
  const handleButtonClick = (href) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className={styles.actionButtons}>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermymatch/${data?.activityId}`)}
      >
        Người tham gia
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/resultmymatch/${data?.activityId}`)}
      >
        Kết quả
      </button>
    </div>
  );
}

export default ActionButtons;