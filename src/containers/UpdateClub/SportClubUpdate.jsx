import React, { useState, useEffect, useRef } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import styles from "./SportClubUpdate.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import HeaderLogin from "../../components/Header/Hearder";
import HeroSection from "../Club/HeroSection";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // CSS mặc định của Quill
import { getDetailClub, updateClub } from "../../utils/club"; // Thay đổi sang gọi API cập nhật
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const skillLevels = [
  { label: "Mới biết chơi", value: 1 },
  { label: "Trung bình - Khá", value: 2 },
  { label: "Chuyên nghiệp", value: 3 },
];
const sports = [
  { emoji: "⚽", name: "Bóng đá", value: 1 },
  { emoji: "🏐", name: "Bóng chuyền", value: 2 },
  { emoji: "🏀", name: "Bóng rổ", value: 3 },
  { emoji: "🏸", name: "Cầu lông", value: 4 },
  { emoji: "🥒", name: "Pickleball", value: 5 },
  { emoji: "🎱", name: "Bida", value: 6 },
];

function SportClubUpdate() {
  const navigate = useNavigate();
  const { clubId } = useParams(); // Dùng để lấy ID câu lạc bộ từ URL nếu có
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [clubData, setClubData] = useState({
    clubName: "",
    skillLevel: "",
    sport: "",
    description: "",
    clubImage: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Gọi API để lấy thông tin câu lạc bộ khi trang được tải
    const fetchClubData = async () => {
      try {
        const response = await getDetailClub(clubId);
        if (response.data.clubDetails && response.data.success) {
          const data = response.data.clubDetails;
          setClubData({
            clubName: data.clubName,
            clubImage: data.avatar,
            description: data.rules || "", // Gán rules vào description
            sport: data.sportId || "", // Gán giá trị sport từ API nếu có
            skillLevel: data.levelId || "", // Gán giá trị skillLevel từ API nếu có
          }); // Cập nhật thông tin câu lạc bộ vào state
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
      }
    };

    fetchClubData();
  }, [clubId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClubData((prev) => ({ ...prev, clubImage: URL.createObjectURL(file) }));
      setSelectedFile(file);
    }
  };

  const handleImageRemove = () => {
    setClubData((prev) => ({ ...prev, clubImage: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!clubData.clubName.trim()) newErrors.clubName = "Tên câu lạc bộ là bắt buộc.";
    if (!clubData.clubImage) newErrors.clubImage = "Hình ảnh câu lạc bộ là bắt buộc.";
    if (!clubData.skillLevel) newErrors.skillLevel = "Trình độ thể thao là bắt buộc.";
    if (!clubData.sport) newErrors.sport = "Môn thể thao là bắt buộc.";
    if (!clubData.description || !clubData.description.trim()) {
      newErrors.description = "Quy định câu lạc bộ là bắt buộc.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Handling submit...');
    try {
      console.log('Form is valid, proceeding to update...');
      const responseClub = await updateClub({
        clubId,
        clubData,
        file: selectedFile,
      });
      console.log("Success:", responseClub);
      toast.success("Câu lạc bộ của bạn đã được cập nhật thành công!", {
        autoClose: 1000,
      });
      setTimeout(() => navigate(`/updateclub/${clubId}`), 1900); // Điều hướng tới trang chi tiết câu lạc bộ
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };
  const handleSportSelect = (value) => {
    setClubData((prev) => ({ ...prev, sport: value }));
  };

  // Cập nhật khi người dùng chọn trình độ thể thao
  const handleSkillLevelSelect = (value) => {
    setClubData((prev) => ({ ...prev, skillLevel: value }));
  };

  return (
    <div className={styles.sportClubCreation}>
      <HeaderLogin />
      <main className={styles.mainContent}>
        <section className={styles.clubCreationSection}>
          <HeroSection />
          <form className={styles.clubForm} onSubmit={handleSubmit}>
            {/* Club Name */}
            <div className={styles.formGroup}>
              <label htmlFor="clubName" className={styles.formLabel} style={{ fontWeight: 600 }}>
                Tên câu lạc bộ
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                className={styles.formInput}
                value={clubData.clubName}
                onChange={handleInputChange}
              />
              {errors.clubName && <p className={styles.errorText} style={{ color: 'red' }}>{errors.clubName}</p>}
            </div>

            {/* Club Image */}
            <div className={styles.formGroup}>
              <label htmlFor="clubImage" className={styles.formLabel} style={{ fontWeight: 600 }}>
                Tải ảnh câu lạc bộ
              </label>
              <input
                type="file"
                id="clubImage"
                name="clubImage"
                className={styles.formInput}
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {errors.clubImage && <p className={styles.errorText} style={{ color: 'red' }}>{errors.clubImage}</p>}
            </div>
            {clubData.clubImage && (
              <div className={styles.imagePreview}>
                <div className={styles.imageWrapper}>
                  <img
                    src={clubData.clubImage}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                  <CloseCircleOutlined
                    className={styles.removeIcon}
                    onClick={handleImageRemove}
                  />
                </div>
              </div>
            )}
            {/* Sport Selection */}
            <div className={styles.formGroup}>
              <h2 className={styles.sectionTitle} style={{ fontWeight: 600 }}>Chọn môn thể thao</h2>
              <div className={styles.sportGrid}>
                {sports.map((sport) => (
                  <button
                    type="button"
                    key={sport.value}
                    className={`${styles.sportButton} ${clubData.sport === sport.value ? styles.selected : ""}`}
                    onClick={() => handleSportSelect(sport.value)}
                  >
                    <span className={styles.sportEmoji}>{sport.emoji}</span>
                    <span className={styles.sportName}>{sport.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} style={{ fontWeight: 600 }}>Trình độ thể thao</label>
              <div className={styles.skillLevelGrid}>
                {skillLevels.map((level) => (
                  <button
                    type="button"
                    key={level.value}
                    className={`${styles.skillLevelButton} ${clubData.skillLevel === level.value ? styles.selected : ""}`}
                    onClick={() => handleSkillLevelSelect(level.value)}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label htmlFor="clubDescription" className={styles.formLabel} style={{ fontWeight: 600 }}>
                Quy Định Câu Lạc Bộ
              </label>
              <ReactQuill
                id="clubDescription"
                value={clubData.description}
                onChange={(value) =>
                  setClubData((prev) => ({ ...prev, description: value }))
                }
                placeholder="Nhập quy định câu lạc bộ..."
                style={{ height: "250px", paddingBottom: "50px" }}
                theme="snow"
              />
              {errors.description && (
                <p className={styles.errorText} style={{ color: "red" }}>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className={styles.centerWrapper}>
              <button className={styles.createButton}>Cập nhật</button>
            </div>
          </form>
        </section>
      </main>
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
}

export default SportClubUpdate;
