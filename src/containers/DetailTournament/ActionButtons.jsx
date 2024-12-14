import styles from './ActionButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast
import { addMemberTeam } from "../../utils/tournament";

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];
  console.log(data)
  const [teamLogo, setTeamLogo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(
    Array(data?.memberOfTeams).fill({ name: '', number: '', nameError: '', numberError: '' })
  );
  const [teamNameError, setTeamNameError] = useState('');

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const validateTeamName = (value) => {
    if (!value.trim()) {
      setTeamNameError('Vui lòng nhập tên đội');
      return false;
    }
    setTeamNameError('');
    return true;
  };

  const handleTeamNameChange = (value) => {
    setTeamName(value);
    validateTeamName(value);
  };
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTeamLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validatePlayerField = (value, type, index) => {
    if (!value.trim()) {
      return `Vui lòng nhập ${type === 'name' ? 'tên cầu thủ' : 'số áo'}`;
    }
    if (type === 'number') {
      const numberValue = parseInt(value);
      if (isNaN(numberValue) || numberValue < 1 || numberValue > 99) {
        return 'Số áo phải từ 1 đến 99';
      }

      // Kiểm tra số áo trùng lặp
      const isDuplicate = players.some(
        (player, playerIndex) =>
          playerIndex !== index &&
          player.number.trim() !== '' &&
          parseInt(player.number) === numberValue
      );

      if (isDuplicate) {
        return 'Số áo đã tồn tại';
      }
    }
    return '';
  };

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...newPlayers[index],
      [field]: value,
      [`${field}Error`]: '',
    };
    setPlayers(newPlayers);
  };

  const handlePlayerBlur = (index, field) => {
    const newPlayers = [...players];
    const value = newPlayers[index][field];
    const error = validatePlayerField(value, field, index);

    newPlayers[index] = {
      ...newPlayers[index],
      [`${field}Error`]: error,
    };

    // Kiểm tra lại lỗi trùng số áo
    if (field === 'number') {
      newPlayers.forEach((player, playerIndex) => {
        if (playerIndex !== index && player.number) {
          const numberError = validatePlayerField(player.number, 'number', playerIndex);
          newPlayers[playerIndex] = {
            ...newPlayers[playerIndex],
            numberError,
          };
        }
      });
    }

    setPlayers(newPlayers);
  };

  const handleSubmit = async () => {
    const isTeamNameValid = validateTeamName(teamName);

    // Validate all players
    let isValid = true;
    const newPlayers = players.map((player, index) => {
      const nameError = validatePlayerField(player.name, 'name', index);
      const numberError = validatePlayerField(player.number, 'number', index);

      if (nameError || numberError) {
        isValid = false;
      }

      return {
        ...player,
        nameError,
        numberError,
      };
    });

    setPlayers(newPlayers);

    if (!isTeamNameValid || !isValid) {
      return;
    }
    const tournamentId = data.tournamentId;
    const userId = localStorage.getItem('userId');
    const teamData = {
      userId,
      tournamentId,
      teamName,
      players: players.map(({ name, number }) => ({ name, number })),
    };
    console.log("abc", teamData);
    try {
      const response = await addMemberTeam({
        teamData,
        file: teamLogo
      });
      if (response.data && response.data.success == true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/managementtournament');
        }, 1200);
      } else {
        toast.error(response.data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast.error(error.response?.data?.message || 'Không thể tạo giải đấu');
    }
    // setShowModal(false);
    // navigate(`/updatesportevent/${data?.activityId}`, { state: { teamData } });
  };
// console.log("NumberOfRegisteredTeams",data.numberOfRegisteredTeams)
  return (
    <div className={styles.actionButtons}>
      {data.numberOfRegisteredTeams >= data.numberOfTeams ? (
  <div className={styles.message}>
    Giải đấu đã tham gia đủ số lượng đội. Xin cảm ơn!
  </div>
) : (
  <button className={styles.button} onClick={handleButtonClick}>
    Tạo Đội
  </button>
)}



      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.formGroup}>
              <label>Tên đội</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => handleTeamNameChange(e.target.value)}
                placeholder="Nhập tên đội"
                className={`${styles.input} ${teamNameError ? styles.inputError : ''}`}
              />
              {teamNameError && <span className={styles.errorMessage}>{teamNameError}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Logo đội</label>
              <input
                type="file"
                onChange={handleLogoChange}
                className={styles.input}
              />
              {previewUrl && (
                <div className={styles.imagePreview}>
                  <img src={previewUrl} alt="Preview" className={styles.previewImage} />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Số thành viên</label>
              <input
                type="text"
                value={data?.memberOfTeams}
                disabled
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Trình độ yêu cầu</label>
              <input
                type="text"
                value={data?.levelName}
                disabled
                className={styles.input}
              />
            </div>

            <div className={styles.playersList}>
              <h3>Danh sách cầu thủ</h3>
              {players.map((player, index) => (
                <div key={index} className={styles.playerInputContainer}>
                  <div className={styles.playerInputGroup}>
                    <input
                      type="text"
                      placeholder="Tên cầu thủ"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      onBlur={() => handlePlayerBlur(index, 'name')}
                      className={`${styles.input} ${player.nameError ? styles.inputError : ''}`}
                    />
                    {player.nameError && (
                      <span className={styles.errorMessage}>{player.nameError}</span>
                    )}
                  </div>
                  <div className={styles.playerInputGroup}>
                    <input
                      type="number"
                      placeholder="Số áo"
                      value={player.number}
                      onChange={(e) => handlePlayerChange(index, 'number', e.target.value)}
                      onBlur={() => handlePlayerBlur(index, 'number')}
                      className={`${styles.input} ${player.numberError ? styles.inputError : ''}`}
                    />
                    {player.numberError && (
                      <span className={styles.errorMessage}>{player.numberError}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.modalButtons}>
              <button onClick={() => setShowModal(false)} className={styles.cancelButton}>
                Hủy
              </button>
              <button onClick={handleSubmit} className={styles.submitButton}>
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
