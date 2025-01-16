import React, { useState, useEffect } from 'react';
import styles from './DetailsResult.module.css';
import { GetResultsClub, GetCommentsClub, AddCommentClub } from '../../utils/activity'; // Thêm DeleteComment vào utils
import { toast } from 'react-toastify';

function DetailsResult({ matchData }) {
  const data = matchData[0];
  const activityclubId = data.activityClubId;
  const userId = localStorage.getItem('userId');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch kết quả và bình luận
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultResponse = await GetResultsClub(activityclubId);
        setResult(resultResponse.data);
        if (resultResponse.data) {
          setTeam1Score(resultResponse.data.team1Score);
          setTeam2Score(resultResponse.data.team2Score);
        }

        const commentsResponse = await GetCommentsClub(activityclubId);
        setComments(commentsResponse.data.$values || []);
      } catch (error) {
        console.error('Lỗi khi lấy kết quả hoặc bình luận:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityclubId]);

  const sensitiveWords = [
    "bạo lực", "chửi thề", "mẹ", "con cặc", "đánh","cc","cl","lồn","loz","đcm","đm","đmm","đé","cẹ"// thêm các từ ngữ phản cảm vào đây
    // Bạn có thể mở rộng danh sách các từ ngữ nhạy cảm này
  ];
  
  const containsSensitiveWords = (comment) => {
    // Kiểm tra nếu bình luận có chứa từ ngữ nhạy cảm
    return sensitiveWords.some(word => comment.toLowerCase().includes(word));
  };
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    if (newComment.trim()) {
      // Kiểm tra từ ngữ nhạy cảm trong bình luận
      if (containsSensitiveWords(newComment)) {
        toast.error('Bình luận của bạn chứa ngôn từ phản cảm, vui lòng sửa lại!');
        return;
      }
  
      try {
        const commentData = {
          activityclubId,
          userId: userId,
          Comment: newComment,
        };
  
        const response = await AddCommentClub(commentData);
        if (response.status === 200) {
          const newComment = {
            commentID: response.data.commentID,
            fullName: response.data.fullName,
            commentText: response.data.commentText,
          };
  
          setComments([...comments, newComment]);
          setNewComment('');
          toast.success('Bình luận của bạn đã được gửi!');
        }
      } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error);
        toast.error('Gửi bình luận thất bại!');
      }
    }
  };
  

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section className={styles.matchResult}>
      <h2 className={styles.resultTitle}>Kết quả kèo thể thao</h2>
      <div className={styles.scoreBoard}>
        <div className={styles.team}>
          <img src="/team1.png" alt="Đội 1" className={styles.teamAvatar} />
          <h3>ĐỘI 1</h3>
          <span className={styles.score}>{result?.team1Score ?? '-'}</span>
        </div>
        <div className={styles.matchInfo}>
          <p>Tỉ số</p>
        </div>
        <div className={styles.team}>
          <img src="/team2.png" alt="Đội 2" className={styles.teamAvatar} />
          <h3>ĐỘI 2</h3>
          <span className={styles.score}>{result?.team2Score ?? '-'}</span>
         
        </div>
      </div>

      {/* Bình luận */}
      <div className={styles.commentSection}>
        <h3>Bình luận</h3>
        <div className={styles.comments}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.commentID} className={styles.comment}>
  <strong>{comment.fullName}: </strong>
  <span>{comment.commentText}</span>
</div>

            ))
          ) : (
            <div className={styles.noComments}>Hãy là người comment đầu tiên</div>
          )}
        </div>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm bình luận..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentButton}>
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
}

export default DetailsResult;
