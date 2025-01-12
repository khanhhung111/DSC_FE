import axios from "axios";
import configuration from "./config";

const signUp = ({
  fullname,
  email,
  password
}) => {
  return axios(
    configuration({
      method: "POST",
      path: "/Authen/Register",
      data: {
        fullname,
        email,
        password
      },
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const logingoogle = async () => {
  try {
    const response = await axios(
      configuration({
        method: "get",
        path: "/Authen/login-google",
      })
    );
    
    // Kiểm tra và lấy URL trực tiếp từ response.data
    if (response.data && typeof response.data === 'string') {
      window.location.href = response.data;
    } else {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

const login = (email, password) => {
  return axios(
    configuration({
      method: "post",
      path: "/Authen/Login",
      data: { email, password },
    })
  )
    .then((result) => result.data)
    .catch((error) => error);
};
const changePass = ({ data }) => {
  return  axios(
      configuration({
        method: 'post',
        path: '/customer/changePassword',
        data: data,
      })
    );
}
const changePassGua = ({ data }) =>
  axios(
    configuration({
      method: 'post',
      path: '/guard/changePassword',
      data: data,
    })
  );
export { signUp, login, changePass, changePassGua,logingoogle };
