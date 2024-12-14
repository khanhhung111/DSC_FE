import React from 'react';
import styles from './Footer.module.css';

const footerSections = [
  {
    title: 'Kèo hàng ngày',
    items: ['Tìm kiếm kèo', 'Tham gia kèo', 'Tạo kèo', 'Kết quả', 'Tất cả các kèo']
  },
  {
    title: 'Giải đấu',
    items: ['Tìm kiếm giải đấu', 'Tất cả giải đấu', 'Tham gia giải đấu', 'Theo dõi giải đấu', 'Tạo giải đấu', 'Kết quả']
  },
  {
    title: 'Câu lạc bộ',
    items: ['Tìm kiếm câu lạc bộ', 'Tất cả câu lạc bộ', 'Tham gia câu lạc bộ', 'Tạo câu lạc bộ', 'Tất cả môn thể thao', 'Hỗ trợ']
  }
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {footerSections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.sectionList}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a href="#" className={styles.sectionLink}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.socialLinks}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd81e9766c6e96f6132ba0936844ae206bb424ed01a7adcd552bf92b7e3d71a6?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="Facebook" className={styles.socialIcon} />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a771cdf3e03289cf3cd3681e32927345a88daa733eb040aff5b8b6eead8ce8fe?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="Twitter" className={styles.socialIcon} />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8ed122856ad1795c355b9c8f16f2b723e38a7746351f506ce6232172046fa97?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac" alt="Instagram" className={styles.socialIcon} />
      </div>
    </footer>
  );
}

export default Footer;