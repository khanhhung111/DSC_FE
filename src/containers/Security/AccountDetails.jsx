import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AccountDetails.module.css';
import { getInfo, changePassword } from "../../utils/profile";

const AccountField = ({
  label, value, onEdit, isEditing, onSave, onChange, editable = true, children
}) => (
  <div className={`${styles.accountField} ${isEditing ? styles.editing : ''}`}>
    <div className={styles.fieldContent}>
      <h3 className={styles.fieldLabel}>{label}</h3>
      {isEditing && editable ? (
        children // Render custom children if editing
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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleEdit = (field) => {
    setEditingField(field);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSave = async (field) => {
    if (field === 'password') {
      // Kiểm tra nếu mật khẩu hiện tại bị bỏ trống
      if (!currentPassword) {
        toast.error('Mật khẩu hiện tại không được để trống');
        return;
      }
      if (currentPassword.length < 8) {
        toast.error('Mật khẩu mới phải có ít nhất 8 ký tự');
        return;
      }
      // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu không khớp
      if (newPassword !== confirmPassword) {
        toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
        return;
      }
      if (newPassword.length < 8) {
        toast.error('Mật khẩu mới phải có ít nhất 8 ký tự');
        return;
      }
      try {
        const Email =  email;
        const Password =  currentPassword;
        const NewPassword =  newPassword;
        console.log(Email, Password, NewPassword)
        // Cấu trúc dữ liệu gửi lên API với đúng key: Email, Password, NewPassword
        // Gọi API để đổi mật khẩu
        const response = await changePassword({Email, Password, NewPassword});
  
        if (response.data && response.data.success == true ) {
          // Nếu thành công, cập nhật lại trạng thái và thông báo cho người dùng
          setUserInfo(prevInfo => ({ ...prevInfo, password: '*********' })); // Update password display
          setEditingField(null);
          toast.success('Cập nhật mật khẩu thành công');
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error updating password:', error);
        toast.error('Không thể cập nhật mật khẩu');
      }
    }
  };

  const fields = userInfo ? [
    { key: 'email', label: 'Email', value: userInfo.email || email, editable: false },
    { key: 'password', label: 'Mật Khẩu', value: '*********', editable: true },
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
            value={field.value}
            onEdit={() => handleEdit(field.key)}
            isEditing={editingField === field.key}
            onSave={() => handleSave(field.key)}
            editable={field.editable}
          >
            {field.key === 'password' && editingField === 'password' && (
              <div className={styles.passwordFields}>
                <input
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.editInput}
                />
              </div>
            )}
          </AccountField>
        ))}
      </div>
    </section>
  );
};

export default AccountDetails;