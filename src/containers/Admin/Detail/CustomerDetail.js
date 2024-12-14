import React, { useState } from "react";
import Descriptions from "../../../components/Descriptions";
import styles from "./CustomerDetail.module.css";

function CustomerDetail({ details, onSave, onClose }) {
  const [editableDetails, setEditableDetails] = useState({
    userId: details.userId || "",
    fullName: details.fullName || "",
    phone: details.phone || "",
    address: details.address || "",
    height: details.height || "",
    weight: details.weight || "",
    status: details.status || "",
    age: details.age || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails({ ...editableDetails, [name]: value });
  };

  return (
    <div className={styles.modalContainer}>
      {/* Header */}
      <div className={styles.modalHeader}>
        THÔNG TIN NGƯỜI DÙNG
      </div>

      {/* Nội dung */}
      <div className={styles.modalContent}>
        <Descriptions
          title="Họ Tên"
          content={
            <input
              type="text"
              name="fullName"
              value={editableDetails.fullName}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions title="Email" content={details.email} />
        <Descriptions
          title="Điện Thoại"
          content={
            <input
              type="text"
              name="phone"
              value={editableDetails.phone}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions
          title="Địa Chỉ"
          content={
            <input
              type="text"
              name="address"
              value={editableDetails.address}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions
          title="Chiều Cao"
          content={
            <input
              type="number"
              name="height"
              value={editableDetails.height}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions
          title="Cân Nặng"
          content={
            <input
              type="number"
              name="weight"
              value={editableDetails.weight}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions
          title="Tuổi"
          content={
            <input
              type="number"
              name="age"
              value={editableDetails.age}
              onChange={handleInputChange}
              className={styles.input}
            />
          }
        />
        <Descriptions
          title="Trạng Thái"
          content={
            <select
              name="status"
              value={editableDetails.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          }
        />
      </div>

      {/* Button Group */}
      <div className={styles.buttonGroup}>
        <button className={styles.buttonSecondary} onClick={onClose}>
          Đóng
        </button>
        <button className={styles.buttonPrimary} onClick={() => onSave(editableDetails)}>
          Cập Nhật
        </button>
      </div>
    </div>
  );
}

export default CustomerDetail;
