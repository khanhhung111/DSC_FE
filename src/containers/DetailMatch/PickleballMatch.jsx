import React from "react";
import HeaderLogin from "../../components/Header/Hearder"
import MatchDetails from "./MatchDetails";
import ActionButtons  from "./ActionButtons";
import MatchDescription from "./MatchDescription";
import LocationMap from "./LocationMap";
import styles from "./PickleballMatch.module.css";
import Footer from "../../components/Footer/Footer"

function PickleballMatch() {
  return (
    <main className={styles.pickleballMatch}>
      <HeaderLogin />
      <section className={styles.content}>
        <MatchDetails />
        <ActionButtons />
        <LocationMap />
        <MatchDescription />
        
        </section>
      <Footer />
    </main>
  );
}

export default PickleballMatch;