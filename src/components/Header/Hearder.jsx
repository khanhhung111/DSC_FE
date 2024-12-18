import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import NavigationPill from '../NavigationPill/NavigationPill';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { text: 'Kèo thể thao', path: '/sportbetting' },
  { text: 'Giải đấu', path: '/createTournament' },
  { text: 'Câu lạc bộ', path: '/club' },
  { text: 'Thông báo', path: '#' },
];

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const fullname = localStorage.getItem('fullName');
      const email = localStorage.getItem('userEmail');
      const avatars = localStorage.getItem('avatar');

      setIsLoggedIn(loginStatus);
      setUserEmail(email || '');
      setUserFullName(fullname || '');
      if (avatars && avatars !== 'null' && avatars !== '') {
        setAvatar(avatars);
      } else {
        setAvatar(null);
      }
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
    setUserFullName('');
    setAvatar(null);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {navItems.map((item, index) => (
          <NavigationPill 
            key={index} 
            text={item.text} 
            onClick={() => handleNavigation(item.path)} 
          />
        ))}
      </nav>
      <div className={styles.logo}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bd87701f8e5de31409290c62870400ced251ecd3f5895c6c336318f1e3231eb?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" 
          alt="DSC Logo" 
          className={styles.logoImage} 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <span className={styles.logoText}>DSC</span>
      </div>

      {isLoggedIn ? (
        <div className={styles.userContainer}>
          <img
            src={avatar || "https://cdn.builder.io/api/v1/image/assets/TEMP/6bc8d1ef7ef6beb9a8f62d9a9760725d3ae3ce0003da0601a02b4778efb767c8?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"} 
            alt="1Avatar1"
            className={styles.logoIcon}
            onClick={() => navigate('/account')}
            style={{ cursor: 'pointer' }}
          />
          <span className={styles.userName}>{userFullName}</span>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Button onClick={() => navigate('/signup')}>Đăng ký</Button>
          <Button onClick={() => navigate('/login')} variant="secondary">Đăng nhập</Button>
        </div>
      )}
    </header>
  );
}

export default Header;