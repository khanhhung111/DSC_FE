import styles from './ActionButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast
import { addMemberTeam } from "../../utils/tournament";

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];

  return (
    <div className={styles.actionButtons}>
      <button className={styles.button}>
        Tham Gia
      </button>
      <button className={styles.buttonresult} onClick={() => navigate(`/ViewListTeam/${data.tournamentId}`)}>
        Danh Sách Đội
      </button>
      <button className={styles.buttonresult} onClick={() => navigate(`/ViewTournamentBracket/${data.tournamentId}`)}>
        Sơ Đồ Thi Đấu
      </button>
    </div>
  );
}

export default ActionButtons;
