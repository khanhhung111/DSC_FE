import React, { useEffect, useState } from "react";
import styles from "./MatchDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { JoinActivityClub, getInforJoinned } from "../../utils/activity";
import { amountFormatting } from "../../utils/formatHelper";
import { toast } from "react-toastify";

function MatchDetails({ matchData }) {
  const navigate = useNavigate();
  const { activityclubId } = useParams();
  const data = matchData[0];
  const userId = localStorage.getItem("userId");
  const [hasJoined, setHasJoined] = useState(false);

  console.log("match", matchData);
  console.log("activityclubId", activityclubId);

  // Kiểm tra trạng thái tham gia
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
        console.error("Error fetching sports or levels:", error);
      }
    };

    checkJoinned();
  }, [data.clubId, userId, activityclubId]);

  // Xử lý tham gia hoạt động
  const handleJoinActivityClub = async () => {
    try {
      const clubId = data.clubId;
      const response = await JoinActivityClub(userId, clubId, activityclubId);

      if (response.data.success === true) {
        console.log("result", response);
        toast.success(response.data.message, {
          autoClose: 1200,
        });
        setHasJoined(true); // Cập nhật trạng thái tham gia
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
        {/* Trình độ */}
        <div className={styles.infoItem}>
          <span>Trình độ: {data.levelName}</span>
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

        {/* Số người tham gia */}
        <p className={styles.participants}>
          Số người tham gia: {data.numberOfParticipants}/{data.numberOfTeams}
        </p>

        {/* Chi phí */}
        <p className={styles.matchPrice}>
          {data.expense === 0 ? (
            <span style={{ color: "green", fontWeight: "bold" }}>Miễn phí</span>
          ) : (
            `$ ${data.expense.toLocaleString()}đ`
          )}
        </p>
      </div>

      {/* Hành động */}
      
      <div className={styles.matchActions}>
        {!hasJoined && (
          <button className={styles.resultsButton} onClick={handleJoinActivityClub}>
            Tham gia
          </button>
        )}
        <button
          className={styles.resultsButton}
          onClick={() => handleButtonClick(`/membermatchclub/${data?.activityClubId}`)}
        >
          Người tham gia
        </button>
        <button className={styles.joinButton} onClick={() => handleButtonClick(`/resultmatchclub/${data?.activityClubId}`)}>
          Kết quả
        </button>
      </div>
      </div>
    </section>
  );
}

export default MatchDetails;
