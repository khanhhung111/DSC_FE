
import React from "react";
import HeroSection from "./HeroSection";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import styles from "./ClubPage.module.css";
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
