import React, { useState, useRef } from "react";
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

  // State for image upload
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(file);
      setImagePreviewUrl(imageUrl); // Create a valid preview URL for the image
    }
  };

  // Open and close image popup
  const toggleImagePopup = () => {
    if (imagePreviewUrl) { // Ensure the image preview URL exists before toggling the popup
      setIsImagePopupOpen(!isImagePopupOpen);
    }
  };

  const handleCreateEvent = async () => {
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
      const response = await createActivity(
        {
          eventData,
          file: uploadedImage
        }
      );

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

        {/* Image upload section */}
        <div className={styles.imageUploadSection}>
          <label>Chọn ảnh cho kèo đấu</label>
          <input type="file" name="clubImage" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
          {imagePreviewUrl && (
            <button onClick={toggleImagePopup} className={styles.viewImageButton}>
              Xem ảnh
            </button>
          )}
        </div>

        <KeoForm
          formData={formData}
          setFormData={setFormData}
          setIsDuplicateError={setIsDuplicateError}
        />
        <CreateEventButton onClick={handleCreateEvent} />
      </main>

      {/* Image Popup */}
      {isImagePopupOpen && imagePreviewUrl && (
        <div className={styles.imagePopupOverlay} onClick={toggleImagePopup}>
          <div className={styles.imagePopupContent}>
            <img src={imagePreviewUrl} alt="Uploaded Preview" className={styles.imagePopupImage} />
            <button className={styles.closePopupButton} onClick={toggleImagePopup}>Đóng</button>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default CreateSportEvent;
