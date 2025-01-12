import React, { useState, useEffect } from 'react';
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";
import { getMyClub, updateStatusClub } from "../../utils/club";
import { toast } from 'react-toastify';
import moment from 'moment';

function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  const checkAndUpdateExpiredClubs = async (clubs) => {
    const now = moment();
    const expiredClubs = clubs.filter(club => {
      const createDate = moment(club.createDate);
      const daysDiff = now.diff(createDate, 'days');
      return daysDiff >= 30 && club.status !== "Expired";
    });

    if (expiredClubs.length > 0) {
      try {
        await Promise.all(expiredClubs.map(club => updateStatusClub(club.clubId)));
        toast.success('Đã cập nhật trạng thái các câu lạc bộ hết hạn');
        return true; // Trả về true nếu có cập nhật
      } catch (error) {
        console.error('Error updating expired clubs:', error);
        toast.error('Không thể cập nhật trạng thái câu lạc bộ');
        return false;
      }
    }
    return false;
  };

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await getMyClub(userId);
      if (response.data && response.data.success) {
        if (response.data.listClub && Array.isArray(response.data.listClub.$values)) {
          const fetchedClubs = response.data.listClub.$values;
          setClubs(fetchedClubs);
          const updated = await checkAndUpdateExpiredClubs(fetchedClubs);
          if (updated) {
            // Nếu có cập nhật, fetch lại dữ liệu
            const updatedResponse = await getMyClub(userId);
            if (updatedResponse.data && updatedResponse.data.success) {
              setClubs(updatedResponse.data.listClub.$values);
            }
          }
        } else {
          console.error('Dữ liệu không phải là một mảng:', response.data);
          toast.error('Dữ liệu câu lạc bộ không đúng định dạng');
        }
      } else {
        toast.error('Không thể tải thông tin câu lạc bộ');
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Không thể tải thông tin câu lạc bộ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (clubs.length === 0) {
    return <div>Không có câu lạc bộ nào</div>;
  }

  return (
    <ul className={styles.clubList}>
      {clubs.map((club) => {
        // Tính toán ngày mới (30 ngày sau ngày tạo)
        const expirationDate = moment(club.createDate).add(30, 'days').format('DD-MM-YYYY');

        return (
          <li key={club.clubId}>
            <ClubItem 
              clubId={club.clubId}
              clubName={club.clubName}
              levelName={club.levelName}
              status={club.status}
              userCount={club.userCount}
              avatar={club.avatar}
              createdate={expirationDate} // Gửi ngày hết hạn thay vì ngày tạo
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ClubList;