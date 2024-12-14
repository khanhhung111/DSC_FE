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
export { signUp, login, changePass, changePassGua };
