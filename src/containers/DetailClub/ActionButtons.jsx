import styles from './ActionButtons.module.css';
import { useNavigate } from 'react-router-dom';
import {requestJoinClub} from '../../utils/club';
import { toast } from 'react-toastify';
function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData;
  console.log('data',data);
  const userId = localStorage.getItem('userId');
  const clubId = data?.clubId;
  console.log('activityId',clubId, "userId",userId);
  const handleJoinClub = async () => {
    try {
      const response = await requestJoinClub(userId, clubId );
      
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

  return (
    <div className={styles.actionButtons}>
       <button
        className={styles.button}
        onClick={() => handleJoinClub()}
      >
        Tham Gia
      </button>
    </div>
  );
}

export default ActionButtons;
