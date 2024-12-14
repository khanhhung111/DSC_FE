import { useState } from "react";
import styles from "./SignUpForm.module.css";
import { toast } from 'react-toastify';
import { signUp } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';
function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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

      if (password !== confirmPassword) {
        setError("Mật khẩu không trùng khớp");
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
      const response = await signUp({
        fullname,
        email,
        password
      });
      console.log("response",response);
      if (response.data && response.data.success === true) {
        toast.success("Đăng ký thành công!", {
          autoClose: 1000 // 1 giây
        });
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        throw new Error(response.data?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<section className={styles.signUpSection}>
      <h1 className={styles.title}>Đăng ký</h1>
      <p className={styles.description}>
        Đăng ký tài khoản để truy cập vào các tính năng của chúng tôi
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label htmlFor="fullname" className={styles.label}>
            Họ và tên
          </label>
          <input
            type="text"
            id="fullname"
            className={styles.input}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            aria-required="true"
            placeholder="Nhập họ và tên của bạn"
          />
        </div>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Xác nhận lại mật khẩu
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setTouchedConfirmPassword(true);
              }}
              required
              aria-required="true"
            />
            <button type="button" onClick={toggleShowConfirmPassword} className={styles.showPasswordButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1a62ef3ed7cff6ab291ea8a2ab7e4f2f48529c866d679ec19393f4477036c8?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
                alt="Show password"
              />
              <span>{showConfirmPassword ? "Ẩn" : "Hiện"}</span>
            </button>
          </div>
          {touchedConfirmPassword && confirmPassword !== password && (
            <p className={styles.errorMessage}>Trùng khớp với mật khẩu trên</p>
          )}
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Đăng ký
        </button>
      </form>
      
      <p className={styles.loginPrompt}>
        Bạn đã có tài khoản?{" "}
        <a href="/login" className={styles.loginLink}>
          Đăng nhập
        </a>
      </p>
    </section>
  );
}


export default SignUpForm;