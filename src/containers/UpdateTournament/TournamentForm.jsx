import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Hearder';
import styles from './TournamentForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateTounarment, createTournament, getTournamentDetails } from "../../utils/tournament"; // Import các hàm API
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const TournamentForm = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams(); // Lấy tournamentId từ URL nếu có
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
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
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const sports = [
    { id: 1, name: 'Bóng đá', icon: '⚽' },
    { id: 2, name: 'Bóng chuyền', icon: '🏐' },
    { id: 3, name: 'Bóng rổ', icon: '🏀' },
    { id: 4, name: 'Cầu lông', icon: '🏸' },
  ];

  const levels = [
    { id: 1, name: 'Mới biết chơi' },
    { id: 2, name: 'Trung bình - Khá' },
    { id: 3, name: 'Chuyên nghiệp' },
  ];

  const userId = localStorage.getItem('userId'); // Retrieve UserId from localStorage
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  // Hàm tải thông tin giải đấu khi edit
  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const response = await getTournamentDetails(tournamentId);
        if (response.data && response.data.$values && response.data.$values.length > 0) {
          const tournamentData = response.data.$values[0];

          // Format dates properly for input fields
          setFormData({
            Name: tournamentData.name || '',
            startDate: formatDateForInput(tournamentData.startDate),
            endDate: formatDateForInput(tournamentData.endDate),
            registrationDeadline: formatDateForInput(tournamentData.limitRegister),
            location: tournamentData.location || '',
            startTime: tournamentData.createdDate ? tournamentData.createdDate.split('T')[1].substring(0, 5) : '',
            note: tournamentData.description || '',
            numberOfParticipants: tournamentData.numberOfTeams || '',
            teamSize: tournamentData.memberOfTeams || '',
            avatar: tournamentData.avatar || '',
          });

          setSelectedSport(tournamentData.sportId);
          setSelectedLevel(tournamentData.levelId - 1);
        }
      } catch (error) {
        console.error('Error fetching tournament details:', error);
        toast.error('Không thể tải thông tin giải đấu');
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentDetails();
    }
  }, [tournamentId]);

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
    setIsImageChanged(true);
  }
};
  const validateForm = () => {
    const newErrors = {};

    if (!selectedSport) {
      newErrors.sport = 'Vui lòng chọn môn thể thao';
    }
    if (!selectedFile && !formData.avatar) {
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
      newErrors.numberOfParticipants = 'Vui lòng nhập số người tham gia';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const startDateTime = `${formData.startDate}T${formData.startTime}:00`;

    const tournamentData = {
      sportId: selectedSport,
      levelId: levels[selectedLevel].id,
      userId: userId,
      name: formData.Name,
      note: formData.note,
      startDate: formData.startDate,
      endDate: formData.endDate,
      registrationDeadline: formData.registrationDeadline,
      location: formData.location,
      teamSize: formData.teamSize,
      startTime: startDateTime,
      numberOfParticipants: formData.numberOfParticipants,
    };
    console.log('TournamentData:', selectedFile);
    try {
      let response;
      if (tournamentId) {
        // Thêm tournamentId vào data khi update
        tournamentData.tournamentId = tournamentId;
        response = await updateTounarment({
          tournamentId,
          tournamentData,
          file: selectedFile
        });
      }
      if (response.data.success === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/mytournament');
        }, 1200);
      } else {
        toast.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Không thể thực hiện hành động');
    }
  };

  return (
    <div>
      <Header />
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
            <div className={styles.formGrid}>
              <label>Hình ảnh</label>
              <input
                type="file"
                onChange={handleImageChange}
              />
              <div className={styles.imagePreview}>
                <img
                  src={previewUrl || formData.avatar} // avatar là URL ảnh từ cloud
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            </div>
            {errors.image && <span className={styles.error}>{errors.image}</span>}
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
            <button type="submit" className={styles.submitButton}>{tournamentId ? 'Cập Nhật' : 'Tạo'}</button>
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
