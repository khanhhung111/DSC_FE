import { useEffect, useState, useRef } from 'react';
import Hearder from '../../components/Header/Hearder';
import SportSelection from './SportSelection';
import EventTypeSelection from './EventTypeSelection';
import KeoForm from './KeoForm';
import UpdateEventButton from './UpdateEventButton';
import Footer from '../../components/Footer/Footer';
import styles from './UpdateSportEvent.module.css';
import { useNavigate } from 'react-router-dom';
import { uppdateActivity } from "../../utils/activity";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { getDetailActivity } from "../../utils/activity";

function UpdateSportEvent() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [formData, setFormData] = useState({
    activityId: '',
    datetime: '',
    location: '',
    playerCount: '',
    amount: 0,
    minSkill: '',
    maxSkill: '',
    name: '',
    description: '',
    // avatar: '',
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // State quản lý popup ảnh
  const fileInputRef = useRef(null);

  // Toggle Image Popup
  const toggleImagePopup = () => setIsImagePopupOpen(!isImagePopupOpen);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(file);
      setImagePreviewUrl(imageUrl);
    }
  };
  const handleUpdateEvent = async () => {
    const eventData = {
      activityId,
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
      avatar: uploadedImage || formData.avatar, // Use uploaded image if available, else use current avatar
    };
  
    try {
      const response = await uppdateActivity({
        eventData,
        file: uploadedImage
      }
        );
      console.log("response", response);
  
      if (response?.data?.success === true) {
        toast.success("Đã cập nhật kèo thể thao thành công!", {
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
      toast.error("Có lỗi xảy ra khi cập nhật kèo thể thao.", {
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    const loadEventData = async () => {
      try {
        const responsedata = await getDetailActivity(activityId);
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
            avatar: responsedata.data.$values[0].avatar, // Load avatar từ API
          };
          setFormData(updatedFormData);
          setImagePreviewUrl(responsedata.data.$values[0].avatar);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        toast.error("Không thể tải dữ liệu kèo.", { autoClose: 1000 });
      }
    };
    loadEventData();
  }, [activityId]);

  return (
    <div className={styles.createSportEvent}>
      <Hearder />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Chỉnh Sửa Kèo</h1>
        <SportSelection onSelectSport={setSelectedSport} selectedSport={selectedSport} />
        <EventTypeSelection onSelectType={setSelectedEventType} selectedType={selectedEventType} />

        {/* Image Upload Section */}
        <div className={styles.imageUploadSection}>
          <label>Chọn ảnh cho kèo đấu</label>
          <input
            type="file"
            name="clubImage"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          {imagePreviewUrl && (
            <button onClick={toggleImagePopup} className={styles.viewImageButton}>
              Xem ảnh
            </button>
          )}
        </div>

        <KeoForm formData={formData} setFormData={setFormData} />
        <UpdateEventButton onClick={handleUpdateEvent} />
      </main>

      {/* Popup Image */}
      {isImagePopupOpen && imagePreviewUrl && (
        <div className={styles.imagePopupOverlay} onClick={toggleImagePopup}>
          <div className={styles.imagePopupContent} onClick={(e) => e.stopPropagation()}>
            <img src={imagePreviewUrl} alt="Avatar Preview" className={styles.imagePopupImage} />
            <button onClick={toggleImagePopup} className={styles.closePopupButton}>
              Đóng
            </button>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default UpdateSportEvent;
