import React, { useEffect, useState } from 'react';
import styles from './AddSport.module.css';
import { getSportName, getLevel,AddSportName } from '../../utils/profile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddSport() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState(null);
  const [sports, setSports] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const fetchSportsAndLevels = async () => {
      try {
        const sportsResponse = await getSportName();
        const levelsResponse = await getLevel();
        
        setSports(sportsResponse.data.listSport.$values);
        setSkillLevels(levelsResponse.data.listLevel.$values);  // Đảm bảo `levelsResponse.data` có chứa danh sách `id` và `name`
      } catch (error) {
        console.error('Error fetching sports or levels:', error);
        toast.error('Không thể tải dữ liệu môn thể thao hoặc cấp độ.');
      }
    };

    fetchSportsAndLevels();
  }, []);

  const handleSave = async () => {
    if (!selectedSport || !selectedSkill) {
      toast.error('Vui lòng chọn môn thể thao và mức độ kỹ năng');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // Retrieve UserId from localStorage
    if (!userId) {
      toast.error('Không tìm thấy UserId trong localStorage');
      return;
    }
    const SportId = selectedSport;
    const LevelId = selectedSkill
    try {
      const response = await AddSportName({ userId,SportId, LevelId});
      if (response.data) {
        toast.success('Cập nhật thông tin thành công');
        
        // Chờ 1200ms (1.2 giây) trước khi chuyển trang
        setTimeout(() => {
          navigate('/sportprofile');
        }, 1200);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Không thể cập nhật thông tin');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Chọn môn thể thao</h3>

      <div className={styles.section}>
        <label>Thể thao của bạn:</label>
        <div className={styles.sportSelection}>
          {sports.map((sport) => (
            <div
              key={sport.sportId}
              className={`${styles.sportItem} ${selectedSport === sport.sportId ? styles.selected : ''}`}
              onClick={() => setSelectedSport(sport.sportId)}
            >
              {sport.sportName}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
  <label>Kỹ năng của bạn ở mức nào?</label>
  <div className={styles.skillSelection}>
    {skillLevels.map((level) => (
      <div
        key={level.levelId}
        className={`${styles.skillItem} ${selectedSkill === level.levelId ? styles.selected : ''}`}
        onClick={() => setSelectedSkill(level.levelId)} // Ensures only one skill is selected
      >
        {level.levelName}
      </div>
    ))}
  </div>
</div>
      <button className={styles.saveButton} onClick={handleSave}>
        Lưu
      </button>
    </div>
  );
}

export default AddSport;
