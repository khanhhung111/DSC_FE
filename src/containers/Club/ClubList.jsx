import React, { useState, useEffect } from 'react';
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";
import { getAllClub } from "../../utils/club";
import { toast } from 'react-toastify';

function ClubList() {
  const [events, setEvents] = useState([]);  // Khởi tạo events là một mảng rỗng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await getAllClub(userId); // Gửi request để lấy dữ liệu
        if (response.data && response.data.success) {
          if (response.data.listClub && Array.isArray(response.data.listClub.$values)) {
            setEvents(response.data.listClub.$values); 
            console.log("Data:", response.data.listClub.$values);
          } else {
            console.error('Dữ liệu không phải là một mảng:', response.data);
            toast.error('Dữ liệu sự kiện không đúng định dạng');
          }
        } else {
          toast.error('Không thể tải thông tin sự kiện');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện'); // Thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchClub(); // Gọi hàm fetchClub khi component được mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (events.length === 0) {
    return <div>Không có sự kiện nào</div>; // Thông báo nếu không có sự kiện
  }

  return (
    <ul className={styles.clubList}>
      {events.map((club) => (
        <li key={club.clubId}>
          <ClubItem 
            clubId={club.clubId}
            clubName={club.clubName}
            levelName={club.levelName}
            status={club.status}
            userCount={club.userCount}
            avatar={club.avatar} 
          />
        </li>
      ))}
    </ul>
  );
}

export default ClubList;
