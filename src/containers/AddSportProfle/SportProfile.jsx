import React, { useState, useEffect } from 'react';
import HeaderLogin from '../../components/Header/Hearder';
import Sidebar from './Sidebar'
import AccountDetails from './AddSport'
import Footer from '../../components/Footer/Footer';
import styles from './SportProfile.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SportProfile() {
  const [userData, setUserData] = useState({
    fullname: '',
    email: ''
  });

  useEffect(() => {
    const fullname = localStorage.getItem('fullName');
    const email = localStorage.getItem('userEmail');
    
    setUserData({
      fullname: fullname || '',
      email: email || ''
    });
  }, []);

  console.log('userData:', userData); // Thêm log để kiểm tra state

  return (
    <>
    <div className={styles.accountProfile}>
      <HeaderLogin />
      <main className={styles.mainContent}>
        <Sidebar fullname={userData.fullname} />
        <AccountDetails email={userData.email} />
      </main>
      <Footer />
    </div>
     <ToastContainer 
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
 </>
  );
}

export default SportProfile;