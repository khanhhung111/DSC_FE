import React from "react";
import styles from './MatchDescription.module.css';

function MatchDescription({matchData}) {
  const data= matchData;
  return (
    <section className={styles.matchDescription}>
      
      <h3 className={styles.descriptionTitle}>Luật của Câu Lạc Bộ</h3>
      <ul>
        {data.rules}
      </ul>
    </section>
  );
}

export default MatchDescription;
