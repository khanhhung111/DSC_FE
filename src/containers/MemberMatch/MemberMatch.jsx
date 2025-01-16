import HeaderLogin from "../../components/Header/Hearder"
import Footer from "../../components/Footer/Footer"
import ParticipantList from "./ParticipantList";
import MatchDetails from "./MatchDetails";
import styles from "./MemberMatch.module.css";
import { useEffect, useState } from 'react';
import { getMemberActivity } from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Match() {
  const { activityId } = useParams();
  const [memberdata, setmemberdata] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getMemberActivity(activityId); // Truyền trực tiếp activityId
    
        if (response.data) {
            setmemberdata(response.data);
            console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện');
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
    <div>
    <main className={styles.matchContainer}>
      <HeaderLogin />
      <MatchDetails memberdata={memberdata}/>
      <ParticipantList memberdata={memberdata}/>
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
    </main>
        <Footer />
    </div>

  );
}

export default Match;