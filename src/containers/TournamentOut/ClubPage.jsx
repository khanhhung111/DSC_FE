import React, { useState, useEffect } from 'react';
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SegmentedButton from './SegmentedButton';
import { GetAllTournament } from "../../utils/tournament";
import { toast } from 'react-toastify';
function ClubPage() {
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const userId = localStorage.getItem('userId');
  const [filteredClubs, setFilteredClubs] = useState([]); // Danh sách được lọc theo từ khóa
  const [clubs, setClubs] = useState([]); 
  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await GetAllTournament(userId); // Gửi request để lấy dữ liệu
        console.log('Response:', response);
        if (response.data && Array.isArray(response.data.$values)) {
          setClubs(response.data.$values); // Gán dữ liệu vào state
        } else {
          console.error('Dữ liệu không phải là một mảng:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Không thể tải thông tin sự kiện'); // Thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchClub(); // Gọi hàm fetchClub khi component được mount
  }, [userId]);
  
  const handleSearch = (keyword) => {
    if (!keyword) {
      // Nếu không có từ khóa tìm kiếm, hiển thị tất cả clubs
      setFilteredClubs(clubs);
    } else {
      // Lọc danh sách câu lạc bộ theo từ khóa
      const lowercasedKeyword = keyword.toLowerCase();
      const filtered = clubs.filter((club) =>
        club.name.toLowerCase().includes(lowercasedKeyword)
      );
      setFilteredClubs(filtered);
    }
  };
  useEffect(() => {
    if (!loading) {
      setFilteredClubs(clubs);
    }
  }, [clubs, loading]);
  return (
    <div>
      <Hearder />
      <main className={styles.clubPage}>
        <HeroSection />
        <section className={styles.clubListSection}>
        <SegmentedButton />
        {loading ? (
            <div>Loading...</div>
          ) : (
            <ClubList 
              clubs={filteredClubs} 
              isSearching={filteredClubs !== clubs}
            />
          )}
          <SearchBar onSearch={handleSearch} totalResults={filteredClubs.length} />
        </section>
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
      </main>
      <Footer />
    </div>


  );
}

export default ClubPage;
