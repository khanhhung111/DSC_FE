import React, { useState, useEffect } from 'react';
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import SegmentedButton from "./SegmentedButton";
import { getMyClubJoined } from "../../utils/club";
import { toast } from 'react-toastify';

function ClubPage() {
    const userId = localStorage.getItem('userId');
    const [clubs, setClubs] = useState([]); // Danh sách tất cả câu lạc bộ
    const [filteredClubs, setFilteredClubs] = useState([]); // Danh sách được lọc theo từ khóa
    const [loading, setLoading] = useState(true);

    const fetchClub = async () => {
      try {
        setLoading(true);
        const response = await getMyClubJoined(userId);
        if (response.data && response.data.success) {
          if (response.data.listClub && Array.isArray(response.data.listClub.$values)) {
            const fetchedClubs = response.data.listClub.$values;
            setClubs(fetchedClubs);
            setFilteredClubs(fetchedClubs); // Khởi tạo filteredClubs với tất cả clubs
            console.log("Data:", fetchedClubs);
          } else {
            console.error('Dữ liệu không phải là một mảng:', response.data);
            toast.error('Dữ liệu sự kiện không đúng định dạng');
          }
        } else {
          
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchClub();
      // Thiết lập interval để tự động fetch dữ liệu mỗi 30 giây
      const interval = setInterval(() => {
        fetchClub();
      }, 30000);

      // Cleanup function
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
    <Footer />
  </div>
);
}

export default ClubPage;