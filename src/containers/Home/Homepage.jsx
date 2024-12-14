import React from 'react';
import Testimonials from '../../components/Testimonials/Testimonials';
import styles from './Homepage.module.css'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Hearder'
import Hero from '../../components/Hero/Hero';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />
      <main>
        <Hero />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;