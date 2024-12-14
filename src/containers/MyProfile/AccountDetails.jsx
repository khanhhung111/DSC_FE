import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AccountDetails.module.css';
import { getInfo, updateInfo } from "../../utils/profile";

const AccountField = ({ label, value, onEdit, isEditing, onSave, onChange, editable = true }) => (
  <div className={`${styles.accountField} ${isEditing ? styles.editing : ''}`}>
    <div className={styles.fieldContent}>
      <h3 className={styles.fieldLabel}>{label}</h3>
      {isEditing && editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.editInput}
        />
      ) : (
        <p className={styles.fieldValue}>{value}</p>
      )}
    </div>
    {editable && (
      isEditing ? (
        <button onClick={onSave} className={styles.saveButton}>Lưu</button>
      ) : (
        <button onClick={onEdit} className={styles.editButton}>Chỉnh sửa</button>
      )
    )}
  </div>
);

const AccountDetails = ({ email }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getInfo({ email });
        if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = async (field) => {
    try {
      const updatedInfo = { [field]: editValue };
      const response = await updateInfo({ email, updatedInfo });
      if (response.data) {
        setUserInfo(prevInfo => ({ ...prevInfo, [field]: response.data[field] }));
        setEditingField(null);
        toast.success('Cập nhật thông tin thành công');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Không thể cập nhật thông tin');
    }
  };

  const fields = userInfo ? [
    { key: 'fullName', label: 'Họ và tên', value: userInfo.fullName || 'Chưa cập nhật', editable: true },
    { key: 'email', label: 'Email', value: userInfo.email || email, editable: false },
    { key: 'address', label: 'Địa Chỉ', value: userInfo.address || 'Chưa cập nhật', editable: true },
    { key: 'age', label: 'Tuổi', value: userInfo.age || 'Chưa cập nhật', editable: true },
    { key: 'height', label: 'Chiều Cao', value: userInfo.height || 'Chưa cập nhật', editable: true },
    { key: 'weight', label: 'Cân Nặng', value: userInfo.weight || 'Chưa cập nhật', editable: true },
  ] : [];

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section className={styles.accountDetails}>
      <h2 className={styles.sectionTitle}>Tài khoản</h2>
      <div className={styles.fieldsContainer}>
        {fields.map((field) => (
          <AccountField
            key={field.key}
            label={field.label}
            value={editingField === field.key ? editValue : field.value}
            onEdit={() => handleEdit(field.key, field.value)}
            isEditing={editingField === field.key}
            onSave={() => handleSave(field.key)}
            onChange={setEditValue}
            editable={field.editable}
          />
        ))}
      </div>
    </section>
  );
};

export default AccountDetails;