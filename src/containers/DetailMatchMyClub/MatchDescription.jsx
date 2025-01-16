import React from "react";
import styles from './MatchDescription.module.css';

function MatchDescription({matchData}) {
  const data = matchData[0];
  return (
    <section className={styles.matchDescription}>
      <h2 className={styles.descriptionTitle}>QUY ĐỊNH</h2>
      <h3>{data.description}</h3>
    </section>
  );
}

export default MatchDescription;