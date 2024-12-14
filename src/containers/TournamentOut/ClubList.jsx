import React, { useState, useEffect } from 'react';
import ClubItem from "./ClubItem";
import styles from "./ClubList.module.css";
import { GetAllTournament } from "../../utils/tournament";
import { toast } from 'react-toastify';

function ClubList() {
  const [events, setEvents] = useState([]);  // Khởi tạo events là một mảng rỗng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await GetAllTournament(userId); // Gửi request để lấy dữ liệu
        console.log('Response:', response);
        if (response.data && Array.isArray(response.data.$values)) {
          setEvents(response.data.$values); // Gán dữ liệu vào state
        } else {
          console.error('Dữ liệu không phải là một mảng:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện'); // Thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchClub(); // Gọi hàm fetchClub khi component được mount
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (events.length === 0) {
    return <div>Không có sự kiện nào</div>; // Thông báo nếu không có sự kiện
  }

  return (
    <ul className={styles.clubList}>
      {events.map((tournament) => (
        <li key={tournament.tournamentId}>
          <ClubItem
            tournamentId={tournament.tournamentId}
            name={tournament.name}
            numberOfTeams={tournament.numberOfTeams}
            location={tournament.location}
            startDate={tournament.startDate}
            avatar={tournament.avatar || 'default-avatar-url'} // Đặt avatar mặc định nếu không có
          />
        </li>
      ))}
    </ul>
  );
};

export default ClubList;
