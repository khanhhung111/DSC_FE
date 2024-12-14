import { useEffect, useState, useCallback } from "react";
import { Pagination } from "antd";
import { Modal } from "antd";
import { EyeOutlined, DeleteOutlined, ArrowLeftOutlined, PauseOutlined, PlayCircleOutlined, CalendarOutlined, TeamOutlined, EnvironmentOutlined, FlagOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { getTournamentList, searchByNameClub, outClub, getTournamentMembers, deleteTournament, getListMember } from "../../utils/admin";
import { toast } from 'react-toastify';
import helloAdmin from "../../assets/helloAdmin.png";
import 'react-toastify/dist/ReactToastify.css';
import { dateFormatting } from "../../utils/formatHelper";
import Defaults from "../../assets/teamne.jpg";
import styles from "./Detail/Tournament.module.css"
function TournamentList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const [clubList, setClubList] = useState([]); // Danh sách câu lạc bộ
    const [paginatedList, setPaginatedList] = useState([]); // Dữ liệu phân trang
    const [paginatedListDetail, setPaginatedListDetail] = useState([]); // Dữ liệu phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageTeam, setCurrentPageTeam] = useState(1);
    const [itemsPerPage] = useState(3); // Số phần tử trên mỗi trang
    const [itemsPerPageTeam] = useState(5);
    const [clubDetail, setClubDetail] = useState(null); // Chi tiết câu lạc bộ
    const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm câu lạc bộ
    const [isDetailView, setIsDetailView] = useState(false); // Trạng thái xem chi tiết
    const [clubToDelete, setClubToDelete] = useState(null);
    const [tournamentId, setTournamentId] = useState(null);
    useEffect(() => {
        getTournamentList()
            .then((res) => {
                const clubs = res?.data?.$values || [];
                setClubList(clubs);
                setPaginatedList(clubs.slice(0, itemsPerPage)); // Cắt dữ liệu theo trang đầu tiên
            })
            .catch((err) => console.error("ERROR: ", err));
    }, []);
    const closeModal = () => {
        setShowModal(false);
        setSelectedTeamPlayers([]);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        setPaginatedList(clubList.slice(startIndex, startIndex + itemsPerPage));
    };
    const handlePageChangeTeam = (page) => {
        setCurrentPageTeam(page);
        const startIndex = (page - 1) * itemsPerPageTeam;
        setPaginatedListDetail(clubDetail.slice(startIndex, startIndex + itemsPerPageTeam));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const showDeleteConfirm = (clubDetail) => {
        setPlayerToDelete(clubDetail); // Set member to delete
        setIsConfirmModalVisible(true); // Show confirm modal
    };

    const handleDelete = async () => {
        try {
            // Dừng hoạt động câu lạc bộ
            await outClub(tournamentId, playerToDelete.userId);

            // Thông báo thành công
            toast.success("Xóa thành viên khỏi club thành công!", {
                autoClose: 1000,
            });
            setIsDeleteModalVisible(false);
            const res = await getTournamentMembers(tournamentId); // Gọi API chi tiết câu lạc bộ
            const clubdetails = res.data.users.$values
            setClubDetail(clubdetails); // Set club detail
            setTournamentId(tournamentId); // Lưu clubId vào state
            setIsDetailView(true); // Chuyển sang chế độ xem chi tiết
            setPaginatedListDetail(clubdetails.slice(0, itemsPerPage)); // Paginate full list
        } catch (error) {
            // Thông báo lỗi nếu có
            toast.error(`Xóa thành viên club thất bại: ${error.message}`);
        }
        setIsConfirmModalVisible(false);
    };
    const showDeleteModal = (club) => {
        setClubToDelete(club);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteClub = async () => {
        try {
            // Dừng hoạt động câu lạc bộ
            await deleteTournament(clubToDelete.tournamentId);

            // Thông báo thành công
            toast.success("Xóa Giải Đấu thành công!", {
                autoClose: 1000,
            });
            setIsDeleteModalVisible(false);
            const response = await getTournamentList();
            if (response.status === 200) {
                const clubs = response.data?.$values || [];
                setClubList(clubs);  // Set club list with full list
                setPaginatedList(clubs.slice(0, itemsPerPageTeam)); // Paginate full list
            }
        } catch (error) {
            // Thông báo lỗi nếu có
            toast.error(`Xóa Giải Đấu club thất bại: ${error.message}`);
        }
    };

    const handleCancelDeleteClub = () => {
        setIsDeleteModalVisible(false); // Close the modal if canceled
    };
    const handleCancelDelete = () => {
        setIsConfirmModalVisible(false); // Close the modal if canceled
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchQuery) {
                    // Case when there's a search query
                    const response = await searchByNameClub(searchQuery);

                    if (response.status === 200) {
                        const searchList = response.data?.data.$values || [];
                        setClubList(searchList);  // Set club list with search results
                        setPaginatedList(searchList.slice(0, itemsPerPage)); // Paginate search results
                    } else {
                        console.error("Failed to fetch club list. Status:", response.status);
                    }
                } else {
                    // Case when searchQuery is empty
                    const response = await getTournamentList();
                    if (response.status === 200) {
                        const clubs = response.data?.listClub.$values || [];
                        setClubList(clubs);  // Set club list with full list
                        setPaginatedList(clubs.slice(0, itemsPerPage)); // Paginate full list
                    } else {
                        console.error("Failed to fetch club list using getClubList");
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleDisplayDetail = async (tournamentId) => {
        try {
            const res = await getTournamentMembers(tournamentId); // Gọi API chi tiết câu lạc bộ
            console.log("res", res)
            // Kiểm tra nếu không có team nào tham gia (dữ liệu rỗng)
            if (res.data.$values && Array.isArray(res.data.$values) && res.data.$values.length === 0) {
                toast.success("Chưa có team nào tham gia.");
            }
            // Kiểm tra nếu có dữ liệu team tham gia
            else if (res.data.$values && Array.isArray(res.data.$values)) {
                const clubdetails = res.data.$values;
                setClubDetail(clubdetails); // Set club detail
                setTournamentId(tournamentId); // Lưu tournamentId vào state
                setIsDetailView(true); // Chuyển sang chế độ xem chi tiết
                setPaginatedListDetail(clubdetails.slice(0, itemsPerPageTeam)); // Phân trang
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi tải chi tiết câu lạc bộ.");
        }

    };
    const handleViewMore = async (teamId) => {
        try {
            setLoading(true);
            const response = await getListMember(teamId);

            // Kiểm tra và xử lý dữ liệu
            if (response && response.data.$values) {
                setSelectedTeamPlayers(response.data.$values);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-1/4 mb-4 p-2 border-2 border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
            />

            {/* Hiển thị chi tiết câu lạc bộ */}
            {isDetailView ? (
                <div className="space-y-6">
                    <button
                        className="text-blue-500 flex items-center space-x-2 py-2 px-4 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition-all"
                        onClick={() => setIsDetailView(false)}
                    >
                        <ArrowLeftOutlined className="text-xl" />
                        <span className="text-lg font-semibold">Quay lại</span>
                    </button>
                    {paginatedListDetail.map((clubDetail) => (
                        <div
                            key={clubDetail.teamId}
                            className="flex items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
                        >
                            <img
                                src={clubDetail.avatar || Defaults}
                                alt="Club Avatar"
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{clubDetail.teamName}</h3>
                                <p className="text-sm text-gray-600 mb-1">Thành Viên: {clubDetail.memberCount}</p>
                            </div>
                            <button
                                className={styles.viewMoreButton}
                                onClick={() => handleViewMore(clubDetail.teamId)}
                            >
                                Xem Thêm
                            </button>
                        </div>

                    ))}
                    {showModal && (
                        <div className={styles.modal} onClick={closeModal}>
                            <div
                                className={styles.modalContent}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeModal}
                                    className={styles.cancelButton}
                                >
                                    ✕
                                </button>

                                <h2>Danh sách Cầu thủ</h2>

                                {loading ? (
                                    <div className={styles.loadingSpinner}>
                                        <p>Đang tải...</p>
                                    </div>
                                ) : (
                                    <div className={styles.modalPlayerList}>
                                        {selectedTeamPlayers.length > 0 ? (
                                            <table className={styles.playerTable}>
                                                <thead>
                                                    <tr>
                                                        <th>Số áo</th>
                                                        <th>Tên Cầu thủ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedTeamPlayers.map((player) => (
                                                        <tr key={player.$id}>
                                                            <td>{player.numberPlayer}</td>
                                                            <td>{player.namePlayer}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Không có thông tin cầu thủ</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {paginatedList.map((club) => (
                        <div
                            key={club.tournamentId}
                            className="flex items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
                        >
                            <img
                                src={club.avatar || "default-club-avatar.jpg"}
                                alt="Club Avatar"
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                                    <span>{club.name}</span>
                                </h3>

                                <p className="text-sm mb-2 flex items-center space-x-2">
                                    <CalendarOutlined className="text-lg text-blue-500" />
                                    <span>Ngày bắt đầu: {dateFormatting(club.startDate)}</span>
                                </p>

                                <p className="text-sm mb-2 flex items-center space-x-2">
                                    <CalendarOutlined className="text-lg text-blue-500" />
                                    <span>Ngày kết thúc: {dateFormatting(club.endDate)}</span>
                                </p>

                                <p className="text-sm mb-2 flex items-center space-x-2">
                                    <UsergroupAddOutlined className="text-lg text-green-500" />
                                    <span>{club.numberOfTeams} đội</span>
                                </p>

                                <p className="text-sm mb-2 flex items-center space-x-2">
                                    <EnvironmentOutlined className="text-lg text-orange-500" />
                                    <span>Địa Điểm: {club.location}</span>
                                </p>

                                <p className={`text-sm mb-2 flex items-center space-x-2 `}>
                                    <FlagOutlined className="text-lg" />
                                    <span>Trình Độ Yêu Cầu:
                                        <span
                                            className={`
      ${club.levelName === 'Mới biết chơi' || club.levelName === 'Trung bình - Khá' ? 'text-green-500' : ''}
      ${club.levelName === 'Chuyên nghiệp' ? 'text-red-500' : ''}
      text-sm
    ` } style={{ paddingLeft: '5px' }}
                                        >
                                            {club.levelName}
                                        </span>
                                    </span>
                                </p>
                            </div>





                            {/* Chi tiết button with icon */}
                            <button
                                className="text-blue-500 flex items-center space-x-2"
                                onClick={() => handleDisplayDetail(club.tournamentId)}
                            >
                                <EyeOutlined />
                                <span>Danh Sách Đội</span>
                            </button>
                            <span className="border-l border-gray-300 h-6 mx-4"></span>
                            {/* Dừng hoạt động or Kích hoạt lại button */}
                            <button
                                className="text-red-500 flex items-center space-x-2"
                                onClick={() => showDeleteModal(club)} // Hàm này xử lý dừng hoạt động
                            >
                                <DeleteOutlined />
                                <span>Xóa Giải Đấu</span>
                            </button>
                        </div>
                    ))}

                    {/* Modal confirm delete */}
                    <Modal
                        title="Xác nhận xóa giải đấu"
                        visible={isDeleteModalVisible}
                        onOk={handleDeleteClub}
                        onCancel={handleCancelDeleteClub}
                        okText="Xóa Giải Đấu"
                        cancelText="Hủy"
                        okButtonProps={{
                            style: {
                                backgroundColor: 'red',
                                borderColor: 'red',
                                color: 'white',
                            },
                        }}
                    >
                        <p>Bạn có chắc chắn muốn xóa giải đấu "{clubToDelete?.name}" không?</p>
                    </Modal>
                </div>

            )}

            {/* Phân trang */}
            {!isDetailView ? (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={clubList.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            ) : (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPageTeam}
                        pageSize={itemsPerPageTeam}
                        total={clubDetail.length}
                        onChange={handlePageChangeTeam}
                        showSizeChanger={false}
                    />
                </div>
            )}

        </div>
    );
}

export default TournamentList;
