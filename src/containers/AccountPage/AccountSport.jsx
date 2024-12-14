import React from "react";
import styles from './AccountSports.module.css';
import ProfileCard from './ProfileCard';
import Hearder from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
function AccountSport() {
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
                                <h1 className={styles.heading}>Thể thao</h1>
                                <p className={styles.subheading}>Luôn cập nhật hồ sơ thể thao của bạn để bạn có thể tìm thấy các</p>
                                <p className={styles.subheading}>hoạt động và bạn bè có liên quan.</p>
                            </header>
                            <div className={styles.cardGrid} >
                                <article className={styles.card}>
                                    <h2 className={styles.cardTitle}>Đá Bóng</h2>
                                </article>
                                <article className={styles.card}  style={{cursor: "pointer"}} onClick={() => navigate('/addsportsacc')}>
                                    <h2 className={styles.cardTitle} style={{color:"blue"}}>Thêm</h2>
                                </article>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AccountSport;