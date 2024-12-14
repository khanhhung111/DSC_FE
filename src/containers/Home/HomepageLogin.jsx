import React from 'react';
import Testimonials from '../../components/Testimonials/Testimonials';
import styles from './Homepage.module.css'
import Footer from '../../components/Footer/Footer'
import HeaderLogin from '../../components/Header/Hearder'
import Hero from '../../components/Hero/Hero';

function HomePageLogin() {
  return (
    <div className={styles.homePage}>
      <HeaderLogin />
      <main>
        <Hero />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default HomePageLogin;