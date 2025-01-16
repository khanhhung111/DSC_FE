import React from "react";
import styles from "./MemberMatch.module.css";
import {dateFormatting} from "../../utils/formatHelper";
import {acceptrequestJoinClub,cancelrequestJoinClub} from "../../utils/club"; 
import { toast } from 'react-toastify';
function ParticipantList({ memberdata }) {
  const data = memberdata?.listJoinClub?.$values || []; // Lấy mảng các thành viên từ API
  const handleAccept = async (requestClubId, UserId) => {
    try {
      const response = await acceptrequestJoinClub(requestClubId, UserId );
      
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
  
  const handleCancel = async (requestClubId, UserId) => {
    try {
      const response = await cancelrequestJoinClub(requestClubId, UserId );
      
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
      <h2 className={styles.sectionTitle}>Danh sách thành viên chờ duyệt</h2>
      <ul className={styles.participantList}>
        {data.map((participant, index) => (
          <li key={index} className={styles.participantItem}>
<img
  src={participant.userAvatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/50853265154f5d63067e64f710fa527ace98511e05967c947d8eabed1d8d8406?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"}
  alt={`${participant.userAvatar ? participant.userAvatar : 'default'}'s avatar`} // Nếu avatar không có thì hiển thị tên mặc định
  className={styles.participantAvatar}
/>

            <div className={styles.participantInfo}>
              <h3 className={styles.participantName}>{participant.userFullName}</h3>
              <p className={styles.participantDetails}>
                Ngày Yêu Cầu: {dateFormatting(participant.joinDate)}
              </p>
            </div>
            {participant.status == 1 ? (
              <div className={styles.buttonContainer}>
                <button 
                className={styles.rejectButton}
                onClick={() => handleCancel(participant.requestClubId, participant.userId)}
                >Từ chối</button>
                <button 
                  className={styles.acceptButton}
                  onClick={() => handleAccept(participant.requestClubId, participant.userId)}
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
