import axios from "axios";
import configuration from "./config";

const getInfo = ({
  email,
}) => {
  return axios(
    configuration({
      method: "POST",
      path: "/User/getinfor",
      data: {
        email,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const updateInfo = ({
  email,
  updatedInfo,
}) => {
  return axios(
    configuration({
      method: "POST",
      path: "/User/updateinfor",
      data: { email, ...updatedInfo },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const updateInfoImg = ({ email, updatedInfo, file }) => {
  const formData = new FormData();
  formData.append("email", email);

  // Thêm các thông tin cập nhật vào formData
  Object.keys(updatedInfo).forEach((key) => {
    formData.append(key, updatedInfo[key]);
  });

  // Chỉ thêm file nếu có
  if (file) {
    formData.append("file", file);
  } else {
    // Thêm một file rỗng hoặc null để tránh lỗi required
    formData.append("file", new Blob(), "");
  }

  return axios(
    configuration({
      method: "POST",
      path: "/User/updateinforimg",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};

const changePassword = ({
  Email,
  Password,
  NewPassword,
}) => {
  return axios(
    configuration({
      method: "POST",
      path: "/User/changepassword",
      data: { Email, Password, NewPassword },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};

const getMySport = ({
  userId,
}) => {
  return axios(
    configuration({
      method: "POST",
      path: "/User/getMySport",
      data: {
        userId,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const getSportName = () =>
  axios(
    configuration({
      method: "get",
      path: "/User/getSportName",
    }),
  );
const getLevel = () =>
  axios(
    configuration({
      method: "get",
      path: "/User/getLevel",
    }),
  );
const AddSportName = ({ userId, SportId, LevelId }) => {
  return axios(
    configuration({
      method: "POST",
      path: "/User/AddSportName",
      data: {
        userId,
        SportId,
        LevelId,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};

export {
  AddSportName,
  changePassword,
  getInfo,
  getLevel,
  getMySport,
  getSportName,
  updateInfo,
  updateInfoImg,
};
