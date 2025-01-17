import { useEffect, useState } from 'react';
import { getDetailActivity } from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ResultMatch.module.css';
import MatchDetails from './MatchDetails';
import DetailsResult from './DetailsResult';
import Footer from "../../components/Footer/Footer"
import HeaderLogin from "../../components/Header/Hearder"
function ResultMatch() {
    const { activityId } = useParams();
    const [matchData, setMatchData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getDetailActivity(activityId);
    
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
    <section className={styles.mainContent}>
        <HeaderLogin />
        <MatchDetails matchData={matchData}/>
      <DetailsResult matchData={matchData}/>
      <Footer />
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </section>
  );
};

export default ResultMatch;