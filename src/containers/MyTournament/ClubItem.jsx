import React from "react";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined, RadarChartOutlined, TrophyOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import { Modal } from "antd"; // Import Modal từ Ant Design
import { toast } from "react-toastify"; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast
import styles from "./ClubItem.module.css";
import { dateFormatting } from "../../utils/formatHelper";
import { deleteTournament } from "../../utils/tournament";
// Giả sử có một API deleteTournament ở đâu đó
const deleteTournaments = async (tournamentId) => {
  try {
    const response = await deleteTournament(tournamentId);
    console.log("cccc", response);
    if (!response.data.success == true) {
      throw new Error("Failed to delete tournament");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

function ClubItem({ tournamentId, name, numberOfTeams, location, startDate, avatar, tournamentType }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm xử lý sự kiện khi người dùng click vào nút "Xem thêm"
  const handleViewMore = () => {
    navigate(`/updateTournament/${tournamentId}`); // Điều hướng đến /detailClub/clubId
  };
  const handleViewResult = () => {
    // Kiểm tra loại giải đấu và điều hướng tương ứng
    if (tournamentType === 'knockout') {
      navigate(`/TournamentBracket/${tournamentId}`); // Điều hướng đến trang đấu loại trực tiếp
    } else if (tournamentType === 'roundRobin') {
      navigate(`/roundRobinBracket/${tournamentId}`); // Điều hướng đến trang đấu vòng tròn
    }
  };
  


  // Hàm xử lý xóa giải đấu
  const handleDelete = () => {
    // Hiển thị modal yêu cầu xác nhận xóa
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa giải đấu này?",
      okText: "Xóa",
      cancelText: "Hủy",
      // Thêm thuộc tính okButtonProps để thay đổi kiểu dáng của nút "Xóa"
      okButtonProps: {
        style: {
          backgroundColor: "#ff4d4f",  // Màu đỏ cho nút Xóa
          borderColor: "#ff4d4f",       // Màu biên giới của nút Xóa
          color: "white",               // Màu chữ là trắng
        },
      },
      onOk: () => {
        // Gọi API xóa khi người dùng xác nhận
        deleteTournaments(tournamentId)
          .then(() => {
            // Hiển thị toast khi xóa thành công
            toast.success("Giải đấu đã được xóa thành công!", {
              autoClose: 1000,
            });

            // Làm mới trang sau một khoảng thời gian ngắn
            setTimeout(() => {
              window.location.reload(); // Hoặc sử dụng history.push('/currentPage') nếu bạn muốn điều hướng
            }, 1000);
          })
          .catch((error) => {
            // Hiển thị toast khi có lỗi xảy ra
            toast.error(`Xóa giải đấu thất bại: ${error.message}`);
          });
      },
      onCancel: () => {
        // Nếu người dùng hủy, không làm gì cả
        toast.info("Bạn đã hủy hành động xóa");
      },
    });
  };

  return (
    <article className={styles.clubItem}>
      {/* Avatar bên trái */}
      <img src={avatar} alt={`${name} avatar`} className={styles.clubLogo} />

      {/* Thông tin giải đấu */}
      <div className={styles.clubInfo}>
        <h2 className={styles.name} onClick={handleViewResult} style={{ fontSize: "24px", fontWeight: 500 }}>{name}</h2>

        {/* Ngày bắt đầu */}
        <p className={styles.clubDetails}>
          <CalendarOutlined style={{ marginRight: "8px", color: "#faad14" }} />
          Ngày bắt đầu: {dateFormatting(startDate)}
        </p>

        {/* Số đội */}
        <p className={styles.clubDetails}>
          <UserOutlined style={{ marginRight: "8px", color: "green" }} />
          {numberOfTeams} đội
        </p>

        {/* Khu vực */}
        <p className={styles.clubStatus}>
          <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          Khu vực: {location}
        </p>

        {/* tournamentType */}
        <p className={styles.clubStatus}>
          {tournamentType === 'roundRobin' ? (
            <RadarChartOutlined style={{ marginRight: "8px", color: "#28a745" }} /> // Màu xanh cho đấu vòng tròn
          ) : tournamentType === 'knockout' ? (
            <TrophyOutlined style={{ marginRight: "8px", color: "#dc3545" }} /> // Màu đỏ cho đấu loại trực tiếp
          ) : (
            <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} /> // Màu xanh dương cho trường hợp khác
          )}
          Thể Loại: {tournamentType === 'roundRobin' ? 'Đấu vòng tròn' : tournamentType === 'knockout' ? 'Đấu loại trực tiếp' : 'Không xác định'}
        </p>
      </div>



      {/* Nút "Xóa" */}
      <button className={styles.DeleteButton} onClick={handleDelete}>
        Xóa
      </button>

      {/* Nút "Cập nhật" */}
      <button className={styles.viewMoreButton} onClick={handleViewMore}>
        Cập Nhật
      </button>
    </article>
  );
}

export default ClubItem;
