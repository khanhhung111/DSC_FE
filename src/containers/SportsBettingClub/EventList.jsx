import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.css';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getAllActivityClub } from "../../utils/activity";

const EventList = () => {
  const { clubId } = useParams();
  const [events, setEvents] = useState([]);  // Khởi tạo events là một mảng rỗng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await getAllActivityClub(clubId); // Gửi request để lấy dữ liệu
        if (response.data && response.data.$values) {
          setEvents(response.data.$values);
        } else {
          toast.error('Dữ liệu sự kiện không đúng định dạng');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện');
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchActivity();
  }, [clubId]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (events.length === 0) {
    return <div>Không có sự kiện nào</div>; // Thông báo nếu không có sự kiện
  }

  // Hàm nhóm sự kiện theo ngày
  const groupEventsByDate = (events) => {
    if (!Array.isArray(events) || events.length === 0) return [];

    const grouped = events.reduce((groups, event) => {
      if (!event.startDate) return groups;

      const eventDate = new Date(event.startDate);
      // Chuyển sang định dạng dd/mm/yyyy
      const formattedDate = eventDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(event);
      return groups;
    }, {});

    // Sắp xếp các ngày theo thứ tự tăng dần
    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      const [dayA, monthA, yearA] = dateA.split('/');
      const [dayB, monthB, yearB] = dateB.split('/');
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    });
  };

  return (
    <section className={styles.eventList}>
      {groupEventsByDate(events).map(([date, dailyEvents]) => {
        // Tạo đối tượng Date để hiển thị header
        const [day, month, year] = date.split('/');
        const headerDate = new Date(year, month - 1, day);

        return (
          <div key={date} className={styles.dayGroup} style={{ paddingTop: '30px' }}>
            <h2 className={styles.dateHeader}>
              {headerDate.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <div className={styles.dayContent}>
              <div className={styles.timeColumn}>
                {dailyEvents.map((event, index) => {
                  const eventDate = new Date(event.startDate);
                  const formattedTime = eventDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={index} className={styles.timeSlot}>
                      {date} - {formattedTime}
                    </div>
                  );
                })}
              </div>

              <div className={styles.eventColumn}>
                {dailyEvents.map((event, index) => (
                  <EventItem
                    key={index}
                    activityclubId={event.activityClubId}
                    activityName={event.activityName}
                    startDate={event.startDate}
                    location={event.location}
                    numberOfTeams={event.numberOfTeams}
                    expense={event.expense}
                    description={event.description}
                    levelname={event.levelName}
                    numberOfParticipants={event.numberOfParticipants}
                    avatar={event.avatar}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default EventList;
