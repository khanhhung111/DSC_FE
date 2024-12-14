import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./HeroSection.module.css";
function HeroSection() {

  const navigate = useNavigate();
  const location = useLocation();
  
  
  return (
        <div className={styles.bannerContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73697ede93124dea36ec63cd0d105c568819e769f86fa52d92e3a5690a5d212c?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
            alt=""
            className={styles.bannerImage}
          />
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>Giải Đấu</h2>
            <p className={styles.bannerSubtitle}>Subtitle</p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton} onClick={() => navigate('/createTournament')}>Tạo Giải Đấu</button>
              <button className={styles.secondaryButton} onClick={() => navigate('/managementtournament')}>Tham Gia Giải đấu</button>
              <button className={styles.primaryButton} onClick={() => navigate('/mytournament')}>Quản Lí Giải đấu</button>
            </div>
          </div>
        </div>
  );
}

export default HeroSection;
