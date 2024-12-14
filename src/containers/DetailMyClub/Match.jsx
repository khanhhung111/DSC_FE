import HeaderLogin from "../../components/Header/Hearder"
import MatchDetails from "./MatchDetails";
import ActionButtons  from "./ActionButtons";
import MatchDescription from "./MatchDescription";
import LocationMap from "./LocationMap";
import styles from "./Match.module.css";
import Footer from "../../components/Footer/Footer"
import { useEffect, useState } from 'react';
import { getDetailClub } from "../../utils/club"; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DetailClub() {
  const { clubId } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        const response = await getDetailClub(clubId); // Truyền trực tiếp clubId
    
        if (response.data) {
            setMatchData(response.data.clubDetails);
          }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện');
      } finally {
        setLoading(false);
      }
    };

    if (clubId) { // Chỉ gọi API khi có clubId
      fetchClub();
    }
  }, [clubId]); // Thêm clubId vào dependencies


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
  );
}

export default DetailClub;