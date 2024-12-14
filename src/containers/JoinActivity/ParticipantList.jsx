import React from "react";
import styles from "./MemberMatch.module.css";
import {acceptrequestJoinActivity,cancelrequestJoinActivity} from "../../utils/activity"; 
import { toast } from 'react-toastify';
function ParticipantList({ memberdata }) {
  const data = memberdata?.listJoinActivity?.$values || [];
  const handleAccept = async (RequestJoinActivityId, UserId) => {
    try {
      const response = await acceptrequestJoinActivity(RequestJoinActivityId, UserId );
      
      // Kiểm tra phản hồi
      if (response.data.success == true) {
        console.log("result", response);
        toast.success("Đã chấp nhận yêu cầu tham gia!", {
          autoClose: 1000,
        });
        
        // Làm mới trang sau một khoảng thời gian ngắn
        setTimeout(() => {
          window.location.reload(); // Hoặc sử dụng history.push('/currentPage') nếu bạn muốn điều hướng
        }, 1000); // Thời gian trễ trước khi làm mới
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
  const handleCancel = async (RequestJoinActivityId, UserId) => {
    try {
      const response = await cancelrequestJoinActivity(RequestJoinActivityId, UserId );
      
      // Kiểm tra phản hồi
      if (response.data.success == true) {
        console.log("result", response);
        toast.success("Đã từ chối đơn xin tham gia!", {
          autoClose: 1000,
        });
        
        // Làm mới trang sau một khoảng thời gian ngắn
        setTimeout(() => {
          window.location.reload(); // Hoặc sử dụng history.push('/currentPage') nếu bạn muốn điều hướng
        }, 1000); // Thời gian trễ trước khi làm mới
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
    <section className={styles.participantSection}>
      <h2 className={styles.sectionTitle}>Danh sách thành viên</h2>
      <ul className={styles.participantList}>
        {data.map((participant, index) => (
          <li key={index} className={styles.participantItem}>
            <div className={styles.contentWrapper}>
              <img
                src={"https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" || "/default-avatar.png"}
                alt={`${participant.fullName}'s avatar`}
                className={styles.participantAvatar}
              />
              <div className={styles.participantInfo}>
                <h3 className={styles.participantName}>{participant.userFullName}</h3>
                <p className={styles.participantDetails}>
                  Ngày Yêu Cầu: {new Date(participant.createDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {participant.status == 1 ? (
              <div className={styles.buttonContainer}>
                <button 
                className={styles.rejectButton}
                onClick={() => handleCancel(participant.requestJoinActivityId, participant.userId)}
                >Từ chối</button>
                <button 
                  className={styles.acceptButton}
                  onClick={() => handleAccept(participant.requestJoinActivityId, participant.userId)}
                >
                  Đồng ý
                </button>
              </div>
            ) : participant.status == 2 ? (
              <button 
                className={`${styles.statusButton} ${styles.approvedButton}`}
                disabled
              >
                Đã duyệt
              </button>
            ) : participant.status == 3 ? (
              <button 
                className={`${styles.statusButton} ${styles.canceledButton}`}
                disabled
              >
                Đã từ chối
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ParticipantList;