import React, { useState, useRef } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import styles from "./SportClubCreation.module.css";
import { useNavigate,useLocation} from 'react-router-dom';
import HeaderLogin from "../../components/Header/Hearder";
import HeroSection from "../Club/HeroSection";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // CSS mặc định của Quill
import { createClub } from "../../utils/club"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const skillLevels = [
  { label: "Mới biết chơi", value: 1 },
  { label: "Trung bình - Khá", value: 2 },
  { label: "Chuyên nghiệp", value: 3 },
];

function SportClubCreation() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const sports = [
    { emoji: "⚽", name: "Bóng đá", value: 1 },
    { emoji: "🏐", name: "Bóng chuyền", value: 2 },
    { emoji: "🏀", name: "Bóng rổ", value: 3 },
    { emoji: "🏸", name: "Cầu lông", value: 4 },
    { emoji: "🥒", name: "Pickleball", value: 5 },
    { emoji: "🎱", name: "Bida", value: 6 },
  ];
  const [sendformData, setFormData] = useState({
    userId: userId,
    clubName: "",
    skillLevel: "",
    sport: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, clubImage: URL.createObjectURL(file) }));
      setSelectedFile(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, clubImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!sendformData.clubName.trim()) newErrors.clubName = "Tên câu lạc bộ là bắt buộc.";
    if (!sendformData.clubImage) newErrors.clubImage = "Hình ảnh câu lạc bộ là bắt buộc.";
    if (!sendformData.skillLevel) newErrors.skillLevel = "Trình độ thể thao là bắt buộc.";
    if (!sendformData.sport) newErrors.sport = "Môn thể thao là bắt buộc.";
    if (!sendformData.description.trim()) newErrors.description = "Quy định câu lạc bộ là bắt buộc.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const responseClub = await createClub({
        sendformData,
        file: selectedFile
      });
      console.log("Success:", responseClub);
      toast.success("Câu lạc bộ của bạn đã được tạo thành công!", {
        autoClose: 1000,
      });
      setTimeout(() => navigate('/myclub'), 1900);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
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
                value={sendformData.clubName}
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
            {sendformData.clubImage && (
              <div className={styles.imagePreview}>
                <div className={styles.imageWrapper}>
                  <img
                    src={sendformData.clubImage}
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
                    className={`${styles.sportButton} ${sendformData.sport === sport.value ? styles.selected : ""
                      }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, sport: sport.value }))
                    }
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
                    className={`${styles.skillLevelButton} ${sendformData.skillLevel === level.value ? styles.selected : ""
                      }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, skillLevel: level.value }))
                    }
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>


            {/* Description */}
            <div className={styles.formGroup}>
              <label
                htmlFor="clubDescription"
                className={styles.formLabel}
                style={{ fontWeight: 600 }}
              >
                Quy Định Câu Lạc Bộ
              </label>
              <ReactQuill
                id="clubDescription"
                value={sendformData.description} // Liên kết giá trị từ formData
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                } // Cập nhật formData khi nội dung thay đổi
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
              <button className={styles.createButton}>Tạo</button>
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

export default SportClubCreation;
