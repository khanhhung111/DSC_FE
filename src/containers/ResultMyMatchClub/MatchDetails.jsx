import React from "react";
import styles from './MatchDetails.module.css';
import {amountFormatting} from '../../utils/formatHelper'
import { useNavigate } from 'react-router-dom';
import {requestJoinActivity} from '../../utils/activity';
import { toast } from 'react-toastify';
function MatchDetails({matchData}) {
  const data = matchData[0];
  const navigate = useNavigate();
  const activityId = data?.activityClubId;
  console.log('activityId',activityId);
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
        onClick={() => handleButtonClick(`/updatesporteventclub/${data?.activityClubId}`)}
      >
        Chỉnh Sửa
      </button>
      <button
        className={styles.resultsButton}
        onClick={() => handleButtonClick(`/membermatchclub/${data?.activityClubId}`)}
      >
        Người tham gia
      </button>
      <button
        className={styles.joinButton}
        onClick={() => handleButtonClick(`/resultmymatchclub/${data?.activityClubId}`)}
      >
        Kết quả
      </button>
   </div>
   </div>
    </section>
  );
}

export default MatchDetails;