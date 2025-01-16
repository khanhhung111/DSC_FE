import { useState, React } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from 'react-router-dom';
import { login } from "../../utils/auth";
import { toast } from 'react-toastify';


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const validateForm = () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setError("Email không hợp lệ");
        return false;
      }

      if (password.length < 8) {
        setError("Mật khẩu phải có ít nhất 8 ký tự");
        return false;
      }
      setError("");
      return true;
    } catch (error) {
      setError("Có lỗi xảy ra khi kiểm tra form");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await login(email, password);
      console.log("response", response);
      if (response && response.success) {
        if (response.roleId === "Admin") {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('Fund', response.Fund);
          toast.success("Đăng nhập thành công!", { autoClose: 1000 });
          setTimeout(() => {
            navigate('/admin'); // Navigate to admin page
          }, 1200);
        } else {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('fullName', response.fullName);
          localStorage.setItem('avatar', response.avatar);
          toast.success("Đăng nhập thành công!", { autoClose: 1000 });
          setTimeout(() => {
            navigate('/'); // Navigate to user page
          }, 1200);
        }
      } else if (response && response.response.data.success === false) {
        throw new Error(response.response?.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className={styles.LoginSection}>
      <h1 className={styles.title}>Đăng Nhập</h1>
      <p className={styles.description}>
        Đăng nhập tài khoản để truy cập vào các tính năng của chúng tôi
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Địa chỉ Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Mật khẩu
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouchedPassword(true);
              }}
              required
              aria-required="true"
              minLength="8"
            />
            <button type="button" onClick={toggleShowPassword} className={styles.showPasswordButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1a62ef3ed7cff6ab291ea8a2ab7e4f2f48529c866d679ec19393f4477036c8?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
                alt="Show password"
              />
              <span>{showPassword ? "Ẩn" : "Hiện"}</span>
            </button>
          </div>
          {touchedPassword && password.length < 8 && (
            <p className={styles.errorMessage}>Mật khẩu 8 ký tự trở lên</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Đăng Nhập
        </button>
      </form>
      <p className={styles.loginPrompt}>
        Bạn chưa có tài khoản?{" "}
        <span
          className={styles.loginLink}
          onClick={() => navigate('/signup')}
          style={{ cursor: 'pointer' }}
        >
          Đăng kí
        </span>
      </p>
    </section>
  );
}

export default LoginForm;