import React from 'react';
import styles from './EventItem.module.css';
import { useNavigate } from 'react-router-dom';
import {dateFormatting} from '../../utils/formatHelper'
const EventItem = ({ activityId,activityName, levelname, location, numberOfTeams, avatar, startDate }) => {
  const navigate = useNavigate();
  
  const handleButtonClick = (href) => {
    if (href !== '#') {
      navigate(`/detailmymatch/${activityId}`); // Truyền activityId qua đường dẫn
    }
  };

  return (
    <article className={styles.eventItem}>
      {/* Image */}
      <img src={avatar || "https://via.placeholder.com/150"} alt={activityName} className={styles.eventImage} />
      
      <div className={styles.eventContent}>
        {/* Activity Name (Title) */}
        <h4 className={styles.eventTitle}>{activityName}</h4>

        {/* Level Information */}
        <p className={styles.eventLevel}>Trình độ: {levelname || 'Không có thông tin'}</p>

        {/* Location */}
        <p className={styles.eventLocation}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/67584d32e2d5f94a86a73a7f5ccbd5afffb2b578b94fba80627caddf2964c13f?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" 
            alt="" 
            className={styles.locationIcon} 
          />
          {location}
        </p>

        {/* Number of Teams (Participants) */}
        <p className={styles.eventParticipants}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ffcb3e3c3c1c652965ce1a52390935f85298d7b2efe6c6296f48d1d7c35b6fe?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" 
            alt="" 
            className={styles.participantsIcon} 
          />
          Số lượng đội: {numberOfTeams}
        </p>

        {/* Start Date (Optional) */}
        <p className={styles.eventDate}>
          Ngày bắt đầu: {dateFormatting(startDate)}
        </p>
      </div>
      <button className={styles.moreButton} onClick={() => handleButtonClick()}>Xem thêm</button>
    </article>
  );
};

export default EventItem;