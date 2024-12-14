import React from "react";
import styles from "./LocationMap.module.css";

function LocationMap() {
  return (
    <section className={styles.locationContainer}>
      <h2 className={styles.locationTitle } style={{paddingLeft:'150px'}}>Vị trí sân:</h2>
      <div className={styles.mapContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4a125ea2290e657dab09ab067274b3c396a34f585fc46084264f04576175fdd?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
          alt="Location map"
          className={styles.mapImage}
        />
      </div>
    </section>
  );
}

export default LocationMap;