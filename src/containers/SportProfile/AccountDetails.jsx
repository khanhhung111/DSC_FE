import React, { useEffect, useState } from "react";
import styles from './AccountDetails.module.css';
import { getMySport } from "../../utils/profile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AccountDetails() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserSport = async () => {
      try {
        setLoading(true);
        const response = await getMySport({ userId });
        if (response.data.listViewSport.$values) {
          setSports(response.data.listViewSport.$values);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserSport();
    }
  }, [userId]);

  const handleAddClick = () => {
    // Điều hướng đến trang thêm mới thể thao
    window.location.href = "/add-sport";
  };

  return (
    <section className={styles.cardGridTestimonials}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>Thể thao</h2>
        <p className={styles.subheading}>
          Luôn cập nhật hồ sơ thể thao của bạn để bạn có thể tìm thấy các
          <br />
          hoạt động và bạn bè có liên quan.
        </p>
        <div className={styles.sportContainer}>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <>
              {sports.length > 0 && (
                <div className={styles.sportList}>
                  {sports.map((sport, index) => (
                    <div key={index} className={styles.sportItem}>
                      {sport.sportName}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleAddClick} className={styles.addButton}>
                Thêm
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default AccountDetails;
