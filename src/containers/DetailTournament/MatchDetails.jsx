import React from "react";
import styles from './MatchDetails.module.css';
import {amountFormatting} from '../../utils/formatHelper'
import { dateFormatting } from "../../utils/formatHelper";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons"; // Import icon từ Ant Design

function MatchDetails({matchData}) {
  const data = matchData[0];
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  return (
    <section className={styles.matchDetails}>
      <h1 className={styles.matchTitle}>{data?.name}</h1>
      <div className={styles.matchInfo}>
        <div className={styles.infoItem}>
          <span><CalendarOutlined style={{color: "#faad14" }} /> {dateFormatting(data.startDate)} -  <CalendarOutlined style={{color: "#faad14" }} /> {dateFormatting(data.endDate)}</span>
        </div>
       
      </div>
      <div className={styles.infoItem} style={{paddingBottom:'7px'}}>
      <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <span>{data.location}</span>
      </div>

      <UserOutlined style={{ marginRight: "8px", color: "green" }} />
      {data.numberOfTeams} đội - thành viên {data.memberOfTeams}

      <p className={styles.infoItem} style={{paddingTop:'5px'}}><CalendarOutlined style={{marginRight: "8px",color: "#faad14" }} /> <span style={{marginRight: "5px",color:'red'}}> Hạn đăng ký  </span> :  {dateFormatting(data.LimitRegister)}</p>
    </section>
  );
}

export default MatchDetails;