import styles from './ActionButtons.module.css';
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { outClub,activateClub } from "../../utils/club";
import { toast } from 'react-toastify';
import { Modal } from 'antd'; // Import Modal từ Ant Design
import 'react-toastify/dist/ReactToastify.css';

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData;
  const userId = localStorage.getItem('userId');
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
  return (
    <div className={styles.actionButtons}>
       <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={handleDelete}
        >
          Rời Câu Lạc Bộ
        </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/membermyclubjoined/${data?.clubId}`)}
      >
        Thành Viên
      </button>
      <button
        className={styles.button}
        onClick={() => handleButtonClick(`/sportbettingmyclub/${data?.clubId}`)}
      >
        Kèo
      </button>
    </div>
  );
}

export default ActionButtons;
