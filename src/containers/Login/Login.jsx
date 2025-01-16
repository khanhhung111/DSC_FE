import { useState ,React} from "react";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";
import Header from "../../components/Header/Hearder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { logingoogle } from '../../utils/auth';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
      const [error, setError] = useState('');
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

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        givenName: decoded.given_name,
        email: decoded.email,
        name: decoded.name
      };

    console.log("userData",userData);
    try{
      const response = await logingoogle(userData);
      console.log(response);
        if (response && response.success) {
        // Handle successful login
        if(response.roleId === "Admin") {
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('Fund', response.Fund);
          toast.success("Đăng nhập thành công!", { autoClose: 1000 });
          setTimeout(() => {
            navigate('/admin'); // Navigate to admin page
          }, 1200);
        } else {
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('fullName', response.fullName);
          localStorage.setItem('avatar', response.avatar);
          toast.success("Đăng nhập thành công!", { autoClose: 1000 });
          setTimeout(() => {
            navigate('/'); // Navigate to user page
          }, 1200);
        }
      } else if (response && response.response.data.success === false){
        throw new Error(response.response?.data.message || "Có lỗi xảy ra");
      }
    }
    catch (error) {
          console.error('Error details:', error);
          const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra";
          setError(errorMessage);
          toast.error(errorMessage);
        }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <main className={styles.LoginPage}>
        <Header />
        <section className={styles.content}>
          <div className={styles.imageColumn}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/255f5eca8824e2d619f5f131553022d6e189910b11a9c89b765ec9a6d0cd580f?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              alt="Sign up illustration"
              className={styles.LoginImage}
            />
          </div>
          <div className={styles.formColumn}>
            <LoginForm />
            {/* <section className={styles.socialLogin}>
              {socialButtons.map((button, index) => (
                button.name === "Google" ? (
                  <GoogleLogin
                    key={index}
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    useOneTap
                    render={(renderProps) => (
                      <button 
                        className={styles.socialButton}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <img src={button.icon} alt={`${button.name} icon`} className={styles.socialIcon} />
                        <span>{button.text}</span>
                      </button>
                    )}
                  />
                ) : (
                  <button 
                    key={index} 
                    className={styles.socialButton}
                    disabled={true}
                  >
                    <img src={button.icon} alt={`${button.name} icon`} className={styles.socialIcon} />
                    <span>{button.text}</span>
                  </button>
                )
              ))}
            </section> */}
            <section style={{ width: '280px', margin: '20px 0' }}>
  <GoogleLogin
    onSuccess={handleGoogleLoginSuccess}
    onError={handleGoogleLoginError}
    useOneTap
    render={(renderProps) => (
      <button 
        className={styles.socialButton}
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        style={{ 
          width: '100%', 
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '10px 16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
      >
        <img 
          src="/assets/icons/google.png" 
          alt="Google icon" 
          className={styles.socialIcon} 
        />
        <span>Tiếp tục với Google</span>
      </button>
    )}
  />
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

export default Login;