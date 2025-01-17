import HeaderLogin from "../../components/Header/Hearder"
import Footer from "../../components/Footer/Footer"
import ParticipantList from "./ParticipantList";
import MatchDetails from "./MatchDetails";
import styles from "./MemberMatch.module.css";
import { useEffect, useState } from 'react';
import { getMemberActivityClub } from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function Match() {
  const { activityclubId } = useParams();
  const [memberdata, setmemberdata] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getMemberActivityClub(activityclubId); // Truyền trực tiếp activityId
        console.log("response",response);
        if (response.data) {
            setmemberdata(response.data);
            console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        
      } finally {
        setLoading(false);
      }
    };

    if (activityclubId) { // Chỉ gọi API khi có activityId
      fetchActivity();
    }
  }, [activityclubId]); // Thêm activityId vào dependencies


  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }
  return (
    <div>
    <main className={styles.matchContainer}>
      <HeaderLogin />
      <MatchDetails memberdata={memberdata}/>
      <ParticipantList memberdata={memberdata}/>
    </main>
        <Footer />
    </div>

  );
}

export default Match;