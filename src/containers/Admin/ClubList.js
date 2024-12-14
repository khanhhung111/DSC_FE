import { useEffect, useState, useCallback } from "react";
import { Pagination } from "antd";
import { Modal } from "antd";
import { EyeOutlined, DeleteOutlined, ArrowLeftOutlined, PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { getClubList, searchByNameClub, outClub, getClubMembers, stopClub, activateClub } from "../../utils/admin";
import { toast } from 'react-toastify';
import helloAdmin from "../../assets/helloAdmin.png";
import 'react-toastify/dist/ReactToastify.css';
import { dateFormatting } from "../../utils/formatHelper";

function ClubList() {
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const [clubList, setClubList] = useState([]); // Danh sách câu lạc bộ
    const [paginatedList, setPaginatedList] = useState([]); // Dữ liệu phân trang
    const [paginatedListDetail, setPaginatedListDetail] = useState([]); // Dữ liệu phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Số phần tử trên mỗi trang
    const [clubDetail, setClubDetail] = useState(null); // Chi tiết câu lạc bộ
    const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm câu lạc bộ
    const [isDetailView, setIsDetailView] = useState(false); // Trạng thái xem chi tiết
    const [clubToDelete, setClubToDelete] = useState(null);
    const [clubId, setClubId] = useState(null);
    useEffect(() => {
        getClubList()
            .then((res) => {
                const clubs = res?.data?.listClub.$values || [];
                setClubList(clubs);
                setPaginatedList(clubs.slice(0, itemsPerPage)); // Cắt dữ liệu theo trang đầu tiên
            })
            .catch((err) => console.error("ERROR: ", err));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        setPaginatedList(clubList.slice(startIndex, startIndex + itemsPerPage));
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
            await outClub(clubId, playerToDelete.userId);

            // Thông báo thành công
            toast.success("Xóa thành viên khỏi club thành công!", {
                autoClose: 1000,
            });
            setIsDeleteModalVisible(false);
            const res = await getClubMembers(clubId); // Gọi API chi tiết câu lạc bộ
            const clubdetails = res.data.users.$values
            setClubDetail(clubdetails); // Set club detail
            setClubId(clubId); // Lưu clubId vào state
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
            await stopClub(clubToDelete.clubId);

            // Thông báo thành công
            toast.success("Dừng hoạt động club thành công!", {
                autoClose: 1000,
            });
            setIsDeleteModalVisible(false);
            const response = await getClubList();
            if (response.status === 200) {
                const clubs = response.data?.listClub.$values || [];
                setClubList(clubs);  // Set club list with full list
                setPaginatedList(clubs.slice(0, itemsPerPage)); // Paginate full list
            }
        } catch (error) {
            // Thông báo lỗi nếu có
            toast.error(`Dừng hoạt động club thất bại: ${error.message}`);
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
                    const response = await getClubList();
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

    const handleDisplayDetail = async (clubId) => {
        try {
            const res = await getClubMembers(clubId); // Gọi API chi tiết câu lạc bộ
            const clubdetails = res.data.users.$values
            setClubDetail(clubdetails); // Set club detail
            setClubId(clubId); // Lưu clubId vào state
            setIsDetailView(true); // Chuyển sang chế độ xem chi tiết
            setPaginatedListDetail(clubdetails.slice(0, itemsPerPage)); // Paginate full list
          } catch (error) {
            console.error(error);
            toast.error("Lỗi khi tải chi tiết câu lạc bộ.");
          }
    };
    const handleActivateClub = async (clubId) => {
        try {
            // Dừng hoạt động câu lạc bộ
            await activateClub(clubId);

            // Thông báo thành công
            toast.success("Kích hoạt club thành công!", {
                autoClose: 1000,
            });
            setIsDeleteModalVisible(false);
            const response = await getClubList();
            if (response.status === 200) {
                const clubs = response.data?.listClub.$values || [];
                setClubList(clubs);  // Set club list with full list
                setPaginatedList(clubs.slice(0, itemsPerPage)); // Paginate full list
            }
        } catch (error) {
            // Thông báo lỗi nếu có
            toast.error(`Kích hoạt club thất bại: ${error.message}`);
        }
    };

    // Hiển thị danh sách câu lạc bộ hoặc chi tiết câu lạc bộ
    return (
        <div className="p-4">
            <img src={helloAdmin} className="w-full mb-4 rounded-md shadow" alt="Admin" />
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-1/4 mb-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
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
                            key={clubDetail.userId}
                            className="flex items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
                        >
                            <img
                                src={clubDetail.avatar || "default-club-avatar.jpg"}
                                alt="Club Avatar"
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{clubDetail.fullName}</h3>
                                <p className="text-sm text-gray-600 mb-1">Vai Trò: {clubDetail.role}</p>
                                <p className="text-sm text-gray-600 mb-1">Ngày tham gia: {dateFormatting(clubDetail.joinDate)}</p>
                                <p className="text-sm text-gray-600 mb-1">Chức Vụ: {clubDetail.role}</p>
                            </div>
                            {clubDetail.role === "Player" && (
                                <button
                                    className="text-red-500 flex items-center space-x-2 py-3 px-6 bg-red-100 rounded-lg shadow-lg hover:bg-red-200 transition-all"
                                    onClick={() => showDeleteConfirm(clubDetail)}
                                >
                                    <DeleteOutlined className="text-xl" />
                                </button>
                            )}
                        </div>
                    ))}
                    <Modal
                        title="Xác nhận xóa thành viên"
                        visible={isConfirmModalVisible}
                        onOk={handleDelete}
                        onCancel={handleCancelDelete}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{
                            style: {
                                backgroundColor: 'red',
                                borderColor: 'red',
                                color: 'white',
                            },
                        }}
                    >
                        <p>Bạn có chắc chắn muốn xóa thành viên "{playerToDelete?.fullName}" khỏi câu lạc bộ không?</p>
                    </Modal>
                </div>
            ) : (
                <div className="space-y-6">
                    {paginatedList.map((club) => (
                        <div
                            key={club.clubId}
                            className="flex items-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
                        >
                            <img
                                src={club.avatar || "default-club-avatar.jpg"}
                                alt="Club Avatar"
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{club.clubName}</h3>
                                <p className="text-sm text-gray-600 mb-1">Ngày tạo: {dateFormatting(club.createDate)}</p>
                                <p className="text-sm text-gray-600 mb-1">{club.userCount} Thành Viên</p>
                                <p className="text-sm text-gray-600 mb-1">Trạng Thái: {club.status}</p>
                            </div>

                            {/* Chi tiết button with icon */}
                            <button
                                className="text-blue-500 flex items-center space-x-2"
                                onClick={() => handleDisplayDetail(club.clubId)}
                            >
                                <EyeOutlined />
                                <span>Thành Viên</span>
                            </button>
                            <span className="border-l border-gray-300 h-6 mx-4"></span>
                            {/* Dừng hoạt động or Kích hoạt lại button */}
                            {club.status === "Active" ? (
                                <button
                                    className="text-red-500 flex items-center space-x-2"
                                    onClick={() => showDeleteModal(club)} // Hàm này xử lý dừng hoạt động
                                >
                                    <PauseOutlined />
                                    <span>Dừng hoạt động</span>
                                </button>
                            ) : (
                                <button
                                    className="text-green-500 flex items-center space-x-2"
                                    onClick={() => handleActivateClub(club.clubId)} // Hàm này xử lý kích hoạt lại câu lạc bộ
                                >
                                    <PlayCircleOutlined />
                                    <span>Kích hoạt lại</span>
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Modal confirm delete */}
                    <Modal
                        title="Xác nhận dừng hoạt động câu lạc bộ"
                        visible={isDeleteModalVisible}
                        onOk={handleDeleteClub}
                        onCancel={handleCancelDeleteClub}
                        okText="Dừng hoạt động"
                        cancelText="Hủy"
                        okButtonProps={{
                            style: {
                                backgroundColor: 'red',
                                borderColor: 'red',
                                color: 'white',
                            },
                        }}
                    >
                        <p>Bạn có chắc chắn muốn dừng hoạt động câu lạc bộ "{clubToDelete?.clubName}" không?</p>
                    </Modal>
                </div>

            )}

            {/* Phân trang */}
            {!isDetailView && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={clubList.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
}

export default ClubList;
