
import React from "react";
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";

function ClubPage() {
  return (
    <div>
      <Hearder />
      <main className={styles.clubPage}>
        <HeroSection />
        <section className={styles.clubListSection}>
          <ClubList />
          <SearchBar />
        </section>
      </main>
      <Footer />
    </div>


  );
}

export default ClubPage;
