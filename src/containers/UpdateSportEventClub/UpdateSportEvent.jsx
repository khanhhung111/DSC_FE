import { useEffect, useState } from 'react';
import Hearder from '../../components/Header/Hearder';
import SportSelection from './SportSelection';
import EventTypeSelection from './EventTypeSelection';
import KeoForm from './KeoForm';
import UpdateEventButton from './UpdateEventButton';
import Footer from '../../components/Footer/Footer';
import styles from './UpdateSportEvent.module.css';
import { useNavigate } from 'react-router-dom';
import {uppdateActivityClub} from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { getDetailActivityClub } from "../../utils/activity"; 
function UpdateSportEvent() {
  const { activityclubId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [formData, setFormData] = useState({
    activityId: '',
    datetime: '',
    location: '',
    playerCount: '',
    amount: 0, // Thay vì mảng `cost`, chỉ giữ lại một trường amount
    minSkill: '',
    maxSkill: '',
    name: '',
    description: '',
  });
  
  const handleUpdateEvent = async () => {
    const eventData = {
      activityId:activityclubId,
      sport: selectedSport,
      eventType: selectedEventType,
      datetime: formData.datetime,
      location: formData.location,
      playerCount: formData.playerCount,
      minSkill: formData.minSkill,
      maxSkill: formData.maxSkill,
      name: formData.name,
      description: formData.description,
      userId,  // Truyền trực tiếp `userId` từ localStorage
      amount: formData.amount,  // Truyền amount thay vì `cost`
    };
  
    try {
      const response = await uppdateActivityClub(eventData);
      console.log("response", response);
  
      // Kiểm tra phản hồi
      if (response?.data?.success === true) {
        console.log("result", response);
        toast.success("Đã cập nhật kèo thể thao thành công!", {
          autoClose: 1000,
        });
      } else {
        throw new Error(response?.data?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra khi cập nhật kèo thể thao.", {
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    const loadEventData = async () => {
      try {
        const responsedata = await getDetailActivityClub(activityclubId);
        console.log("responsedata", responsedata);  // Kiểm tra dữ liệu nhận từ API
        
        if (responsedata?.data) {
          const updatedFormData = {
            datetime: responsedata.data.$values[0].startDate,
            location: responsedata.data.$values[0].location,
            playerCount: responsedata.data.$values[0].numberOfTeams,
            minSkill: responsedata.data.$values[0].levelName,
            maxSkill: responsedata.data.$values[0].levelName,
            name: responsedata.data.$values[0].activityName,
            description: responsedata.data.$values[0].description,
            amount: responsedata.data.$values[0].expense,
          };
  
          setFormData(updatedFormData);
          console.log("Updated formData:", updatedFormData);  // Kiểm tra formData sau khi set
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        toast.error("Không thể tải dữ liệu kèo.", { autoClose: 1000 });
      }
    };
    loadEventData();
  }, [activityclubId]);
  
  
  return (
    <div className={styles.createSportEvent}>
      <Hearder />
      <div className={styles.bannerContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/73697ede93124dea36ec63cd0d105c568819e769f86fa52d92e3a5690a5d212c?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt=""
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>Kèo Câu Lạc Bộ</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.secondaryButton} onClick={() => navigate(`/detailmatchclub/${activityclubId}`)}>Trở về</button>
          </div>
        </div>
      </div>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Chỉnh Sửa Kèo</h1>
        <section className={styles.sportSelection}>
          <h2 className={styles.sectionTitle}>MÔN THỂ THAO</h2>
          <SportSelection 
            onSelectSport={setSelectedSport}
            selectedSport={selectedSport}
          />
        </section>
        <section className={styles.eventTypeSelection}>
          <EventTypeSelection 
            onSelectType={setSelectedEventType}
            selectedType={selectedEventType}
          />
        </section>
        <section className={styles.eventForm}>
          <KeoForm 
            formData={formData}        // Truyền formData và setFormData vào KeoForm
            setFormData={setFormData}  // Để KeoForm có thể cập nhật dữ liệu
          />
        </section>
        <UpdateEventButton onClick={handleUpdateEvent} />
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

export default UpdateSportEvent;
