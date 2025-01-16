import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import SegmentedButton from "./SegmentedButton";
import { getMyClub, updateStatusClub } from "../../utils/club";
import { toast } from 'react-toastify';
import moment from 'moment';

function ClubPage() {
  const userId = localStorage.getItem('userId');
  const [clubs, setClubs] = useState([]); // Danh sách tất cả câu lạc bộ
  const [filteredClubs, setFilteredClubs] = useState([]); // Danh sách được lọc theo từ khóa
  const [loading, setLoading] = useState(true);

  const checkAndUpdateExpiredClubs = async (clubs) => {
    const now = moment();
    const expiredClubs = clubs.filter(club => {
      const createDate = moment(club.createDate);
      const daysDiff = now.diff(createDate, 'days');
      return daysDiff >= 30 && club.status !== "Expired";
    });

    if (expiredClubs.length > 0) {
      try {
        await Promise.all(expiredClubs.map(club => updateStatusClub(club.clubId)));
        toast.success('Đã cập nhật trạng thái các câu lạc bộ hết hạn');
        return true;
      } catch (error) {
        console.error('Error updating expired clubs:', error);
        toast.error('Không thể cập nhật trạng thái câu lạc bộ');
        return false;
      }
    }
    return false;
  };

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await getMyClub(userId);
      if (response.data && response.data.success) {
        if (response.data.listClub && Array.isArray(response.data.listClub.$values)) {
          const fetchedClubs = response.data.listClub.$values;
          setClubs(fetchedClubs);
          setFilteredClubs(fetchedClubs); // Set filtered clubs to all clubs initially
          const updated = await checkAndUpdateExpiredClubs(fetchedClubs);
          if (updated) {
            const updatedResponse = await getMyClub(userId);
            if (updatedResponse.data && updatedResponse.data.success) {
              const updatedClubs = updatedResponse.data.listClub.$values;
              setClubs(updatedClubs);
              setFilteredClubs(updatedClubs);
            }
          }
        } else {
          console.error('Dữ liệu không phải là một mảng:', response.data);
          toast.error('Dữ liệu câu lạc bộ không đúng định dạng');
        }
      } else {
        toast.error('Không thể tải thông tin câu lạc bộ');
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Không thể tải thông tin câu lạc bộ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
    // Thiết lập interval để tự động fetch dữ liệu mỗi 30 giây
    const interval = setInterval(() => {
      fetchClubs();
    }, 30000); // 30000 milliseconds = 30 giây

    // Cleanup function để clear interval khi component unmount
    return () => clearInterval(interval);
  }, [userId]);

  const handleSearch = (keyword) => {
    if (!keyword) {
      // Nếu không có từ khóa tìm kiếm, hiển thị tất cả clubs
      setFilteredClubs(clubs);
    } else {
      // Lọc danh sách câu lạc bộ theo từ khóa
      const lowercasedKeyword = keyword.toLowerCase();
      const filtered = clubs.filter((club) =>
        club.clubName.toLowerCase().includes(lowercasedKeyword)
      );
      setFilteredClubs(filtered);
    }
  };

  return (
    <div>
      <Hearder />
      <main className={styles.clubPage}>
        <HeroSection />
        <SearchBar onSearch={handleSearch} totalResults={filteredClubs.length} />
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
        </section>
      </main>
      <ToastContainer position="top-right" autoClose={5000} />
      <Footer />
    </div>
  );
}

export default ClubPage;