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
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
const TournamentBracket = () => {
  const { width, height } = useWindowSize();
  const { tournamentId } = useParams();
  const [showPenalty, setShowPenalty] = useState({});
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
  const getPageSize = () => {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    return { width, height };
  };

  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setPageSize(getPageSize());
    };

    // Cập nhật kích thước ban đầu
    updateSize();

    // Cập nhật khi window resize
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);
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
            <p><strong>Thời Gian:</strong> {match.Time ? moment(match.Time).format('HH:mm - DD/MM/YYYY') : 'Chưa Có'}</p>
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

  const validateBeforeSave = () => {
    let isValid = true;
    let errorMessage = '';

    // Kiểm tra từng trận đấu
    Object.entries(matches).forEach(([roundName, roundMatches]) => {
      roundMatches.forEach((match, index) => {
        // Chỉ kiểm tra các trận đã có điểm số
        if (match.score1 !== '' && match.score2 !== '') {
          // Nếu có tỉ số hòa
          if (parseInt(match.score1) === parseInt(match.score2)) {
            // Kiểm tra xem đã có penalty chưa và penalty có hợp lệ không
            if (!match.penalty1 || !match.penalty2 ||
              match.penalty1 === '' || match.penalty2 === '' ||
              parseInt(match.penalty1) === parseInt(match.penalty2)) {
              isValid = false;
              errorMessage = `Trận đấu ở vòng ${roundName} số ${index + 1} có tỉ số hòa. Vui lòng nhập tỉ số penalty hợp lệ và khác nhau.`;
              return;
            }
          }
        }
      });
    });

    return { isValid, errorMessage };
  };


  const updateMatchesWithResults = (results, currentMatches) => {
    const newMatches = { ...currentMatches };
    const sortedResults = [...results].sort((a, b) => b.roundNumber - a.roundNumber);
  
    sortedResults.forEach((result) => {
      const { roundNumber, matchNumber, team1Id, team2Id, score1, score2, penalty1, penalty2, time, location } = result;
      const roundKey = `round${roundNumber}`;
  
      if (newMatches[roundKey]?.[matchNumber - 1]) {
        const match = newMatches[roundKey][matchNumber - 1];
        const team1Name = teams.find((team) => team.teamId === team1Id)?.teamName || match.team1;
        const team2Name = teams.find((team) => team.teamId === team2Id)?.teamName || match.team2;
  
        newMatches[roundKey][matchNumber - 1] = {
          ...match,
          team1: team1Name,
          team2: team2Name,
          team1Id,
          team2Id,
          score1: score1?.toString() || '-',
          score2: score2?.toString() || '-',
          penalty1: penalty1?.toString() || '',
          penalty2: penalty2?.toString() || '',
          Time: time || '',
          location: location || ''
        };
  
        if (score1 !== null && score2 !== null) {
          let winningTeam;
  
          if (parseInt(score1) === parseInt(score2)) {
            if (penalty1 !== null && penalty2 !== null && parseInt(penalty1) !== parseInt(penalty2)) {
              winningTeam = parseInt(penalty1) > parseInt(penalty2)
                ? { name: team1Name, id: team1Id }
                : { name: team2Name, id: team2Id };
            }
          } else {
            winningTeam = parseInt(score1) > parseInt(score2)
              ? { name: team1Name, id: team1Id }
              : { name: team2Name, id: team2Id };
          }
  
          if (winningTeam && roundNumber > 1) {
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
                score2: '-',
                penalty1: '',
                penalty2: ''
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
  
    const finalRound = newMatches?.round1?.[0];
    if (
      finalRound &&
      finalRound.score1 !== '-' &&
      finalRound.score2 !== '-' &&
      finalRound.score1 !== '' &&
      finalRound.score2 !== ''
    ) {
      let tournamentWinner;
  
      if (parseInt(finalRound.score1) === parseInt(finalRound.score2)) {
        if (
          finalRound.penalty1 !== '' &&
          finalRound.penalty2 !== '' &&
          parseInt(finalRound.penalty1) !== parseInt(finalRound.penalty2)
        ) {
          tournamentWinner =
            parseInt(finalRound.penalty1) > parseInt(finalRound.penalty2)
              ? finalRound.team1
              : finalRound.team2;
        }
      } else {
        tournamentWinner =
          parseInt(finalRound.score1) > parseInt(finalRound.score2)
            ? finalRound.team1
            : finalRound.team2;
      }
  
      if (tournamentWinner) {
        setWinner(tournamentWinner);
      } else {
        setWinner('');
      }
    } else {
      setWinner(''); // Xóa winner nếu Round 1 chưa có đủ kết quả
    }
  
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

  const saveResults = async () => {
    try {
      const validation = validateBeforeSave();
      if (!validation.isValid) {
        toast.error(validation.errorMessage);
        return;
      }
  
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
                score1: match.score1 !== '' ? parseInt(match.score1) : null,
                score2: match.score2 !== '' ? parseInt(match.score2) : null,
                penalty1: match.penalty1 !== '' ? parseInt(match.penalty1) : null,
                penalty2: match.penalty2 !== '' ? parseInt(match.penalty2) : null,
                Time: match.Time || match.time || null,
                Location: match.Location || match.location || null,
              };
            }
            return null;
          })
          .filter((match) => match !== null);
  
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
          toast.success('Đã cập nhật thông tin trận đấu');
  
          const updatedMatches = { ...matches };
          setMatches(updatedMatches);
  
          const finalMatch = updatedMatches.round1?.[0];
          if (
            finalMatch &&
            finalMatch.score1 !== '' &&
            finalMatch.score2 !== '' &&
            finalMatch.score1 !== '-' &&
            finalMatch.score2 !== '-'
          ) {
            let winningTeam;
  
            if (parseInt(finalMatch.score1) === parseInt(finalMatch.score2)) {
              if (
                finalMatch.penalty1 !== '' &&
                finalMatch.penalty2 !== '' &&
                parseInt(finalMatch.penalty1) !== parseInt(finalMatch.penalty2)
              ) {
                winningTeam =
                  parseInt(finalMatch.penalty1) > parseInt(finalMatch.penalty2)
                    ? finalMatch.team1
                    : finalMatch.team2;
              }
            } else {
              winningTeam =
                parseInt(finalMatch.score1) > parseInt(finalMatch.score2)
                  ? finalMatch.team1
                  : finalMatch.team2;
            }
  
            if (winningTeam) {
              setWinner(winningTeam);
            } else {
              setWinner('');
            }
          } else {
            setWinner('');
          }
  
          setEditMode(false);
        } else {
          toast.error('Lỗi cập nhật thông tin trận đấu');
        }
      } else {
        toast.info('Không có thay đổi nào.');
      }
    } catch (err) {
      toast.error('Lỗi cập nhật thông tin trận đấu: ' + err.message);
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
          {winner && (
            <Confetti
              width={pageSize.width}
              height={pageSize.height}
              numberOfPieces={1000}
              style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
            />
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
              <>
                <button
                  onClick={() => window.location.reload()}
                  disabled={loading}
                  style={{
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    padding: '12px 24px',
                    fontSize: '16px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    margin: '0 10px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Hủy
                </button>
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
              </>
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
            <div className="tournament-bracket">
              {Object.entries(matches).map(([roundName, roundMatches], roundIndex) => (
                <div key={roundName} className={`round ${roundName}`}>
                  <h3>{`Round ${Math.log2(numberOfTeams) - roundIndex}`}</h3>
                  <div className="match-container">
                    {roundMatches.map((match, matchIndex) => (
                      <div key={matchIndex} className="match">
                        <div className="match-details">
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: '#28a745',
                              borderColor: '#28a745',
                              color: 'white',
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

                        {/* Team 1 */}
                        {/* Team 1 */}
                        {/* Team 1 */}
                        <div className={`team ${match.score1 !== '' && match.score2 !== '' &&
                          ((parseInt(match.score1) > parseInt(match.score2)) ||
                            (parseInt(match.score1) === parseInt(match.score2) &&
                              parseInt(match.penalty1) > parseInt(match.penalty2)))
                          ? 'winner' : ''}`}>
                          <span>{match.team1}</span>
                          <div className="score-container">
                            {editMode ? (
                              <div className="input-group">
                                <input
                                  type="number"
                                  value={match.score1}
                                  onChange={(e) => {
                                    const newMatches = { ...matches };
                                    newMatches[roundName][matchIndex].score1 = e.target.value;
                                    if (e.target.value === match.score2 && e.target.value !== '') {
                                      setShowPenalty(prev => ({
                                        ...prev,
                                        [`${roundName}-${matchIndex}`]: true
                                      }));
                                    }
                                    setMatches(newMatches);
                                  }}
                                  min="0"
                                  className="score-input"
                                />
                                {parseInt(match.score1) === parseInt(match.score2) &&
                                  match.score1 !== '' && match.score2 !== '' && (
                                    <input
                                      type="number"
                                      value={match.penalty1 || ''}
                                      onChange={(e) => {
                                        const newMatches = { ...matches };
                                        newMatches[roundName][matchIndex].penalty1 = e.target.value;
                                        setMatches(newMatches);
                                      }}
                                      min="0"
                                      className="penalty-input"
                                      placeholder="Pen"
                                    />
                                  )}
                              </div>
                            ) : (
                              <span className="score">
                                {match.score1 !== undefined && match.score1 !== null ? match.score1 : '-'}
                                {match.penalty1 && match.score1 === match.score2 ? (
                                  <>
                                    <span>{` (${match.penalty1})`}</span>
                                    <sup className="penalty-sup">P</sup>
                                  </>
                                ) : ''}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div className={`team ${match.score1 !== '' && match.score2 !== '' &&
                          ((parseInt(match.score2) > parseInt(match.score1)) ||
                            (parseInt(match.score1) === parseInt(match.score2) &&
                              parseInt(match.penalty2) > parseInt(match.penalty1)))
                          ? 'winner' : ''}`}>
                          <span>{match.team2}</span>
                          <div className="score-container">
                            {editMode ? (
                              <div className="input-group">
                                <input
                                  type="number"
                                  value={match.score2}
                                  onChange={(e) => {
                                    const newMatches = { ...matches };
                                    newMatches[roundName][matchIndex].score2 = e.target.value;
                                    if (e.target.value === match.score1 && e.target.value !== '') {
                                      setShowPenalty(prev => ({
                                        ...prev,
                                        [`${roundName}-${matchIndex}`]: true
                                      }));
                                    }
                                    setMatches(newMatches);
                                  }}
                                  min="0"
                                  className="score-input"
                                />
                                {parseInt(match.score1) === parseInt(match.score2) &&
                                  match.score1 !== '' && match.score2 !== '' && (
                                    <input
                                      type="number"
                                      value={match.penalty2 || ''}
                                      onChange={(e) => {
                                        const newMatches = { ...matches };
                                        newMatches[roundName][matchIndex].penalty2 = e.target.value;
                                        setMatches(newMatches);
                                      }}
                                      min="0"
                                      className="penalty-input"
                                      placeholder="Pen"
                                    />
                                  )}
                              </div>
                            ) : (
                              <span className="score">
                                {match.score2 !== undefined && match.score2 !== null ? match.score2 : '-'}
                                {match.penalty2 && match.score1 === match.score2 ? (
                                  <>
                                    <span>{` (${match.penalty2})`}</span>
                                    <sup className="penalty-sup">P</sup>
                                  </>
                                ) : ''}
                              </span>
                            )}
                          </div>
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