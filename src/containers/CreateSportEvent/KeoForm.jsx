import React, { useState, useEffect } from 'react';
import styles from './KeoForm.module.css';
import {getNameActivity} from "../../utils/activity"

const KeoForm = ({ formData, setFormData, setIsDuplicateError }) => {
  const [existingNames, setExistingNames] = useState([]);

  const toggleCostType = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isFree: !prevFormData.isFree,
      amount: prevFormData.isFree ? 0 : prevFormData.amount,
    }));
  };

  useEffect(() => {
    const fetchExistingNames = async () => {
      try {
        const response = await getNameActivity();
        setExistingNames(response.data.$values);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchExistingNames();
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });

    // Cập nhật trạng thái trùng tên lên component cha
    if (existingNames.includes(newName)) {
      setIsDuplicateError(true);
    } else {
      setIsDuplicateError(false);
    }
  };

  return (
    <form className={styles.eventForm} style={{ paddingTop: '50px' }}>
      <div className={styles.formColumns}>
        <div className={styles.leftColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="eventDate" className={styles.label}>📅 Chọn ngày và giờ</label>
            <input
              type="datetime-local"
              id="eventDate"
              className={styles.input}
              value={formData.datetime}
              onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="eventLocation" className={styles.label}>⛳️ Chọn địa điểm</label>
            <input
              type="text"
              id="eventLocation"
              className={styles.input}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="playerCount" className={styles.label}>👤 Số người chơi</label>
            <input
              type="number"
              id="playerCount"
              className={styles.input}
              min="1"
              value={formData.playerCount}
              onChange={(e) => setFormData({ ...formData, playerCount: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>💲 Chi phí</label>
            <div className={styles.costOptions}>
              <button
                type="button"
                className={`${styles.costButton} ${formData.isFree ? styles.active : ''}`}
                onClick={toggleCostType}
              >
                {formData.isFree ? '🆓 Miễn phí' : '💰 Có phí'}
              </button>
              {!formData.isFree && (
                <div className={styles.costInputGroup}>
                  <input
                    type="number"
                    className={styles.costInput}
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({
                      ...formData,
                      amount: parseInt(e.target.value) || 0
                    })}
                  />
                  <span className={styles.costUnit}>VNĐ</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.ruler}></div>

        <div className={styles.rightColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="eventName" className={styles.label}>Tên kèo</label>
            <input
              type="text"
              id="eventName"
              className={`${styles.input} ${existingNames.includes(formData.name) ? styles.errorInput : ''}`}
              placeholder="Vd: Giao hữu với tôi"
              value={formData.name}
              onChange={handleNameChange}
              required
            />
            {existingNames.includes(formData.name) && (
              <p className={styles.errorText}>Tên kèo đã tồn tại, vui lòng chọn tên khác.</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="eventDescription" className={styles.label}>Mô tả</label>
            <textarea
              id="eventDescription"
              className={styles.textarea}
              rows="6"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="minSkillLevel" className={styles.label}>Trình độ tối thiểu</label>
            <select
              id="minSkillLevel"
              className={styles.select}
              value={formData.minSkill}
              onChange={(e) => setFormData({ ...formData, minSkill: e.target.value })}
              required
            >
              <option value="">Chọn trình độ</option>
              <option value="Mới biết chơi">Mới biết chơi</option>
              <option value="Trung bình - Khá">Trung bình - Khá</option>
              <option value="Chuyên nghiệp">Chuyên nghiệp</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="maxSkillLevel" className={styles.label}>Trình độ tối đa</label>
            <select
              id="maxSkillLevel"
              className={styles.select}
              value={formData.maxSkill}
              onChange={(e) => setFormData({ ...formData, maxSkill: e.target.value })}
              required
            >
              <option value="">Chọn trình độ</option>
              <option value="Mới biết chơi">Mới biết chơi</option>
              <option value="Trung bình - Khá">Trung bình - Khá</option>
              <option value="Chuyên nghiệp">Chuyên nghiệp</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default KeoForm;