import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { updateInfoImg } from "../../utils/profile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ fullname }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userfullName, setfullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const fullname = localStorage.getItem('fullName');
      const email = localStorage.getItem('userEmail');
      const avatar = localStorage.getItem('avatar');
      
      setIsLoggedIn(loginStatus);
      if (email) setUserEmail(email);
      if (fullname) setfullName(fullname);
      
      // Lấy avatarUrl từ localStorage hoặc đặt ảnh mặc định
      const storedAvatar = avatar && avatar !== 'null' ? avatar : null;
      setAvatarUrl(storedAvatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/6bc8d1ef7ef6beb9a8f62d9a9760725d3ae3ce0003da0601a02b4778efb767c8?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac");
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullName');
    localStorage.removeItem('avatar');
    setIsLoggedIn(false);
    setUserEmail('');
    setfullName('');
    setAvatarUrl("https://cdn.builder.io/api/v1/image/assets/TEMP/6bc8d1ef7ef6beb9a8f62d9a9760725d3ae3ce0003da0601a02b4778efb767c8?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"); // Avatar mặc định
    navigate('/login');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedFile) return;

    try {
      const response = await updateInfoImg({
        email: userEmail,
        updatedInfo: {},
        file: selectedFile
      });

      if (response.data) {
        const newAvatarUrl = response.data.avatar;
        setAvatarUrl(newAvatarUrl);
        localStorage.setItem('avatar', newAvatarUrl); // Lưu avatar vào localStorage
        setPreviewUrl(null);
        setSelectedFile(null);
        toast.success('Cập nhật ảnh đại diện thành công!');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Không thể cập nhật ảnh đại diện');
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.avatarContainer}>
        <img 
          loading="lazy" 
          src={previewUrl || avatarUrl} 
          alt="User Avatar" 
          className={styles.avatar} 
        />
        <label htmlFor="avatar-upload" className={styles.uploadLabel}>
          <span>Thay đổi ảnh</span>
          <input 
            id="avatar-upload"
            type="file" 
            onChange={handleAvatarChange} 
            className={styles.uploadInput}
            accept="image/*"
          />
        </label>
      </div>
      
      {selectedFile && (
        <button onClick={handleSaveAvatar} className={styles.saveButton}>
          Lưu thay đổi
        </button>
      )}

      <div className={styles.userInfo}>
        <hr className={styles.divider} />
        <p className={styles.userName}>{fullname}</p>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>Đăng xuất</button>
    </aside>
  );
};

export default Sidebar;
