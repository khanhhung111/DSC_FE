import React from 'react';
import styles from './ResultMatch.module.css';
import EventCard from './EventCard';
import MatchDetails from './MatchDetails';
import DetailsResult from './DetailsResult';
import Footer from "../../components/Footer/Footer"
import HeaderLogin from "../../components/Header/Hearder"

function ResultMatch() {
  return (
    <section className={styles.mainContent}>
        <HeaderLogin />
        <MatchDetails/>
      <EventCard />
      <DetailsResult />
      <Footer />
    </section>
  );
};

export default ResultMatch;