import HeaderLogin from "../../components/Header/Hearder"
import MatchDetails from "./MatchDetails";
import ActionButtons  from "./ActionButtons";
import MatchDescription from "./MatchDescription";
import LocationMap from "./LocationMap";
import styles from "./Match.module.css";
import Footer from "../../components/Footer/Footer"
import { useEffect, useState } from 'react';
import { getDetailActivity } from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function PickleballMatch() {
  const { activityId } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getDetailActivity(activityId); // Truyền trực tiếp activityId
    
        if (response.data) {
          if (response.data.$values && Array.isArray(response.data.$values)) {
            setMatchData(response.data.$values);
          } else {
            console.error('Dữ liệu không phải là một mảng:', response.data);
            toast.error('Dữ liệu sự kiện không đúng định dạng');
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        
      } finally {
        setLoading(false);
      }
    };

    if (activityId) { // Chỉ gọi API khi có activityId
      fetchActivity();
    }
  }, [activityId]); // Thêm activityId vào dependencies


  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }
  return (
    <main className={styles.pickleballMatch}>
      <HeaderLogin />
      <section className={styles.content}>
        <MatchDetails matchData={matchData}/>
        <ActionButtons matchData={matchData}/>
        <LocationMap matchData={matchData}/>
        <MatchDescription matchData={matchData}/>
        
        </section>
      <Footer />
    </main>
  );
}

export default PickleballMatch;