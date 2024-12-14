import React from 'react';
import styles from './Hero.module.css';
import bk2 from "../../assets/bk2.jpg";
import bk1 from "../../assets/bk1.jpg";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImages}>
        <img
          src={bk1} // Đường dẫn tới ảnh nền 1 của bạn
          alt="Background 1"
          className={`${styles.backgroundImage} ${styles.backgroundImage1}`}
        />
        <img
          src={bk2} // Đường dẫn tới ảnh nền 2 của bạn
          alt="Background 2"
          className={`${styles.backgroundImage} ${styles.backgroundImage2}`}
        />
      </div>

      <h1 className={styles.title}>
        NƠI GIAO LƯU CỘNG ĐỒNG <br /> THỂ THAO
      </h1>

      <div className={styles.imageGrid}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2609f5fea1b7d445a8c1e0b1c33c689ff673b3ae0a7d2abd45ce92cc426ad0f2?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 1"
          className={styles.image1}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8f9b2f2e79e8e27f98a50d70677a0f069ea61a5e21c4149ec959604e134f28b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 2"
          className={styles.image2}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0da64c566fb67edf0141e7ff21a15ef455cc763fa662801dc3191448ca94d71b?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 3"
          className={styles.image3}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a534ee9304d685402e0cbd744692d278f725106f4687c7ba557ad4b85eb218d?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 4"
          className={styles.image4}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/99f0e70db4537c5c5258e3b64d66222b66423f2c8ddfc804b17b5a020fda534a?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 5"
          className={styles.image5}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c6be290b342a91b83eb3b34969a211fcb007ecec7eff8fe2321055d00bacb41?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Sports activity 6"
          className={styles.image6}
        />
      </div>
    </section>
  );
}

export default Hero;
