import axios from "axios";
import configuration from "./config";
const createTournament = async ({ tournamentData, file }) => {
  try {
    const formData = new FormData();
    Object.keys(tournamentData).forEach((key) => {
      formData.append(key, tournamentData[key]);
    });
    if (file) {
      formData.append("file", file);
    } else {
      // Thêm một file rỗng hoặc null để tránh lỗi required
      formData.append("file", new Blob(), "");
    }
    const response = await axios(configuration({
      method: "POST",
      path: "/Tournament/createTournament",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }));
    return response;
  } catch (error) {
    throw error; // Để component xử lý lỗi
  }
};

const GetAllTournament = (userId) =>
  axios(
    configuration({
      method: "get",
      path: "/Tournament/GetAllTournament",
      params: { userId },
    }),
  );
const GetMyTournament = (userId) =>
  axios(
    configuration({
      method: "get",
      path: "/Tournament/GetMyTournament",
      params: { userId },
    }),
  );
const getTournamentDetails = (tournamentId) =>
  axios(
    configuration({
      method: "get",
      path: `/Tournament/getTournamentDetails/${tournamentId}`,
    }),
  );
const deleteTournament = (tournamentId) =>
  axios(
    configuration({
      method: "post",
      path: `/Tournament/deleteTournament/${tournamentId}`,
    }),
  );

const updateTounarment = async ({ tournamentId, tournamentData, file }) => {
  try {
    const formData = new FormData();

    Object.keys(tournamentData).forEach((key) => {
      formData.append(key, tournamentData[key]);
    });

    if (file) {
      formData.append("file", file);
    }

    const response = await axios(configuration({
      method: "POST",
      path: `/Tournament/updateTounarment/${tournamentId}`,
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
const addMemberTeam = async ({teamData, file}) => {
  try {
    const formData = new FormData();

    // Xử lý các trường dữ liệu đơn giản
    formData.append('userId', teamData.userId);
    formData.append('tournamentId', teamData.tournamentId);
    formData.append('teamName', teamData.teamName);

    // Xử lý mảng players
    teamData.players.forEach((player, index) => {
      formData.append(`players[${index}][name]`, player.name);
      formData.append(`players[${index}][number]`, player.number);
    });

    if (file) {
      formData.append("file", file);
    }

    const response = await axios(configuration({
      method: "POST",
      path: `/Tournament/addMemberTeam`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }));
    return response;
  } catch (error) {
    throw error;
  }
}
const getAllTournamentJoin = (userId) =>
  axios(
    configuration({
      method: "get",
      path: "/Tournament/GetAllTournamentJoin",
      params: { userId },
    }),
  );
const getTeamTournament = (tournamentId) =>
  axios(
    configuration({
      method: "get",
      path: `/Tournament/getTeamTournament/${tournamentId}`,
    }),
  );
const saveTournamentResults = (data1) =>
  axios(
    configuration({
      method: "post",
      path: "/Tournament/saveTournamentResults",
      data: data1,
    }),
  );
  const  saveTournamentResultsTemp  = ({tournamentId, matches}) =>
    axios(
      configuration({
        method: "post",
        path: "/Tournament/saveTournamentResults",
        data: {tournamentId, matches},
      }),
    );
const getTournamentResults = (tournamentId) =>
  axios(
    configuration({
      method: "get",
      path: `/Tournament/getTournamentResults/${tournamentId}`,
    }),
  );

const getListTeam = (tournamentId) =>
  axios(
    configuration({
      method: "get",
      path: `/Tournament/getListTeam/${tournamentId}`,
    }),
  );

const getListMember = (teamId) =>
  axios(
    configuration({
      method: "post",
      path: `/Tournament/getListMember/${teamId}`,
    }),
  );
const createPayment = async (TournamentId,Amount) =>{
  try{
    const formData = new FormData();
    formData.append('TournamentId', TournamentId);
    formData.append('Amount', Amount);
  const response = await axios(configuration({
    method: "POST",
    path: `/Vnpay/create_payment_url`,
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
        path: `/Vnpay/vnpay_ipn?${params}`, // Đã bỏ dấu / trước params vì params đã có ? rồi
      })
    );
    return response.data;
  } catch (error) {
    console.error("Payment API Error:", error);
    throw error;
  }
};
const getAllTournamentNames = () =>{
  return axios(
    configuration({
      method: "get",
      path: "/Tournament/getAllTournamentNames",
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const PaymentforTournament = () =>{
  return axios(
    configuration({
      method: "post",
      path: "/Tournament/PaymentforTournament",
    })
  )
    .then((result) => result)
    .catch((error) => error);
}

  
    // axios(
    //   configuration({
    //     method: "post",
    //     path: "/Vnpay/create-payment",
    //     data: TournamentId,Amount
    //   }),
    // );
  
export {
  addMemberTeam,
  createTournament,
  deleteTournament,
  GetAllTournament,
  getAllTournamentJoin,
  getListMember,
  getListTeam,
  GetMyTournament,
  getTeamTournament,
  getTournamentDetails,
  getTournamentResults,
  saveTournamentResults,
  updateTounarment,
  createPayment,
  setPayment,
  saveTournamentResultsTemp,
  getAllTournamentNames,
  PaymentforTournament
};
