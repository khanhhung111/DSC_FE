import React from 'react';
import styles from './Testimonials.module.css';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

const testimonials = [
  {
    title: 'KÈO HÀNG NGÀY',
    description: 'Đã đến giờ hoạt động thể thao! Hãy tạo hoặc tham gia các hoạt động phù hợp với bạn. Các người chơi khác cũng đang chờ đợi bạn đấy. Lên kèo thôi nào!',
    linkText: 'Tìm hiểu thêm'
  },
  {
    title: 'GIẢI ĐẤU',
    description: 'Tham gia giải đấu để được giao lưu thi đấu một cách chuyên nghiệp, đặc biệt là những giải thưởng vô cùng hấp dẫn. Còn chờ gì nữa, nơi lý tưởng để thể hiện trình độ của bạn!',
    linkText: 'Tìm hiểu thêm'
  },
  {
    title: 'CÂU LẠC BỘ',
    description: 'Sẵn sàng để tập hợp mọi người lại với nhau. Tạo ra một cộng đồng thể thao để dễ kết nối, trao đổi kinh nghiệm, giao lưu với nhau. Tất cả các công cụ để quản lý người chơi đều có tại đây',
    linkText: 'Tìm hiểu thêm'
  }
];

function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Công cụ hàng đầu</h2>
        <p className={styles.subheading}>Dành cho tổ chức, đào tạo và chơi thể thao</p>
      </div>
      <div className={styles.cardGrid}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;