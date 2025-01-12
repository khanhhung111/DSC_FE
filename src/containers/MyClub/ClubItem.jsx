import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ClubItem.module.css";
import Modal from "react-modal"; // Đảm bảo bạn đã cài đặt react-modal
import { toast } from "react-toastify";
import { createPayment, setPayment, expiredClub,updateStatusClub } from "../../utils/club"; // Giả sử bạn có các hàm này
import modalStyles from "./Modal.module.css";
function ClubItem({ clubId, clubName, userCount, levelName, status, avatar, createdate }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toastShown, setToastShown] = useState(false);

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

  const statusTextClass = status === "Active" ? styles.activeText : styles.inactiveText;

  const handleViewMore = () => {
    if (status === "Expired") {
      setModalIsOpen(true);
    } else {
      navigate(`/myclubdetail/${clubId}`);
    }
  };

  const handleRenew = async () => {
    try {
      const Amount = 150000;
      const response = await createPayment(clubId, Amount);

      if (response.data) {
        window.location.href = response.data;

        window.addEventListener('beforeunload', async () => {
          // Nếu người dùng chưa thanh toán và đang thoát trang
          await updateStatusClub(clubId);
        });
      } else {
        toast.error(response.data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error in handleRenew:', error);
      toast.error("Có lỗi xảy ra khi xử lý yêu cầu gia hạn");
    }
  };

  const callNetPayment = useCallback(async (params) => {
    try {
      if (!toastShown && params.toString()) {
        const responsePayment = await setPayment(params);
        console.log(responsePayment);
        
        // Lấy clubId từ response của setPayment hoặc từ params
        const paidClubId = responsePayment.clubId || params.get('clubId');
        
        if (responsePayment.message === "Success" && responsePayment.rspCode) {
          if (paidClubId) {
            await expiredClub(paidClubId);
            toast.success("Gia hạn câu lạc bộ thành công.", {
              autoClose: 1000,
            });
            setToastShown(true);
            // Thay đổi đường dẫn này để phù hợp với trang câu lạc bộ của bạn
            setTimeout(() => navigate('/myclub'), 1900);
          } else {
            toast.error("Không thể xác định câu lạc bộ cần gia hạn.");
          }
        } else {
          if (paidClubId) {
            await updateStatusClub(paidClubId);
          }
          toast.error("Bạn không thanh toán nên không thể gia hạn câu lạc bộ.", {
            autoClose: 1000,
          });
          setTimeout(() => setModalIsOpen(false), 1900);
        }
      }
    } catch (err) {
      console.error('Error in callNetPayment:', err);
      toast.error("Có lỗi xảy ra trong quá trình xử lý thanh toán.");
    }
  }, [toastShown, setModalIsOpen]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!toastShown) {
      callNetPayment(params);
    }
  }, [callNetPayment, toastShown]);

  return (
    <article className={styles.clubItem}>
      <img src={avatar} alt={`${clubName} avatar`} className={styles.clubLogo} />
      
      <div className={styles.clubInfo}>
        <h2 className={styles.clubName}>{clubName}</h2>
        <p className={styles.clubDetails}>
          {userCount} thành viên • Cấp độ: {levelName}
        </p>
        <p className={styles.clubStatus}>
          Trạng thái: <span className={statusTextClass}>{getStatusText(status)}</span>
        </p>
        <p className={styles.clubStatus}>
          Ngày thanh toán tiền: <span className={statusTextClass}>{createdate}</span>
        </p>
      </div>
      <button className={styles.viewMoreButton} onClick={handleViewMore}>Xem thêm</button>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Gia hạn câu lạc bộ"
  className={modalStyles.modalContent}
  overlayClassName={modalStyles.modalOverlay}
>
  <div className={modalStyles.modalHeader}>
    <h2 className={modalStyles.modalTitle}>Gia hạn câu lạc bộ</h2>
  </div>
  <div className={modalStyles.modalBody}>
    <p>Bạn có muốn gia hạn câu lạc bộ không?</p>
    <p className={modalStyles.costHighlight}>
      Phí gia hạn: 150.000 Đồng
    </p>
  </div>
  <div className={modalStyles.modalFooter}>
    <button 
      className={`${modalStyles.button} ${modalStyles.confirmButton}`} 
      onClick={handleRenew}
    >
      Đồng ý
    </button>
    <button 
      className={`${modalStyles.button} ${modalStyles.cancelButton}`} 
      onClick={() => setModalIsOpen(false)}
    >
      Hủy
    </button>
  </div>
</Modal>
    </article>
  );
}

export default ClubItem;