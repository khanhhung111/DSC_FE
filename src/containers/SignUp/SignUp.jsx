import React from "react";
import SignUpForm from "./SignUpForm";
import styles from "./SignUp.module.css";
import Header from "../../components/Header/Hearder";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const socialButtons = [
    {
      name: "Facebook",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b938d459ab07f076de5460d2a50b950a2c66ae6f777acddb7252066065529b2?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac",
      text: "Sign up with Facebook",
    },
    {
      name: "Google",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/202a80eb418dc9ecd2760ef5ef914f979adfb5b7d3bc976c3f0e387d4bf8ff84?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac",
      text: "Sign up with Google",
    },
  ];
  return (
    <>
      <main className={styles.signUpPage}>
        <Header />
        <section className={styles.content}>
          <div className={styles.imageColumn}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/255f5eca8824e2d619f5f131553022d6e189910b11a9c89b765ec9a6d0cd580f?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              alt="Sign up illustration"
              className={styles.signUpImage}
            />
          </div>
          <div className={styles.formColumn}>
            <SignUpForm />
            <section className={styles.socialSignUp}>
              {socialButtons.map((button, index) => (
                <button key={index} className={styles.socialButton}>
                  <img src={button.icon} alt={`${button.name} icon`} className={styles.socialIcon} />
                  <span>{button.text}</span>
                </button>
              ))}
            </section>
          </div>
        </section>
      </main>
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

export default SignUp;