import React from 'react';
import styles from './EventForm.module.css';

function EventForm() {
  return (
    <form className={styles.eventForm}>
      <div className={styles.formGroup}>
        <label htmlFor="eventDate" className={styles.label}>📅 Chọn ngày và giờ</label>
        <input type="datetime-local" id="eventDate" className={styles.input} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="eventDuration" className={styles.label}>⏱️ Thời gian</label>
        <input type="text" id="eventDuration" className={styles.input} defaultValue="1 tiếng" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="eventLocation" className={styles.label}>⛳️ Chọn địa điểm</label>
        <input type="text" id="eventLocation" className={styles.input} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="playerCount" className={styles.label}>👤 Số người chơi</label>
        <input type="number" id="playerCount" className={styles.input} min="1" required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>💲 Chi phí</label>
        <div className={styles.costOptions}>
          <button type="button" className={styles.costButton}>🆓</button>
          <div className={styles.costInputGroup}>
            <input type="number" className={styles.costInput} min="0" />
            <span className={styles.costUnit}>/Người</span>
          </div>
          <div className={styles.costInputGroup}>
            <input type="number" className={styles.costInput} min="0" />
            <span className={styles.costUnit}>/Đội</span>
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="minSkillLevel" className={styles.label}>Trình đội tối thiểu</label>
        <select id="minSkillLevel" className={styles.select} required>
          <option value="">Chọn trình độ</option>
          {/* Add options here */}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="eventName" className={styles.label}>Tên kèo</label>
        <input type="text" id="eventName" className={styles.input} placeholder="Vd: Giao hữu với tôi" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="eventDescription" className={styles.label}>Mô tả</label>
        <textarea id="eventDescription" className={styles.textarea} rows="4" required></textarea>
      </div>
      <div className={styles.formGroup}>
        <fieldset className={styles.radioGroup}>
          <legend className={styles.label}>Duyệt tự động</legend>
          <label className={styles.radioLabel}>
            <input type="radio" name="autoApprove" value="yes" className={styles.radioInput} />
            Có
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="autoApprove" value="no" className={styles.radioInput} />
            Không
          </label>
        </fieldset>
      </div>
    </form>
  );
}

export default EventForm;