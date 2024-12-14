import styles from './ActionButtons.module.css';
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { stopClub,activateClub } from "../../utils/club";
import { toast } from 'react-toastify';
import { Modal } from 'antd'; // Import Modal từ Ant Design
import 'react-toastify/dist/ReactToastify.css';

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData;

  const handleButtonClick = useCallback((href) => {
    if (href) {
      navigate(href);
    }
  }, [navigate]);

  const handleDelete = useCallback(() => {
    if (!data?.clubId) {
      toast.error("Không tìm thấy ID câu lạc bộ.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận dừng hoạt động",
      content: "Bạn có chắc chắn muốn dừng hoạt động club này?",
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
        stopClub(data.clubId)
          .then(() => {
            toast.success("Dừng hoạt động club thành công!", {
              autoClose: 1000,
            });

            // Thay vì reload, điều hướng đến trang hiện tại hoặc trang khác
            setTimeout(() => {
              navigate(0); // reload trang hiện tại
            }, 1000);
          })
          .catch((error) => {
            toast.error(`Dừng hoạt động club thất bại: ${error.message}`);
          });
      },
      onCancel: () => {
        toast.info("Bạn đã hủy hành động dừng hoạt động club");
      },
    });
  }, [data, navigate]);

  const handleActivate = useCallback(() => {
    if (!data?.clubId) {
      toast.error("Không tìm thấy ID câu lạc bộ.");
      return;
    }

    // Gọi API để kích hoạt lại club
    // Giả sử bạn có hàm activateClub để kích hoạt lại
    activateClub(data.clubId)
      .then(() => {
        toast.success("Club đã được kích hoạt lại thành công!", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate(0); // reload trang hiện tại
        }, 1000);
      })
      .catch((error) => {
        toast.error(`Kích hoạt lại club thất bại: ${error.message}`);
      });
  }, [data, navigate]);

  return (
    <div className={styles.actionButtons}>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/updateclub/${data?.clubId}`)}
      >
        Chỉnh Sửa
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermyclub/${data?.clubId}`)}
      >
        Thành Viên
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/sportbettingclub/${data?.clubId}`)}
      >
        Kèo
      </button>

      {data?.status === 'Active' ? (
        <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={handleDelete}
        >
          Dừng Hoạt Động
        </button>
      ) : (
        <button
          className={`${styles.activateButton}`}
          onClick={handleActivate}
        >
          Kích Hoạt Lại
        </button>
      )}
    </div>
  );
}

export default ActionButtons;
