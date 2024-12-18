import React, { useState } from 'react';
import Hearder from '../../components/Header/Hearder';
import SportSelection from './SportSelection';
import EventTypeSelection from './EventTypeSelection';
import KeoForm from './KeoForm';
import CreateEventButton from './CreateEventButton';
import Footer from '../../components/Footer/Footer';
import styles from './CreateSportEvent.module.css';
import { useNavigate } from 'react-router-dom';
import { createActivity } from "../../utils/activity";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateSportEvent() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  if (!userId) {
    console.log("userId không tồn tại trong localStorage");
  }

  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [isDuplicateError, setIsDuplicateError] = useState(false);
  const [formData, setFormData] = useState({
    datetime: '',
    location: '',
    playerCount: '',
    amount: 0,
    minSkill: '',
    maxSkill: '',
    name: '',
    description: '',
    isFree: true,
  });

  const handleCreateEvent = async () => {
    // Validate required fields
    if (
      !selectedSport ||
      !selectedEventType ||
      !formData.datetime ||
      !formData.location ||
      !formData.playerCount ||
      !formData.minSkill ||
      !formData.maxSkill ||
      !formData.name ||
      !formData.description
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi tạo kèo!", {
        autoClose: 3000,
      });
      return;
    }

    if (isDuplicateError) {
      toast.error("Tên kèo đã tồn tại, vui lòng chọn tên khác!", {
        autoClose: 3000,
      });
      return;
    }

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
      userId,
      amount: formData.amount,
    };

    try {
      const response = await createActivity(eventData);

      if (response?.data?.success === true) {
        toast.success("Đã tạo kèo thể thao thành công!", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate('/mybetting');
        }, 1000);
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
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Tạo kèo</h1>
        <SportSelection onSelectSport={setSelectedSport} selectedSport={selectedSport} />
        <EventTypeSelection onSelectType={setSelectedEventType} selectedType={selectedEventType} />
        <KeoForm
          formData={formData}
          setFormData={setFormData}
          setIsDuplicateError={setIsDuplicateError}
        />
        <CreateEventButton onClick={handleCreateEvent} />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default CreateSportEvent;
