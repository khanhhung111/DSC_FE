import React from "react";
import styles from './AccountPage.module.css';
import ProfileCard from './ProfileCard';
import Header from "../../components/Header/Hearder";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
function AccountPage() {
    const navigate = useNavigate();
    return (
        
        <div>
            <Header />
            <main className={styles.accountPage}>
                <div className={styles.contentWrapper}>

                    <aside className={styles.sidebar}>
                        <ProfileCard />
                    </aside>
                    <section className={styles.mainContent}>
                        <div className={styles.accountSection}>
                            <header className={styles.sectionHeader}>
                                <h1 className={styles.heading}>Tài khoản</h1>
                                <p className={styles.subheading}>Quản lý tất cả các cài đặt của bạn.</p>
                            </header>
                            <div className={styles.cardGrid} >
                                <article className={styles.card} onClick={() => navigate('/my-profile')}>
                                    <h2 className={styles.cardTitle}>Hồ sơ</h2>
                                    <p className={styles.cardDescription}>Cập nhật thông tin cá nhân</p>
                                </article>
                                <article className={styles.card} onClick={() => navigate('/sportprofile')}>
                                    <h2 className={styles.cardTitle}>Thể thao</h2>
                                    <p className={styles.cardDescription}>Quản lý thể thao của bạn</p>
                                </article>
                                <article className={styles.card} onClick={() => navigate('/security')} style={{paddingTop:'30px'}}>
                                    <h2 className={styles.cardTitle}>Đăng nhập và bảo mật</h2>
                                    <p className={styles.cardDescription}>Cập nhật mật khẩu và bảo mật tài khoản của bạn</p>
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

export default AccountPage;