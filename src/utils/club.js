import axios from "axios";
import configuration from "./config";
const getAllClub = (userId) =>
    axios(
      configuration({
        method: "get",
        path: "/Club/getAllClub",
        params: { userId },
      })
    );
const getActivityJoined = (userId) =>
      axios(
        configuration({
          method: "get",
          path: "/Activity/getActivityJoined",
          params: { userId },
        })
      );
const getDetailClub = (clubId) =>
      axios(
        configuration({
          method: "get",
          path: `/Club/getDetailClub/${clubId}`,
        })
      );
const getMyClub = (userId) =>
  axios(
    configuration({
      method: "get",
      path: `/Club/getMyClub`,
      params: { userId },
    })
  );
  const updateStatusClub = (clubId) => {
    return axios(
      configuration({
        method: "POST",
        path: `/Club/updateStatusClub/${clubId}`,
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const getMyClubJoined = (userId) =>
    axios(
      configuration({
        method: "get",
        path: `/Club/getClubJoined`,
        params: { userId },
      })
    );         
const getMemberClub = (ClubId) =>
        axios(
          configuration({
            method: "get",
            path: `/Club/getMemberClub/${ClubId}`,
          })
        );
const getrequestJoinClub = (clubId) =>
  axios(
    configuration({
      method: "get",
      path: `/Club/getrequestJoinClub/${clubId}`,
    })
  );
  const acceptrequestJoinClub = (requestClubId, UserId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/acceptrequestJoinClub",
        data: {
          requestClubId, UserId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const cancelrequestJoinClub = (requestClubId, UserId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/cancelrequestJoinClub",
        data: {
          requestClubId, UserId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const createClub = async ({ sendformData, file }) => {
    try {
      const formData = new FormData();
  
      Object.keys(sendformData).forEach((key) => {
        formData.append(key, sendformData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Club/createClub`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }));
      return response;
    } catch (error) {
      throw error;
    }
  };
  const requestJoinClub = (userId, clubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/requestJoinClub",
        data: {
          userId, clubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const updateClub = async ({ clubId, clubData, file }) => {
    try {
      const formData = new FormData();
  
      Object.keys(clubData).forEach((key) => {
        formData.append(key, clubData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Club/updateClub/${clubId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }));
      return response;
    } catch (error) {
      throw error;
    }
  };
  const stopClub = (clubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/stopClub",
        data: {
          clubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const activateClub = (clubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/activateClub",
        data: {
          clubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const expiredClub = (clubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/expiredClub",
        data: {
          clubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  
  const outClub = (clubId, userId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Club/outClub",
        data: {
          clubId, userId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const getAllClubNames = () =>{
    return axios(
      configuration({
        method: "get",
        path: "/Club/getAllClubNames",
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const createPayment = async (TournamentId,Amount) =>{
    try{
      const formData = new FormData();
      formData.append('TournamentId', TournamentId);
      formData.append('Amount', Amount);
    const response = await axios(configuration({
      method: "POST",
      path: `/Vnpay/create_payment_url_clb`,
      data: formData,
    }));
    return response;
  } catch (error) {
    throw error;
  }
  }
  const setPayment = async (params) => {
    try {
      const response = await axios(
        configuration({
          method: "get",
          path: `/Vnpay/vnpay_ipn_club?${params}`, // Đã bỏ dấu / trước params vì params đã có ? rồi
        })
      );
      return response.data;
    } catch (error) {
      console.error("Payment API Error:", error);
      throw error;
    }
  };
  const createPaymentClub = async (TournamentId,Amount) =>{
    try{
      const formData = new FormData();
      formData.append('TournamentId', TournamentId);
      formData.append('Amount', Amount);
    const response = await axios(configuration({
      method: "POST",
      path: `/Vnpay/create_payment_clb`,
      data: formData,
    }));
    return response;
  } catch (error) {
    throw error;
  }
  };
  const deleteClub = (clubId) =>
    axios(
      configuration({
        method: "post",
        path: `/Club/deleteClub/${clubId}`,
      }),
    );
    const PaymentforClub = () =>{
      return axios(
        configuration({
          method: "post",
          path: "/Club/PaymentforClub",
        })
      )
        .then((result) => result)
        .catch((error) => error);
    }
export {
    getAllClub,
    getDetailClub,
    getMemberClub,
    getActivityJoined,
    getMyClub,
    getrequestJoinClub,
    acceptrequestJoinClub,
    cancelrequestJoinClub,
    createClub,
    updateClub,
    requestJoinClub,
    stopClub,
    activateClub,
    getMyClubJoined,
    outClub,
    getAllClubNames,
    updateStatusClub,
    createPayment,
    setPayment,
    expiredClub,
    createPaymentClub,
    deleteClub,
    PaymentforClub
  };