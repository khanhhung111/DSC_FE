import React from "react";
import styles from './MatchDetails.module.css';
import {amountFormatting} from '../../utils/formatHelper'
import { useNavigate } from 'react-router-dom';
import {requestJoinActivity} from '../../utils/activity';
import { toast } from 'react-toastify';
function MatchDetails({matchData}) {
  const navigate = useNavigate();
  const data = matchData[0];
  const userId = localStorage.getItem('userId');
  const activityId = data?.activityId;
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
    <section className={styles.matchDetails}>
       <img
     src={data?.avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"}
     alt="Pickleball match"
     className={styles.matchImage}
   />
   <div className={styles.matchInfo}>
      <h1 className={styles.matchTitle}>{data?.activityName}</h1>
      <div className={styles.matchInfo}>
        <div className={styles.infoItem}>
          <span>Trình độ: {data.levelName}</span>
        </div>
       
      </div>
      <div className={styles.matchMeta}>
       <p className={styles.matchLocation} style={{ display: 'flex', alignItems: 'center' }}>
         <img
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/a37b2e1b41f74422366e59f725b4a4a78cf3b432e93f670bcbb053b5b9674fe1?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
           alt=""
           className={styles.metaIcon}
           style={{ marginRight: '8px' }}
         />
         {data?.location}
       </p>
     </div>
      <p className={styles.participants}>Số người tham gia: {data.numberOfTeams}</p>
      <p className={styles.price}>$ {amountFormatting(data.expense)}đ</p>
      <div className={styles.matchActions}>
   <button
        className={styles.resultsButton}
        onClick={() => handleJoinActivity()}
      >
        Tham Gia
      </button>
      <button
        className={styles.resultsButton}
        onClick={() => handleButtonClick(`/membermatch/${data?.activityId}`)}
      >
        Người tham gia
      </button>
      <button
        className={styles.joinButton}
        onClick={() => handleButtonClick(`/resultmatch/${data?.activityId}`)}
      >
        Kết quả
      </button>
   </div>
   </div>
    </section>
  );
}

export default MatchDetails;