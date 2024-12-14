import styles from './ActionButtons.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import {JoinActivityClub, getInforJoinned} from '../../utils/activity';
import { toast } from 'react-toastify';

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];
  console.log('data',data);
  const userId = localStorage.getItem('userId');
  const { activityclubId } = useParams();
  console.log("activityclubId",activityclubId);
  const handleButtonClick = (href) => {
    if (href) {
      navigate(href);
    }
  };
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const checkJoinned = async () => {
      try {
        const clubId = data.clubId;
        const checkResponse = await getInforJoinned(userId, clubId, activityclubId);

        if (checkResponse.data.success === true) {
          console.log("result", checkResponse);
          setHasJoined(true); // Nếu đã tham gia, cập nhật trạng thái
        } else {
          setHasJoined(false); // Nếu chưa tham gia
          throw new Error(checkResponse?.message || "Có lỗi xảy ra");
        }
      } catch (error) {
        console.error('Error fetching sports or levels:', error);
        toast.error('Không thể tải dữ liệu môn thể thao hoặc cấp độ.');
      }
    };

    checkJoinned();
  }, [data.clubId, userId, activityclubId]);
  const handleJoinActivityClub = async () => {
    try {
      const clubId = data.clubId;
      const response = await JoinActivityClub(userId ,clubId, activityclubId);
      
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
      {/* Nếu chưa tham gia, hiển thị nút "Tham gia" */}
      {!hasJoined && (
        <button
          className={styles.button}
          onClick={() => handleJoinActivityClub()}
        >
          Tham gia
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermatchclub/${data?.activityClubId}`)}
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