import React, { useEffect, useState } from "react";
import styles from "./MemberMatch.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { JoinActivityClub, getInforJoinned } from "../../utils/activity";
import { toast } from "react-toastify";
function MatchDetails({ memberdata }) {
  const navigate = useNavigate();
  const { activityclubId } = useParams();
  const data = memberdata;
  const [hasJoined, setHasJoined] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (data?.activity) {
      const checkJoinned = async () => {
        try {
          const clubId = data.activity.clubId;
          const checkResponse = await getInforJoinned(userId, clubId, activityclubId);

          if (checkResponse.data.success === true) {
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
    }
  }, [data?.activity, data?.clubId, userId, activityclubId]);

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

  const handleJoinActivityClub = async () => {
    try {
      const clubId = data.clubId;
      const response = await JoinActivityClub(userId, clubId, activityclubId);

      if (response.data.success === true) {
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
        src={data.activity.avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"}
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
        <p className={styles.matchPrice}>
          {data.activity.expense === 0 ? (
            <span style={{ color: "green", fontWeight: "bold" }}>Miễn phí</span>
          ) : (
            `$ ${data.activity.expense.toLocaleString()}đ`
          )}
        </p>

        <div className={styles.matchActions}>
   <button
        className={styles.resultsButton}
        onClick={() => handleButtonClick(`/updatesporteventclub/${activityclubId}`)}
      >
        Chỉnh Sửa
      </button>
      <button
        className={styles.joinButton}
        onClick={() => handleButtonClick(`/membermymatchclub/${activityclubId}`)}
      >
        Người tham gia
      </button>
      <button
        className={styles.resultsButton}
        onClick={() => handleButtonClick(`/resultmymatchclub/${activityclubId}`)}
      >
        Kết quả
      </button>
   </div>
      </div>
    </section>
  );
}

export default MatchDetails;

