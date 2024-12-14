import { useEffect, useState ,useCallback} from "react";
import Header from '../../components/Header/Hearder';
import styles from './TournamentForm.module.css';
import { useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import LocaleProvider from 'antd/es/locale';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTournament,createPayment,setPayment,deleteTournament } from "../../utils/tournament"
const TournamentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [params, setParams] = useState(new URLSearchParams(location.search));
  const [hasSetPaymentCalled, setHasSetPaymentCalled] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    location: '',
    startTime: '',
    note: '',
    numberOfParticipants: '',
    teamSize: ''
  });
  const [errors, setErrors] = useState({});

  const sports = [
    { id: 1, name: 'Bóng đá', icon: '⚽' },
    { id: 2, name: 'Bóng chuyền', icon: '🏐' },
    { id: 3, name: 'Bóng rổ', icon: '🏀' },
    { id: 4, name: 'Cầu lông', icon: '🏸' },
    { id: 5, name: 'Pickleball', icon: '🏓' },
    { id: 6, name: 'Bida', icon: '🎱' },
  ];

  const levels = [
    { id: 1, name: 'Mới biết chơi' },
    { id: 2, name: 'Trung bình - Khá' },
    { id: 3, name: 'Chuyên nghiệp' },
  ];

  const userId = localStorage.getItem('userId'); // Retrieve UserId from localStorage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      levelId: selectedLevel !== null ? levels[selectedLevel].id : null,
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleOpenModal = () => {
    if (previewUrl) {
      setIsModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const validateForm = () => {
    const newErrors = {};

    if (!selectedSport) {
      newErrors.sport = 'Vui lòng chọn môn thể thao';
    }
    if (!selectedFile && selectedFile !== 0) {
      newErrors.image = 'Vui lòng chọn ảnh cho giải đấu';
    }

    if (!selectedLevel && selectedLevel !== 0) {
      newErrors.level = 'Vui lòng chọn trình độ';
    }

    if (!formData.Name.trim()) {
      newErrors.Name = 'Vui lòng nhập tên giải đấu';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
    }

    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Vui lòng chọn hạn đăng ký';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Vui lòng nhập địa điểm';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Vui lòng chọn giờ bắt đầu';
    }

    if (!formData.numberOfParticipants) {
      newErrors.numberOfParticipants = 'Vui lòng nhập số đội tham gia';
    } else if (formData.numberOfParticipants < 2) {
      newErrors.numberOfParticipants = 'Số đội tham gia phải ít nhất là 2';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Vui lòng nhập số người trong mỗi đội';
    } else if (formData.teamSize < 1) {
      newErrors.teamSize = 'Số người trong đội phải ít nhất là 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const callNetPayment = useCallback(async () => {
    try {
      // Đảm bảo không gọi lại hàm nếu đã xử lý
      if (!toastShown && params.toString()) {
        const responsePayment = await setPayment(params);
        console.log(responsePayment);
        if (responsePayment.message === "Success" && responsePayment.rspCode) {
          toast.success("Tạo giải đấu thành công.", {
            autoClose: 1000,
          });
          setToastShown(true); // Đặt trạng thái để không hiển thị lại toast
          setTimeout(() => navigate('/mytournament'), 1900);
        } else {
          await deleteTournament(responsePayment.tournamentId);
          toast.error("Bạn không thanh toán nên không thể tạo giải đấu.", {
            autoClose: 1000,
          });
          setTimeout(() => navigate('/createTournament'), 1900);
        }
      }
    } catch (err) {
      console.error('Error in callNetPayment:', err);
    }
  }, [params, toastShown, navigate]);
  
  useEffect(() => {
    if (!toastShown) {
      callNetPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]); // Chỉ phụ thuộc vào params để tránh gọi lại không cần thiết
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Format startTime to combine date and time
    const startDateTime = `${formData.startDate}T${formData.startTime}:00`; // Format: "YYYY-MM-DDThh:mm:ss"

    const tournamentData = {
      sportId: selectedSport,
      LevelId: levels[selectedLevel].id,
      UserId: userId,
      Name: formData.Name,
      note: formData.note,
      StartDate: formData.startDate,
      EndDate: formData.endDate,
      location: formData.location,
      teamSize: formData.teamSize,
      startTime: startDateTime,
      numberOfParticipants: formData.numberOfParticipants,
      registrationDeadline: formData.registrationDeadline,
      // Sử dụng định dạng đã format
    };

    console.log('TournamentData:', selectedFile);
    try {
      const responseTournament = await createTournament({
        tournamentData,
        file: selectedFile
      });
        console.log("tournamentId",responseTournament.data.tournamentId)
        if(responseTournament.data.tournamentId){
          const TournamentId = responseTournament.data.tournamentId;
          const Amount = 200000;
          const response = await createPayment(TournamentId,Amount)
            if (response.data){
              window.location.href =response.data;
            }
            else {
              toast.error(response.data.message || 'Có lỗi xảy ra');
            }
        }else {
        toast.error(responseTournament.data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast.error(error.responseTournament?.data?.message || 'Không thể tạo giải đấu');
    }
  };

  console.log("previewUrl", previewUrl)
  return (
    <div>
      <Header />

      <div className={styles.bannerContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/73697ede93124dea36ec63cd0d105c568819e769f86fa52d92e3a5690a5d212c?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt=""
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>Giải Đấu</h2>
          <p className={styles.bannerSubtitle}>Subtitle</p>
          <div className={styles.buttonGroup}>
            <button className={styles.secondaryButton} onClick={() => navigate('/createTournament')}>Tạo Giải Đấu</button>
            <button className={styles.primaryButton} onClick={() => navigate('/managementtournament')}>Tham Gia Giải đấu</button>
            <button className={styles.primaryButton} onClick={() => navigate('/mytournament')}>Quản Lí Giải đấu</button>
          </div>
        </div>
      </div>
      <div className={styles.tournamentContainer}>


        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3>Chọn môn thể thao</h3>
            <div className={styles.sportsGrid}>
              {sports.map((sport) => (
                <div
                  key={sport.id}
                  className={`${styles.sportItem} ${selectedSport === sport.id ? styles.selected : ''}`}
                  onClick={() => setSelectedSport(sport.id)}
                >
                  <div className={styles.sportIcon}>{sport.icon}</div>
                  <div className={styles.sportName}>{sport.name}</div>
                </div>
              ))}
            </div>
            {errors.sport && <span className={styles.error}>{errors.sport}</span>}
          </div>

          <div className={styles.section}>
            <h3>Trình độ thể thao</h3>
            <div className={styles.levelsGrid}>
              {levels.map((level, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.levelButton} ${selectedLevel === index ? styles.selected : ''}`}
                  onClick={() => setSelectedLevel(index)}
                >
                  {level.name}
                </button>
              ))}
            </div>
            {errors.level && <span className={styles.error}>{errors.level}</span>}
          </div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <input
                type="text"
                name="Name"
                placeholder="Tên giải đấu"
                value={formData.Name}
                onChange={handleInputChange}
              />
              {errors.Name && <span className={styles.error}>{errors.Name}</span>}
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Hình ảnh</label>
              <input
                type="file"
                onChange={handleImageChange}
                className={styles.imageUploadInput}
              />
              {previewUrl && (
                <button className={styles.openModalButton} onClick={handleOpenModal}>
                  Xem ảnh
                </button>
              )}
              {errors.image && <span className={styles.error}>{errors.image}</span>}
            </div>

            {isModalVisible && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <img src={previewUrl} alt="Preview" className={styles.modalImage} />
                  <button className={styles.closeModalButton} onClick={handleCloseModal}>
                    Đóng
                  </button>
                </div>
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Ngày diễn ra</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
              {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Ngày kết thúc</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
              {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Hạn đăng kí</label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleInputChange}
              />
              {errors.registrationDeadline && <span className={styles.error}>{errors.registrationDeadline}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Địa điểm thi đấu</label>
              <input
                type="text"
                name="location"
                placeholder="Sân bóng rổ"
                value={formData.location}
                onChange={handleInputChange}
              />
              {errors.location && <span className={styles.error}>{errors.location}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Giờ bắt đầu</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
              {errors.startTime && <span className={styles.error}>{errors.startTime}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Ghi chú</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Số đội tham gia</label>
              <select
                name="numberOfParticipants"
                value={formData.numberOfParticipants}
                onChange={handleInputChange}
                className={styles.selectInput}
              >
                <option value="">Chọn số đội</option>
                <option value="4">4 đội</option>
                <option value="8">8 đội</option>
                <option value="16">16 đội</option>
                <option value="32">32 đội</option>
              </select>
              {errors.numberOfParticipants && (
                <span className={styles.error}>
                  {errors.numberOfParticipants}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Số người trong mỗi đội</label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
              />
              {errors.teamSize && <span className={styles.error}>{errors.teamSize}</span>}
            </div>
          </div>

          <div className={styles.submitSection}>
            <button type="submit" className={styles.submitButton}>Tạo</button>
            <p className={styles.feeText}>Phí tổ chức giải đấu là 200,000Đ</p>
          </div>
        </form>
      </div>
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
    </div>
  );
};

export default TournamentForm;