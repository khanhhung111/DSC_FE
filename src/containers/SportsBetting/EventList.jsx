import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.css';
import { toast } from 'react-toastify';
import { getAllActivity } from "../../utils/activity";
import { dateFormatting } from '../../utils/formatHelper';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getAllActivity(userId);

        if (response.data && response.data.$values) {
          setEvents(response.data.$values);
        } else {
          toast.error('Dữ liệu sự kiện không đúng định dạng');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const groupEventsByDate = (events) => {
    if (!Array.isArray(events) || events.length === 0) return [];

    const grouped = events.reduce((groups, event) => {
      if (!event.startDate) return groups;

      const eventDate = new Date(event.startDate);
      // Format ngày chuẩn dd/mm/yyyy
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

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      // Chuyển dd/mm/yyyy -> yyyy-mm-dd để so sánh
      const parseDate = (date) => {
        const [day, month, year] = date.split('/');
        return new Date(Date.UTC(year, month - 1, day));
      };
      return parseDate(dateA) - parseDate(dateB);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (events.length === 0) {
    return <div>Không có sự kiện nào</div>;
  }

  return (
    <section className={styles.eventList}>
      {groupEventsByDate(events).map(([date, dailyEvents]) => {
        const [day, month, year] = date.split('/');
        const headerDate = new Date(Date.UTC(year, month - 1, day));

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
                  const formattedEventTime = eventDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={index} className={styles.timeSlot}>
                      {date} - {formattedEventTime}
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
