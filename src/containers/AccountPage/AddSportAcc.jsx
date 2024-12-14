import React from "react";
import styles from './AccountSports.module.css';
import ProfileCard from './ProfileCard';
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
function AddSportAcc() {
    const navigate = useNavigate();
    return (
        
        <div>
            <Hearder />
            <main className={styles.accountPage}>
                <div className={styles.contentWrapper}>

                    <aside className={styles.sidebar}>
                        <ProfileCard />
                    </aside>
                    <section className={styles.mainContent}>
                        <div className={styles.accountSection}>
                            <header className={styles.sectionHeader}>
                                <h1 className={styles.heading}>Chọn môn thể thao</h1>
                                <h2 className={styles.subheading}>Thể thao của bạn:</h2>
                                <div className={styles.cardGrid} >
                                <article className={styles.card}>
                                    <h2 className={styles.cardTitle}>Đá Bóng</h2>
                                </article>
                                </div>
                            </header>
                            

                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AddSportAcc;
