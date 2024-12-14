import React, { useState } from 'react';
import Hearder from '../../components/Header/Hearder';
import SportSelection from './SportSelection';
import EventTypeSelection from './EventTypeSelection';
import KeoForm from './KeoForm';
import CreateEventButton from './CreateEventButton';
import Footer from '../../components/Footer/Footer';
import styles from './CreateSportEvent.module.css';
import { useNavigate } from 'react-router-dom';
import {createActivity} from "../../utils/activity"; 
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateSportEvent() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  if (!userId) {
  console.log("userId không tồn tại trong localStorage");
} else {
  console.log("userId đã được lưu:", userId);
}
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [formData, setFormData] = useState({
    datetime: '',
    location: '',
    playerCount: '',
    amount: 0, // Thay vì mảng `cost`, chỉ giữ lại một trường amount
    minSkill: '',
    maxSkill: '',
    name: '',
    description: '',
  });
  
  const handleCreateEvent = async () => {
    const eventData = {
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
      const response = await createActivity(eventData);
      console.log("response", response);
  
      // Kiểm tra phản hồi
      if (response?.data?.success === true) {
        console.log("result", response);
        toast.success("Đã tạo kèo thể thao thành công!", {
          autoClose: 1000,
        });
  
        // Làm mới trang sau một khoảng thời gian ngắn
        setTimeout(() => {
          navigate('/mybetting');
        }, 1000); // Thời gian trễ trước khi làm mới
      } else {
        throw new Error(response?.data?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra khi tạo kèo thể thao.", {
        autoClose: 1000,
      });
    }
  };

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
          <h2 className={styles.bannerTitle}>Kèo thể thao</h2>
          <p className={styles.bannerSubtitle}>Subtitle</p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton} onClick={() => navigate('/sportbetting')}>Tất cả các kèo thể thao</button>
            <button className={styles.secondaryButton} onClick={() => navigate('/management-betting')}>Quản lý kèo thể thao của tôi</button>
          </div>
        </div>
      </div>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Tạo kèo</h1>
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
        <CreateEventButton onClick={handleCreateEvent} />
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

export default CreateSportEvent;
