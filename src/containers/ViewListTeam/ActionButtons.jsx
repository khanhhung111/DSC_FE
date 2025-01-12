import styles from './ActionButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast
import { addMemberTeam } from "../../utils/tournament";

function ActionButtons({ matchData }) {
  const navigate = useNavigate();
  const data = matchData[0];
  const handleBracketNavigation = () => {
    if (data.tournamentType === "roundRobin") {
      navigate(`/RoundRobinBracketJoin/${data.tournamentId}`);
    } else if (data.tournamentType === "knockout") {
      navigate(`/ViewTournamentBracket/${data.tournamentId}`);
    } else {
      toast.error("Loại giải đấu không hợp lệ!");
    }
  };

  return (
    <div className={styles.actionButtons}>
      <button className={styles.button} onClick={() => navigate(`/ViewListTeam/${data.tournamentId}`)}>
        Danh Sách Đội
      </button>
      <button className={styles.buttonresult} onClick={handleBracketNavigation}>
        Sơ Đồ Thi Đấu
      </button>
    </div>
  );
}

export default ActionButtons;
