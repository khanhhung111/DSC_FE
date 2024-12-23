import React, { useState, useEffect } from 'react';
import styles from './DetailsResult.module.css';
import { GetResults, UpdateScore, GetComments, AddComment, DeleteComment } from '../../utils/activity'; // Thêm DeleteComment vào utils
import { toast } from 'react-toastify';

function DetailsResult({ matchData }) {
  const data = matchData[0];
  const activityId = data.activityId;
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
        const resultResponse = await GetResults(activityId);
        setResult(resultResponse.data);
        if (resultResponse.data) {
          setTeam1Score(resultResponse.data.team1Score);
          setTeam2Score(resultResponse.data.team2Score);
        }

        const commentsResponse = await GetComments(activityId);
        setComments(commentsResponse.data.$values || []);
      } catch (error) {
        console.error('Lỗi khi lấy kết quả hoặc bình luận:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      try {
        const commentData = {
          activityId,
          userId: userId,
          Comment1: newComment,
        };

        const response = await AddComment(commentData);
        if (response.status === 200) {
          const newComment = {
            commentID: response.data.$values.commentID,
            fullName: response.data.$values.fullName,
            commentText: response.data.$values.commentText,
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

  // Xử lý xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await DeleteComment(commentId); // Gọi API xóa bình luận
      if (response.status === 200) {
        setComments(comments.filter(comment => comment.commentID !== commentId)); // Xóa bình luận khỏi danh sách
        toast.success('Bình luận đã được xóa!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
      toast.error('Xóa bình luận thất bại!');
    }
  };

  const handleUpdateScore = async () => {
    try {
      const payload = {
        resultId: result.resultId || 0,
        activityId,
        team1Score: parseInt(team1Score) || 0,
        team2Score: parseInt(team2Score) || 0,
      };

      const response = await UpdateScore(payload);
      setResult(response.data.data);
      toast.success(response.data.Message || 'Cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật tỉ số:', error);
      alert('Cập nhật thất bại!');
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
          <input
            type="number"
            value={team1Score}
            onChange={(e) => setTeam1Score(e.target.value)}
            className={styles.scoreInput}
          />
        </div>
        <div className={styles.matchInfo}>
          <p>Tỉ số</p>
          <button onClick={handleUpdateScore} className={styles.updateButton}>
            {result?.resultId ? 'Cập nhật' : 'Tạo mới'}
          </button>
        </div>
        <div className={styles.team}>
          <img src="/team2.png" alt="Đội 2" className={styles.teamAvatar} />
          <h3>ĐỘI 2</h3>
          <span className={styles.score}>{result?.team2Score ?? '-'}</span>
          <input
            type="number"
            value={team2Score}
            onChange={(e) => setTeam2Score(e.target.value)}
            className={styles.scoreInput}
          />
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
  <button onClick={() => handleDeleteComment(comment.commentID)} className={styles.deleteButton}>
    Xóa
  </button>
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
