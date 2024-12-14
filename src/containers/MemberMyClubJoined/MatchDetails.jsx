import styles from "./MemberMatch.module.css";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Modal } from 'antd'; // Import Modal từ Ant Design
import 'react-toastify/dist/ReactToastify.css';
import { outClub } from "../../utils/club";
function MatchDetails({ memberdata }) {
  const navigate = useNavigate();
  const data = memberdata;
  console.log("memberdata",data)
  const handleButtonClick = useCallback((href) => {
    if (href) {
      navigate(href);
    }
  }, [navigate]);
  const userId = localStorage.getItem('userId');
  const handleDelete = useCallback(() => {
    if (!data?.clubId) {
      toast.error("Không tìm thấy ID câu lạc bộ.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận rời khỏi câu lạc bộ",
      content: (
        <>
          <p>Bạn có chắc chắn rời khỏi câu lạc bộ này?</p>
          <p>Nếu rời club, bạn sẽ phải chờ duyệt nếu muốn gia nhập lại.</p>
        </>
      ),
      okText: "Rời Club",
      cancelText: "Hủy",
      okButtonProps: {
        style: {
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "white",
        },
      },
      onOk: () => {
        outClub(data.clubId, userId)
          .then(() => {
            toast.success("Rời club thành công!", {
              autoClose: 1000,
            });

            // Thay vì reload, điều hướng đến trang hiện tại hoặc trang khác
            setTimeout(() => {
              navigate(`/detailClub/${data?.clubId}`); // reload trang hiện tại
            }, 1000);
          })
          .catch((error) => {
            toast.error(`Rời club thất bại: ${error.message}`);
          });
      },
      onCancel: () => {
        toast.info("Bạn đã hủy hành động rời club");
      },
    });
  }, [data, navigate]);
  // Kiểm tra xem data?.activity có tồn tại hay không
  if (!data?.clubName) {
    return (
      <section className={styles.matchDetails}>
        <h1>Chưa có thành viên tham gia</h1>
      </section>
    );
  }

  return (
    <section className={styles.matchDetails}>
      <img
        src={data.avatar}
        alt="Pickleball match"
        className={styles.matchImage}
        styles
      />
      <div className={styles.matchInfo}>
        <h1 className={styles.matchTitle}>{data.clubName}</h1>
        <div className={styles.levelName}><TrophyOutlined className={styles.icon} /> Trình Độ: {data.levelName}</div>  {/* Trình Độ */}
        <div className={styles.infoItem}>
          <UserOutlined className={styles.icon} />
            <span> {data.userCount} thành viên</span>
          </div>
        <div className={styles.infoItem}>
          <BulbOutlined className={styles.icon} />
            <span>
              Trạng thái:
              <span className={styles.statusSpace}> </span> {/* Thêm khoảng trắng */}
              <span
                className={data.status === "Active" ? styles.activeStatus : styles.inactiveStatus}
              >
                {data.status}
              </span>
            </span>
          </div>
        <div className={styles.matchActions}>
        <button
        className={styles.stopButton} // class thêm cho nút dừng hoạt động
        onClick={handleDelete}
      >
        Rời Câu Lạc Bộ
      </button>
          <button className={styles.joinButton} onClick={() => navigate(`/membermyclubjoined/${data.clubId}`)}>Thành Viên</button>
          <button className={styles.participantsButton} onClick={() => navigate(`/approvemember/${data.activity.activityId}`)}>Kèo</button>
          
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;
