import React, { useCallback } from "react";
import styles from "./MemberMatch.module.css";
import { dateFormatting } from "../../utils/formatHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "antd"; // Import Modal từ Ant Design
import "react-toastify/dist/ReactToastify.css";
import { outClub } from "../../utils/club";

function ParticipantList({ memberdata, onRemoveMember }) {
  const clubId = memberdata?.clubId; // Lấy clubId
  const data = memberdata?.users?.$values || []; // Lấy danh sách thành viên
  const navigate = useNavigate();

  // Hàm xử lý chuyển trang danh sách thành viên chờ duyệt
  const handleApproveMembersClick = () => {
    navigate(`/approveclub/${clubId}`);
  };

  // Hàm xử lý xóa thành viên khỏi câu lạc bộ
  const handleDelete = useCallback(
    (userId) => {
      Modal.confirm({
        title: "Xác nhận xóa thành viên khỏi câu lạc bộ",
        content: (
          <>
            <p>Bạn có chắc chắn muốn xóa thành viên này khỏi câu lạc bộ không?</p>
            <p>Nếu rời club, người này sẽ phải chờ duyệt nếu muốn gia nhập lại.</p>
          </>
        ),
        okText: "Xóa",
        cancelText: "Hủy",
        okButtonProps: {
          style: {
            backgroundColor: "#ff4d4f",
            borderColor: "#ff4d4f",
            color: "white",
          },
        },
        onOk: () => {
          outClub(clubId, userId) // Gọi API xóa thành viên
            .then(() => {
              toast.success("Đã xóa thành viên khỏi club thành công!", {
                autoClose: 1000,
              });
              // Reload trang hiện tại hoặc gọi hàm cập nhật dữ liệu
              setTimeout(() => {
                window.location.reload();
                // navigate(`/membermyclub/${clubId}`);
              }, 1000);
            })
            .catch((error) => {
              toast.error(`Xóa thành viên thất bại: ${error.message}`);
            });
        },
        onCancel: () => {
          toast.info("Bạn đã hủy hành động xóa thành viên.");
        },
      });
    },
    [clubId, navigate]
  );

  return (
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách thành viên</h2>
      <button className={styles.pendingMembersButton} onClick={handleApproveMembersClick}>
        Danh sách thành viên chờ duyệt
      </button>
      <ul className={styles.participantList}>
        {data.map((participant, index) => (
          <li key={index} className={styles.participantItem}>
            <img
              src={
                participant.avatar ||
                "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              }
              alt={`${participant.avatar ? participant.avatar : "default"}'s avatar`}
              className={styles.participantAvatar}
            />
            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>{participant.fullName}</h3>
              <p className={styles.participantDetails}>
                Chức năng: {participant.role} • Ngày Tham Gia: {dateFormatting(participant.joinDate)}
              </p>
            </div>
            {/* Nút Xóa chỉ hiện nếu role là "Player" */}
            {participant.role === "Player" && (
              <button
                className={styles.removeButton}
                onClick={() => handleDelete(participant.userId)}
              >
                Xóa khỏi club
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ParticipantList;
