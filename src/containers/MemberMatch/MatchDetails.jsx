import React from "react";
import styles from "./MemberMatch.module.css";
import { useNavigate } from 'react-router-dom';
import {requestJoinActivity} from '../../utils/activity';
import { toast } from 'react-toastify';
function MatchDetails({ memberdata }) {
  const navigate = useNavigate();
  const data = memberdata;
  const userId = localStorage.getItem('userId');
  const activityId = data?.activity.activityId;
  const handleJoinActivity = async () => {
    try {
      const response = await requestJoinActivity(userId, activityId );
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
  // Kiểm tra xem data?.activity có tồn tại hay không
  if (!data?.activity) {
    return (
      <section className={styles.matchDetails}>
        <h1>Chưa có thành viên tham gia</h1>
      </section>
    );
  }
  const uniqueMembers = [
    ...new Map(data.memberInfo.$values.map((participant) => [participant.userId, participant])).values(),
  ];

  return (
    <section className={styles.matchDetails}>
      <img
     src={data?.activity.avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"}
     alt="Pickleball match"
     className={styles.matchImage}
   />
      <div className={styles.matchInfo}>
        <h1 className={styles.matchTitle}>{data.activity.activityName}</h1>
        <div className={styles.matchMeta}>
          <p className={styles.matchLocation} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a37b2e1b41f74422366e59f725b4a4a78cf3b432e93f670bcbb053b5b9674fe1?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              alt=""
              className={styles.metaIcon}
              style={{ marginRight: '8px' }}
            />
            {data.activity.location}
          </p>
        </div>
        <p className={styles.participantCount}>
        Số người tham gia: {data.playerCount} / {data.activity.numberOfTeams}
        </p>
        <p className={styles.matchPrice}>$ {data.activity.expense.toLocaleString()}đ</p>
        <div className={styles.matchActions}>
          <button className={styles.participantsButton} onClick={() => handleJoinActivity()}>Tham gia</button>
          <button className={styles.joinButton} onClick={() => navigate(`/membermatch/${data.activity.activityId}`)}>Người tham gia</button>
          <button className={styles.resultsButton} onClick={() => navigate(`/resultmatch/${data.activity.activityId}`)}>Kết quả</button>
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;
