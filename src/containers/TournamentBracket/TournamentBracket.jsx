import React, { useState, useEffect, useRef } from 'react';
import './TournamentBracket.css';
import { DatePicker, TimePicker, Modal, Button, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { getTeamTournament, saveTournamentResults, getTournamentResults, saveTournamentResultsTemp } from '../../utils/tournament';
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const TournamentBracket = () => {
  const { tournamentId } = useParams();
  const [numberOfTeams, setNumberOfTeams] = useState(8);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState({});
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tournamentInfo, setTournamentInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return; // Ngừng gọi nếu đã gọi API trước đó
      console.log("=== Starting fetchData ===");
      if (!tournamentId) {
        console.log("No tournamentId found");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching tournament data for ID:", tournamentId);

        // Fetch teams
        const teamsResponse = await getTeamTournament(tournamentId);
        console.log("Teams Response:", teamsResponse);

        if (!teamsResponse.data.$values[0]) {
          throw new Error('Failed to fetch teams');
        }

        const data = teamsResponse.data.$values[0];
        const teamIds = data.teamId.$values;
        const teamNames = data.teamNames.$values;
        console.log("teamNames:", teamNames);

        // Tạo danh sách các đội bằng cách kết hợp teamId và teamName
        const fetchedTeams = teamIds.map((teamId, index) => ({
          teamId,
          teamName: teamNames[index]
        }));

        console.log("Processed Teams:", fetchedTeams);

        setTournamentInfo(data);
        setNumberOfTeams(data.numberOfTeams);
        setTeams(fetchedTeams);

        // Initialize tournament structure
        const initialMatches = initializeTournament(fetchedTeams);
        console.log("Initial Matches Structure:", initialMatches);
        setMatches(initialMatches);

        // Fetch results
        const resultsResponse = await getTournamentResults(tournamentId);
        console.log("Tournament Results Response:", resultsResponse);

        if (resultsResponse && resultsResponse.data.data.$values) {
          console.log("Updating matches with results");
          updateMatchesWithResults(resultsResponse.data.data.$values, initialMatches);
        }

      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("=== fetchData completed ===");
        hasFetched.current = true; // Đánh dấu là đã gọi API thành công
      }
    };

    fetchData();
  }, [tournamentId]);
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
        {editMode ? (
          <>
            <div className="match-details-field">
              <label>Ngày</label>
              <DatePicker
                value={date}
                onChange={(value) => {
                  console.log('Chọn Ngày:', value);
                  setDate(value);
                }}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                placeholder="Chọn Ngày"
              />
            </div>
            <div className="match-details-field">
              <label>Giờ</label>
              <TimePicker
                value={time ? moment(time, 'HH:mm') : null}
                onChange={(value) => {
                  console.log('Chọn Giờ:', value);
                  setTime(value ? value.format('HH:mm') : null);
                }}
                format="HH:mm"
                style={{ width: '100%' }}
                placeholder="Chọn Giờ"
              />
            </div>
            <div className="match-details-field">
              <label>Địa Điểm</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Địa Điểm"
              />
            </div>
          </>
        ) : (
          <div className="match-details-readonly">
            <p><strong>Thời Gian:</strong> {match.Time ? moment(match.Time).format('YYYY-MM-DD HH:mm') : 'Chưa Có'}</p>
            <p><strong>Địa Điểm:</strong> {match.location || 'Chưa Có'}</p>
          </div>
        )}
      </Modal>
    );
  };
  const initializeTournament = (teamList) => {
    const totalRounds = Math.ceil(Math.log2(teamList.length));
    let matchStructure = {};

    for (let i = totalRounds; i > 0; i--) {
      const roundName = `round${i}`;
      const matchCount = Math.pow(2, i - 1);
      const matches = [];

      for (let j = 0; j < matchCount; j++) {
        if (i === totalRounds) {
          // Kiểm tra xem có đủ đội cho trận đấu không
          const team1Index = j * 2;
          const team2Index = j * 2 + 1;

          // Log để debug
          console.log(`Processing match ${j}:`, {
            team1Index,
            team2Index,
            team1: teamList[team1Index],
            team2: teamList[team2Index]
          });

          matches.push({
            team1: teamList[team1Index]?.teamName || 'Chưa Có',
            team2: teamList[team2Index]?.teamName || 'Chưa Có',
            team1Id: teamList[team1Index]?.teamId || null,
            team2Id: teamList[team2Index]?.teamId || null,
            score1: '',
            score2: '',
            time: '',
            location: ''
          });
        } else {
          matches.push({
            team1: 'Chưa Có',
            team2: 'Chưa Có',
            team1Id: null,
            team2Id: null,
            score1: '',
            score2: '',
            time: '',
            location: ''
          });
        }
      }
      matchStructure[roundName] = matches;
    }

    console.log("Initialized Tournament Structure:", matchStructure);
    return matchStructure;
  };




  const updateMatchesWithResults = (results, currentMatches) => {
    console.log("=== Starting updateMatchesWithResults ===");
    const newMatches = { ...currentMatches };

    // Sắp xếp kết quả theo roundNumber để xử lý từ vòng đầu tiên
    const sortedResults = [...results].sort((a, b) => b.roundNumber - a.roundNumber);

    sortedResults.forEach(result => {
      const { roundNumber, matchNumber, team1Id, team2Id, score1, score2, time, location } = result;
      const roundKey = `round${roundNumber}`;

      if (newMatches[roundKey] && newMatches[roundKey][matchNumber - 1]) {
        const match = newMatches[roundKey][matchNumber - 1];

        newMatches[roundKey][matchNumber - 1] = {
          ...match,
          team1Id,
          team2Id,
          score1: score1 !== undefined && score1 !== null ? score1.toString() : '-',
          score2: score2 !== undefined && score2 !== null ? score2.toString() : '-',
          Time: time || '',
          location: location || ''
        };

        // Xử lý cập nhật vòng tiếp theo nếu có điểm số
        if (score1 !== null && score2 !== null && score1 !== '-' && score2 !== '-') {
          const winningTeam = parseInt(score1) > parseInt(score2)
            ? {
              name: match.team1,
              id: team1Id
            }
            : {
              name: match.team2,
              id: team2Id
            };

          // Cập nhật cho vòng tiếp theo
          if (roundNumber > 1) {
            const nextRound = `round${roundNumber - 1}`;
            const nextMatchIndex = Math.floor((matchNumber - 1) / 2);
            const isFirstTeam = (matchNumber - 1) % 2 === 0;

            // Đảm bảo vòng tiếp theo tồn tại
            if (!newMatches[nextRound]) {
              newMatches[nextRound] = [];
            }

            // Đảm bảo trận đấu tiếp theo tồn tại
            if (!newMatches[nextRound][nextMatchIndex]) {
              newMatches[nextRound][nextMatchIndex] = {
                team1: 'Chưa Có',
                team2: 'Chưa Có',
                team1Id: null,
                team2Id: null,
                score1: '-',
                score2: '-'
              };
            }

            // Cập nhật đội thắng vào vị trí tương ứng
            if (isFirstTeam) {
              newMatches[nextRound][nextMatchIndex] = {
                ...newMatches[nextRound][nextMatchIndex],
                team1: winningTeam.name,
                team1Id: winningTeam.id
              };
            } else {
              newMatches[nextRound][nextMatchIndex] = {
                ...newMatches[nextRound][nextMatchIndex],
                team2: winningTeam.name,
                team2Id: winningTeam.id
              };
            }
          }
        }
      }
    });

    console.log("Final updated matches:", newMatches);
    setMatches(newMatches);
  };


  const fetchTournamentResults = async () => {
    if (hasFetched.current) return;
    try {
      setLoading(true);
      const response = await getTournamentResults(tournamentId);

      if (response && response.data.data.$values) {
        console.log('Fetched results:', response.data.data.$values); // Kiểm tra log
        updateMatchesWithResults(response.data.data.$values, matches);
      }
    } catch (err) {
      console.error('Error fetching tournament results:', err);
      setError('Failed to fetch tournament results');
    } finally {
      setLoading(false);
      hasFetched.current = true;
    }
  };



  const handleScoreChange = async (round, matchIndex, team, value) => {
    console.log("Handle Score Change Started:", { round, matchIndex, team, value });

    const newMatches = { ...matches };

    // Cập nhật điểm số
    if (team === 1) {
      newMatches[round][matchIndex].score1 = value;
    } else {
      newMatches[round][matchIndex].score2 = value;
    }

    // Kiểm tra nếu cả hai điểm số đã được nhập
    if (newMatches[round][matchIndex].score1 !== '' &&
      newMatches[round][matchIndex].score2 !== '') {

      const currentMatch = newMatches[round][matchIndex];
      const score1 = parseInt(currentMatch.score1);
      const score2 = parseInt(currentMatch.score2);

      // Kiểm tra xem có phải là tỷ số hòa không
      if (score1 === score2) {
        toast.error('Tỷ số hòa không được chấp nhận. Vui lòng nhập lại để có đội chiến thắng.');
        return; // Không cập nhật state nếu là tỷ số hòa
      }

      // Xác định đội thắng
      let winningTeam;
      if (score1 > score2) {
        winningTeam = {
          name: currentMatch.team1,
          id: currentMatch.team1Id
        };
      } else {
        winningTeam = {
          name: currentMatch.team2,
          id: currentMatch.team2Id
        };
      }

      // Cập nhật round tiếp theo
      const currentRoundNumber = parseInt(round.replace('round', ''));

      if (currentRoundNumber > 1) {
        const nextRoundNumber = currentRoundNumber - 1;
        const nextRound = `round${nextRoundNumber}`;
        const nextMatchIndex = Math.floor(matchIndex / 2);
        const isFirstTeamOfNextMatch = matchIndex % 2 === 0;

        const winningTeamName = teams.find(team => team.teamId === winningTeam.id)?.teamName || winningTeam.name;

        if (isFirstTeamOfNextMatch) {
          newMatches[nextRound][nextMatchIndex].team1 = winningTeamName;
          newMatches[nextRound][nextMatchIndex].team1Id = winningTeam.id;
        } else {
          newMatches[nextRound][nextMatchIndex].team2 = winningTeamName;
          newMatches[nextRound][nextMatchIndex].team2Id = winningTeam.id;
        }
      } else {
        setWinner(winningTeam.name);
      }
    }

    console.log("Updated matches structure:", newMatches);
    setMatches(newMatches);
  };


  const saveResults = async () => {
    try {
      setLoading(true);

      const convertedMatches = Object.entries(matches).reduce((acc, [roundKey, roundMatches]) => {
        const roundNumber = parseInt(roundKey.replace('round', ''));

        const convertedRoundMatches = roundMatches
          .map((match, index) => {
            if (match.team1Id && match.team2Id) {
              return {
                matchNumber: index + 1,
                team1Id: match.team1Id,
                team2Id: match.team2Id,
                score1: match.score1 !== "" ? parseInt(match.score1) : null,
                score2: match.score2 !== "" ? parseInt(match.score2) : null,
                Time: match.Time || match.time || null,  // Xử lý cả 2 trường hợp
                Location: match.Location || match.location || null,  // Đảm bảo viết hoa đúng với API
              };
            }
            return null;
          })
          .filter(match => match !== null);

        if (convertedRoundMatches.length > 0) {
          acc[roundNumber] = convertedRoundMatches;
        }
        return acc;
      }, {});

      if (Object.keys(convertedMatches).length > 0) {
        const data = {
          tournamentId: parseInt(tournamentId),
          matches: convertedMatches,
        };

        const response = await saveTournamentResults(data);

        if (response && response.data && response.data.success) {
          setEditMode(false);
          toast.success('Đã cập nhật thông tin trận đấu');
          await fetchTournamentResults();
        } else {
          toast.error('Lỗi cập nhật thông tin trận đấu');
        }
      } else {
        toast.success('Không có gì thay đổi.');
      }

    } catch (err) {
      toast.error('Lỗi cập nhật thông tin trận đấu'+ err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Hearder />
      <div className="tournament-container">
        <div className="tournament-controls">
          <h2>Bảng Giải Đấu</h2>
          {error && <div className="error-message">{error}</div>}
          {winner && (
            <div className="winner-announcement">
              <h3>Tournament Winner</h3>
              <div className="winner-name">{winner}</div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                disabled={loading}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '0 10px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Cập nhật
              </button>
            )}
            {editMode && (
              <button
                onClick={saveResults}
                disabled={loading}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '0 10px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Lưu
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {console.log("Matches State Before Render:", matches)} {/* DEBUG */}
            <div className="tournament-bracket">
              {Object.entries(matches).map(([roundName, roundMatches], roundIndex) => (
                <div key={roundName} className={`round ${roundName}`}>
                  <h3>{`Round ${Math.log2(numberOfTeams) - roundIndex}`}</h3>
                  <div className="match-container">
                    {roundMatches.map((match, matchIndex) => (
                      <div key={matchIndex} className="match">
                        <div className="match-details">
                          {/* <p>{match.date} {match.time}</p>
                          <p>{match.location}</p> */}
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: '#28a745', // Màu xanh lá cây
                              borderColor: '#28a745', // Màu viền trùng với màu nền
                              color: 'white', // Chữ màu trắng
                              marginBottom: '10px'
                            }}
                            onClick={() => {
                              setSelectedMatch({ round: roundName, index: matchIndex });
                              setShowModal(true);
                            }}
                          >
                            {editMode ? 'Chỉnh Sửa' : 'Chi tiết'}
                          </Button>
                        </div>
                        <div className={`team ${parseInt(match.score1) > parseInt(match.score2) ? 'winner' : ''}`}>
                          <span>{match.team1}</span>
                          {editMode ? (
                            <input
                              type="number"
                              value={match.score1}
                              onChange={(e) => handleScoreChange(roundName, matchIndex, 1, e.target.value)}
                              min="0"
                              className="score-input"
                            />
                          ) : (
                            <span className="score">{match.score1 !== undefined && match.score1 !== null ? match.score1 : '-'}</span>
                          )}
                        </div>
                        <div className={`team ${parseInt(match.score2) > parseInt(match.score1) ? 'winner' : ''}`}>
                          <span>{match.team2}</span>
                          {editMode ? (
                            <input
                              type="number"
                              value={match.score2}
                              onChange={(e) => handleScoreChange(roundName, matchIndex, 2, e.target.value)}
                              min="0"
                              className="score-input"
                            />
                          ) : (
                            <span className="score">{match.score2 !== undefined && match.score2 !== null ? match.score2 : '-'}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
            {showModal && selectedMatch && (
              <MatchDetailsModal
                match={selectedMatch ? matches[selectedMatch.round][selectedMatch.index] : {}}
                open={showModal}
                onClose={() => setShowModal(false)}
                onSave={(details) => {
                  const newMatches = { ...matches };
                  newMatches[selectedMatch.round][selectedMatch.index] = {
                    ...newMatches[selectedMatch.round][selectedMatch.index],
                    ...details
                  };
                  setMatches(newMatches);
                }}
                editMode={editMode}
              />
            )}
          </>
        )}
      </div>
      <ToastContainer 
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
      <Footer />
    </div>
  );
};

export default TournamentBracket;