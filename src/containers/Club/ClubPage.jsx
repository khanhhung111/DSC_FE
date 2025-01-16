import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { getAllClub } from "../../utils/club";
import { toast } from "react-toastify";

function ClubPage() {
  const [clubs, setClubs] = useState([]); // Danh sách tất cả câu lạc bộ
  const [filteredClubs, setFilteredClubs] = useState([]); // Danh sách được lọc theo từ khóa
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const response = await getAllClub(userId);
        if (response.data && response.data.success) {
          const data = response.data.listClub?.$values || [];
          setClubs(data); // Lưu danh sách đầy đủ
          setFilteredClubs(data); // Khởi tạo danh sách được lọc
        } else {
          toast.error("Không thể tải danh sách câu lạc bộ");
        }
      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi khi tải danh sách");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleSearch = (keyword) => {
    // Lọc danh sách câu lạc bộ theo từ khóa
    const lowercasedKeyword = keyword.toLowerCase();
    const filtered = clubs.filter((club) =>
      club.clubName.toLowerCase().includes(lowercasedKeyword)
    );
    setFilteredClubs(filtered);
  };

  return (
    <div>
      <Hearder />
      <main className={styles.clubPage}>
        <HeroSection />
        <SearchBar onSearch={handleSearch} />
        <section className={styles.clubListSection}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ClubList clubs={filteredClubs} />
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default ClubPage;
