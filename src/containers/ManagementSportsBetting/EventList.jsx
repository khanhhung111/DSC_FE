import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.css';
import { toast } from 'react-toastify';
import { getActivityJoined } from "../../utils/activity"; // Giả sử đây là API call

const EventList = () => {
  const [events, setEvents] = useState([]);  // Khởi tạo events là một mảng rỗng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await getActivityJoined( userId ); // Gửi request để lấy dữ liệu
        if (response.data) {
          if (response.data.$values && Array.isArray(response.data.$values)) {
            setEvents(response.data.$values); 
            console.log("datane",response.data.$values);
          } else {
            console.error('Dữ liệu không phải là một mảng:', response.data);
            toast.error('Dữ liệu sự kiện không đúng định dạng');
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchActivity(); // Gọi hàm fetchActivity khi component được mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (events.length === 0) {
    return <div>Không có sự kiện nào</div>; // Thông báo nếu không có sự kiện
  }

  const groupEventsByDate = (events) => {
    if (!Array.isArray(events) || events.length === 0) return [];

    const grouped = events.reduce((groups, event) => {
      if (!event.startDate) return groups;

      const date = new Date(event.startDate);
      const formattedDate = date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(event);
      return groups;
    }, {});

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      return new Date(dateA) - new Date(dateB);
    });
  };
  
  return (
    <section className={styles.eventList}>
      {groupEventsByDate(events).map(([date, dailyEvents]) => {
        // Tạo đối tượng Date cho dayHeader
        const headerDate = new Date(date.split('/').reverse().join('-')); // Chuyển từ dd/mm/yyyy sang yyyy-mm-dd

        return (
          <div key={date} className={styles.dayGroup}>
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
                  const formattedEventDate = eventDate.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  });
                  const formattedEventTime = eventDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={index} className={styles.timeSlot}>
                      {formattedEventDate} - {formattedEventTime}
                    </div>
                  );
                })}
              </div>

              <div className={styles.eventColumn}>
                {dailyEvents.map((event, index) => (
                  <EventItem
                    key={index}
                    activityId={event.activityId}
                    activityName={event.activityName}
                    startDate={event.startDate}
                    location={event.location}
                    numberOfTeams={event.numberOfTeams}
                    expense={event.expense}
                    description={event.description}
                    levelname={event.levelName}
                    avatar = {event.avatar}
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