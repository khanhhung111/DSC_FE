import React, { useCallback } from "react";
import styles from "./MemberMatch.module.css";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import { stopClub, activateClub } from "../../utils/club"; // Import API
import { toast } from "react-toastify";

function MatchDetails({ memberclub }) {
  const navigate = useNavigate();
  const data = memberclub;
  const getStatusText = (status) => {
    switch (status) {
      case "Active":
        return "Đang Hoạt Động";
      case "Inactive":
        return "Dừng Hoạt Động";
      case "Expired":
        return "Hết Hạn";
      default:
        return status;
    }
  };
  // Xử lý dừng hoạt động
  const handleStopClub = useCallback(() => {
    if (!data?.clubId) {
      toast.error("Không tìm thấy ID câu lạc bộ.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận dừng hoạt động",
      content: "Bạn có chắc chắn muốn dừng hoạt động câu lạc bộ này?",
      okText: "Dừng Hoạt Động",
      cancelText: "Hủy",
      okButtonProps: {
        style: {
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "white",
        },
      },
      onOk: () => {
        stopClub(data.clubId)
          .then(() => {
            toast.success("Dừng hoạt động câu lạc bộ thành công!");
            setTimeout(() => navigate(0), 1000); // Reload trang hiện tại
          })
          .catch((error) => {
            toast.error(`Dừng hoạt động thất bại: ${error.message}`);
          });
      },
    });
  }, [data, navigate]);

  // Xử lý kích hoạt lại
  const handleActivateClub = useCallback(() => {
    if (!data?.clubId) {
      toast.error("Không tìm thấy ID câu lạc bộ.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận kích hoạt lại",
      content: "Bạn có chắc chắn muốn kích hoạt lại câu lạc bộ này?",
      okText: "Kích Hoạt Lại",
      cancelText: "Hủy",
      onOk: () => {
        activateClub(data.clubId)
          .then(() => {
            toast.success("Câu lạc bộ đã được kích hoạt lại thành công!");
            setTimeout(() => navigate(0), 1000); // Reload trang hiện tại
          })
          .catch((error) => {
            toast.error(`Kích hoạt lại thất bại: ${error.message}`);
          });
      },
    });
  }, [data, navigate]);

  // Kiểm tra xem data?.clubName có tồn tại hay không
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
      />
      <div className={styles.matchInfo}>
        <h1 className={styles.matchTitle}>{data.clubName}</h1>
        <div className={styles.levelName}>
          <TrophyOutlined className={styles.icon} /> Trình Độ: {data.levelName}
        </div>
        <div className={styles.infoItem}>
          <UserOutlined className={styles.icon} />
          <span> {data.userCount} thành viên</span>
        </div>
        <div className={styles.infoItem}>
          <BulbOutlined className={styles.icon} />
          <span>
            Trạng thái:
            
            <span className={styles.statusSpace}> </span>
            <span
              className={
                data.status === "Active"
                  ? styles.activeStatus
                  : styles.inactiveStatus
              }
            >
              {getStatusText(data.status)}
            </span>
          </span>
        </div>
        <div className={styles.matchActions}>
          <button
            className={styles.participantsButton}
            onClick={() => navigate(`/updateclub/${data.clubId}`)}
          >
            Chỉnh Sửa
          </button>
          <button
            className={styles.participantsButton}
            onClick={() => navigate(`/membermyclub/${data.clubId}`)}
          >
            Thành Viên
          </button>
          <button
            className={styles.participantsButton}
            onClick={() => navigate(`/sportbettingclub/${data?.clubId}`)}
          >
            Kèo
          </button>
          {data.status === "Active" ? (
            <button className={styles.stopButton} onClick={handleStopClub}>
              Dừng Hoạt Động
            </button>
          ) : (
            <button
              className={styles.activateButton}
              onClick={handleActivateClub}
            >
              Kích Hoạt Lại
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;
