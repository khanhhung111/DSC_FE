import React, { useState } from 'react';
import styles from './DetailsResult.module.css';

function DetailsResult() {
  const [comments, setComments] = useState([
    { id: 1, user: 'Hưng', text: 'Đội 1 chơi hay, cầu thủ giỏi, 1 trận đấu kịch tính và mọi người đều vui vẻ với nhau' },
    { id: 2, user: 'Tùng', text: 'Đội 2 chơi rất mẫu lửa nhưng cũng thân thiện vui vẻ, đội tôi thua cũng nhờ may mắn thôi' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, user: 'User', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <section className={styles.matchResult}>
      <h2 className={styles.resultTitle}>Kết quả kèo thể thao</h2>
      <div className={styles.scoreBoard}>
        <div className={styles.team}>
          <img src="/team1.png" alt="Đội 1" className={styles.teamAvatar} />
          <h3>ĐỘI 1</h3>
          <span className={styles.score}>3</span>
        </div>
        <div className={styles.matchInfo}>
          <p>Tỉ số</p>
          <p>Thông số</p>
        </div>
        <div className={styles.team}>
          <img src="/team2.png" alt="Đội 2" className={styles.teamAvatar} />
          <h3>ĐỘI 2</h3>
          <span className={styles.score}>2</span>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.teamStats}>Thông số đội 1</div>
        <div className={styles.teamStats}>Thông số đội 2</div>
      </div>
      <div className={styles.commentSection}>
        <h3>Bình luận</h3>
        <div className={styles.comments}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <strong>{comment.user}: </strong>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm bình luận..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentButton}>Gửi</button>
        </form>
      </div>
    </section>
  );
}

export default DetailsResult;