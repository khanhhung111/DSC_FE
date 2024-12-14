import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./HeroSection.module.css";
function HeroSection() {

  const navigate = useNavigate();
  const location = useLocation();
  const getInitialActiveButton = () => {
    if (location.pathname === '/createclub') return 'create';
    if (location.pathname === '/club') return 'my';
    if (location.pathname === '/myclub' || location.pathname === '/myclubjoined') return 'myclub';
    
    return 'all';
  };
  const [activeButton, setActiveButton] = useState(getInitialActiveButton());

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  useEffect(() => {
    // Update the active button whenever the location changes
    setActiveButton(getInitialActiveButton());
  }, [location.pathname]);
  
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Câu lạc bộ</h1>
        <nav className={styles.heroNav}>
          <button 
            className={`${styles.navButton} ${activeButton === 'my' ? styles.active : ''}`} 
            onClick={() => {
              handleButtonClick('my');
              navigate('/club');
            }}
            
          >
            Tất cả câu lạc bộ
          </button>
          <button 
            className={`${styles.navButton} ${activeButton === '' ? styles.active : ''}`} 
            onClick={() => {
              handleButtonClick('myclub');
              navigate('/myclub'); 
            }}
          >
            Câu lạc bộ của tôi
          </button>
          <button 
            className={`${styles.navButton} ${activeButton === 'create' ? styles.active : ''}`} 
            onClick={() => {
              handleButtonClick('create');
              navigate('/createclub');
            }}
          >
            Tạo mới câu lạc bộ
          </button>
        </nav>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ebbe47a3c44ba239120b112945dcfc0e8a577fc10728058d07f7f352006bdbc?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
        alt=""
        className={styles.heroImage}
      />
    </header>
  );
}

export default HeroSection;
