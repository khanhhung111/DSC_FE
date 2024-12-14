import React, { useState } from "react";
import styles from "./MemberMatch.module.css";
import { getListMember } from "../../utils/tournament"; // Import hàm API
import { useNavigate } from "react-router-dom";

function ParticipantList({ teamData }) {
  const data = teamData || [];
  const [showModal, setShowModal] = useState(false);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewMore = async (teamId) => {
    try {
      setLoading(true);
      const response = await getListMember(teamId);
      
      // Kiểm tra và xử lý dữ liệu
      if (response && response.data.$values) {
        setSelectedTeamPlayers(response.data.$values);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeamPlayers([]);
  };
  return (
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách Đội</h2>
      <ul className={styles.participantList}>
        {data.map((participant, index) => (
          <li key={index} className={styles.participantItem}>
            <img
              src={
                participant.avatar ||
                "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              }
              alt={`${
                participant.avatar ? participant.avatar : "default"
              }'s avatar`}
              className={styles.participantAvatar}
            />

            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>{participant.teamName}</h3>
              <p className={styles.participantDetails}>
                Thành Viên: {participant.memberCount} •
              </p>
            </div>
            <button
              className={styles.viewMoreButton}
              onClick={() => handleViewMore(participant.teamId)}
            >
              Xem Thêm
            </button>
          </li>
        ))}
      </ul>

      
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className={styles.cancelButton}
            >
              ✕
            </button>

            <h2>Danh sách Cầu thủ</h2>

            {loading ? (
              <div className={styles.loadingSpinner}>
                <p>Đang tải...</p>
              </div>
            ) : (
              <div className={styles.modalPlayerList}>
                {selectedTeamPlayers.length > 0 ? (
                  <table className={styles.playerTable}>
                    <thead>
                      <tr>
                        <th>Số áo</th>
                        <th>Tên Cầu thủ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTeamPlayers.map((player) => (
                        <tr key={player.$id}>
                          <td>{player.numberPlayer}</td>
                          <td>{player.namePlayer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không có thông tin cầu thủ</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ParticipantList;
