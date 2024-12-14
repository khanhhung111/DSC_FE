import './ViewTournamentBracket.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getTeamTournament, getTournamentResults } from '../../utils/tournament';
import Header from "../../components/Header/Hearder";
import { DatePicker, TimePicker, Modal, Button, Input } from 'antd';
import Footer from "../../components/Footer/Footer";
import moment from 'moment';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Để tính kích thước màn hình động
const TournamentBracket = () => {
  const { width, height } = useWindowSize(); // Kích thước cửa sổ
  const { tournamentId } = useParams();
  const [numberOfTeams, setNumberOfTeams] = useState(8);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState({});
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tournamentInfo, setTournamentInfo] = useState(null);
  const hasFetched = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const initializeTournament = (teamList) => {
    const rounds = Math.ceil(Math.log2(teamList.length));
    let matchStructure = {};

    for (let i = rounds; i > 0; i--) {
      const roundName = `round${i}`;
      const matchCount = Math.pow(2, i - 1);
      const matches = [];

      for (let j = 0; j < matchCount; j++) {
        if (i === rounds) {
          const team1 = teamList[j * 2];
          const team2 = teamList[j * 2 + 1];
          matches.push({
            team1: team1?.teamName || 'TBD',
            team2: team2?.teamName || 'TBD',
            team1Id: team1?.teamId || null,
            team2Id: team2?.teamId || null,
            score1: '-',
            score2: '-',
            time: '',
            location: ''
          });
        } else {
          matches.push({
            team1: 'TBD',
            team2: 'TBD',
            team1Id: null,
            team2Id: null,
            score1: '-',
            score2: '-',
            time: '',
            location: ''
          });
        }
      }
      matchStructure[roundName] = matches;
    }
    return matchStructure;
  };

  const MatchDetailsModal = ({ match, open, onClose, onSave, editMode }) => {
    const [date, setDate] = useState(
      match.Time
        ? moment(match.Time)
        : null
    );

    const [time, setTime] = useState(
      match.Time
        ? moment(match.Time).format('HH:mm')
        : null
    );

    const [location, setLocation] = useState(match.location);

    const handleSave = () => {
      // Kết hợp ngày và giờ
      const combinedDateTime = date
        ? moment(date.format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD HH:mm')
        : null;

      onSave({
        Time: combinedDateTime
          ? combinedDateTime.format('YYYY-MM-DDTHH:mm:ss')
          : null,
        location
      });
      onClose();
    };

    return (
      <Modal
        title="Thời gian và địa điểm thi đấu"
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            Hủy
          </Button>,
          editMode && (
            <Button key="save" type="primary" onClick={handleSave}>
              Lưu
            </Button>
          ),
        ]}
        className="match-details-modal"
      >
          <div className="match-details-readonly">
            <p><strong>Thời Gian:</strong> {match.Time ? moment(match.Time).format('YYYY-MM-DD HH:mm') : 'Chưa Có'}</p>
            <p><strong>Địa Điểm:</strong> {match.location || 'Chưa Có'}</p>
          </div>
      </Modal>
    );
  };
  const updateMatchesWithResults = (results, currentMatches) => {
    const newMatches = { ...currentMatches };
    const sortedResults = [...results].sort((a, b) => b.roundNumber - a.roundNumber);

    sortedResults.forEach(result => {
      const { roundNumber, matchNumber, team1Id, team2Id, score1, score2, time, location } = result;
      const roundKey = `round${roundNumber}`;

      if (newMatches[roundKey]?.[matchNumber - 1]) {
        const match = newMatches[roundKey][matchNumber - 1];
        const team1Name = teams.find(team => team.teamId === team1Id)?.teamName || match.team1;
        const team2Name = teams.find(team => team.teamId === team2Id)?.teamName || match.team2;

        newMatches[roundKey][matchNumber - 1] = {
          ...match,
          team1: team1Name,
          team2: team2Name,
          team1Id,
          team2Id,
          score1: score1?.toString() || '-',
          score2: score2?.toString() || '-',
          Time: time || '',
          location: location || ''
        };

        if (score1 !== null && score2 !== null) {
          const winningTeam = parseInt(score1) > parseInt(score2)
            ? { name: team1Name, id: team1Id }
            : { name: team2Name, id: team2Id };

          if (roundNumber > 1) {
            const nextRound = `round${roundNumber - 1}`;
            const nextMatchIndex = Math.floor((matchNumber - 1) / 2);
            const isFirstTeam = (matchNumber - 1) % 2 === 0;

            if (!newMatches[nextRound]) {
              newMatches[nextRound] = [];
            }

            if (!newMatches[nextRound][nextMatchIndex]) {
              newMatches[nextRound][nextMatchIndex] = {
                team1: 'TBD',
                team2: 'TBD',
                team1Id: null,
                team2Id: null,
                score1: '-',
                score2: '-'
              };
            }

            if (isFirstTeam) {
              newMatches[nextRound][nextMatchIndex].team1 = winningTeam.name;
              newMatches[nextRound][nextMatchIndex].team1Id = winningTeam.id;
            } else {
              newMatches[nextRound][nextMatchIndex].team2 = winningTeam.name;
              newMatches[nextRound][nextMatchIndex].team2Id = winningTeam.id;
            }
          }
        }
      }
    });

    // Xác định người chiến thắng chung cuộc
    const finalRound = newMatches?.round1?.[0]; // Kiểm tra newMatches và round1 có tồn tại
    if (finalRound && finalRound.score1 !== '-' && finalRound.score2 !== '-') {
      const tournamentWinner = parseInt(finalRound.score1) > parseInt(finalRound.score2)
        ? finalRound.team1
        : finalRound.team2;
      setWinner(tournamentWinner);
    }
    

    setMatches(newMatches);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!tournamentId || hasFetched.current) return;

      try {
        setLoading(true);
        setError('');

        const teamsResponse = await getTeamTournament(tournamentId);
        if (!teamsResponse.data.$values[0]) {
          throw new Error('Failed to fetch teams');
        }

        const data = teamsResponse.data.$values[0];
        const fetchedTeams = data.teamNames.$values.map((team, index) => ({
          teamName: team,
          teamId: data.teamId.$values[index]
        }));

        setTournamentInfo(data);
        setNumberOfTeams(data.numberOfTeams);
        setTeams(fetchedTeams);

        const initialMatches = initializeTournament(fetchedTeams);
        setMatches(initialMatches);

        const resultsResponse = await getTournamentResults(tournamentId);
        if (resultsResponse?.data?.data?.$values) {
          updateMatchesWithResults(resultsResponse.data.data.$values, initialMatches);
        }

        hasFetched.current = true;
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tournamentId]);

  return (
    <div>
      <Header/>
    <div className="tournament-container">
      <div className="tournament-controls">
        <h2>Bảng Giải Đấu</h2>
        {error && <div className="error-message">{error}</div>}
        {winner && (
          <div className="winner-announcement">
            <h3 style={{fontSize:'30px'}}>Tournament Winner</h3>
            <div className="winner-name">{winner}</div>
          </div>
        )}
      </div>

      {winner && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500} // Số lượng mảnh tung hoa
          // recycle={false} // Ngừng hiệu ứng sau khi kết thúc
        />
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <div className="tournament-bracket">
          {Object.entries(matches).map(([roundName, roundMatches], roundIndex) => (
            <div key={roundName} className={`round ${roundName}`}>
              <h3>Round {Math.log2(numberOfTeams) - roundIndex}</h3>
              {roundMatches.map((match, matchIndex) => (
                <div key={matchIndex} className="match-container234">
                  <div className="match-details">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        color: 'white',
                        marginBottom: '10px',
                      }}
                      onClick={() => {
                        setSelectedMatch({ round: roundName, index: matchIndex });
                        setShowModal(true);
                      }}
                    >
                      {'Chi tiết'}
                    </Button>
                  </div>
                  <div className="match">
                    <div className={`team ${parseInt(match.score1) > parseInt(match.score2) ? 'winner' : ''}`}>
                      <span>{match.team1}</span>
                      <span className="score">{match.score1}</span>
                    </div>
                    <div className={`team ${parseInt(match.score2) > parseInt(match.score1) ? 'winner' : ''}`}>
                      <span>{match.team2}</span>
                      <span className="score">{match.score2}</span>
                    </div>
                  </div>
                </div>
              ))}
              {showModal && selectedMatch && (
                <MatchDetailsModal
                  match={selectedMatch ? matches[selectedMatch.round][selectedMatch.index] : {}}
                  open={showModal}
                  onClose={() => setShowModal(false)}
                  onSave={(details) => {
                    const newMatches = { ...matches };
                    newMatches[selectedMatch.round][selectedMatch.index] = {
                      ...newMatches[selectedMatch.round][selectedMatch.index],
                      ...details,
                    };
                    setMatches(newMatches);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default TournamentBracket;