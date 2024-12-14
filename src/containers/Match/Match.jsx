import React from "react";
import HeaderLogin from "../../components/Header/Hearder"
import Footer from "../../components/Footer/Footer"
import ParticipantList from "./ParticipantList";
import MatchDetails from "./MatchDetails";
import styles from "./Match.module.css";

function Match() {
  return (
    <div>
    <main className={styles.matchContainer}>
      <HeaderLogin />
      <MatchDetails />
      <ParticipantList />
    </main>
        <Footer />
    </div>

  );
}

export default Match;