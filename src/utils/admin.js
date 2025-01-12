import axios from "axios";
import configuration from "./config";

const getCustomerList = () =>
  axios(
    configuration({
      method: "get",
      path: "/admin/listCustomer",
    }),
  );
const activateClub = (clubId) => {
  return axios(
    configuration({
      method: "POST",
      path: "/admin/activateClub",
      data: {
        clubId,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const updateInfoCustomer = (
  updatedPayload,
) => {
  return axios(
    configuration({
      method: "POST",
      path: "/Admin/UpdateInforcustomer",
      data: updatedPayload,
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const getClubList = () =>
  axios(
    configuration({
      method: "get",
      path: "/admin/getClubList",
    }),
  );

const getClubById = (clubId) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getClubById/${clubId}`,
    }),
  );
const getClubMembers = (clubId) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getMemberClub/${clubId}`,
    }),
  );

const getTournamentList = () =>
  axios(
    configuration({
      method: "get",
      path: "/admin/GetAllTournament",
    }),
  );

const getTournamentById = (clubId) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getClubById/${clubId}`,
    }),
  );
const getTournamentMembers = (tournamentId) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getListTeam/${tournamentId}`,
    }),
  );
const getCustomerById = ({ customerId }) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getCustomerById/${customerId}`,
    }),
  );

const searchByNameUser = (name) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/searchCustomer?q=${name}`,
    }),
  );
const searchByNameClub = (name) =>
  axios(
    configuration({
      method: "get",
      path: `/admin/searchClub?q=${name}`,
    }),
  );
const searchByNameTournament = (name) =>
    axios(
      configuration({
        method: "get",
        path: `/admin/searchTournament?q=${name}`,
      }),
    );
const stopClub = (clubId) => {
  return axios(
    configuration({
      method: "POST",
      path: "/admin/stopClub",
      data: {
        clubId,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const outClub = (clubId, userId) => {
  return axios(
    configuration({
      method: "POST",
      path: "/admin/outClub",
      data: {
        clubId,
        userId,
      },
    }),
  )
    .then((result) => result)
    .catch((error) => error);
};
const getListMember = (teamId) =>
  axios(
    configuration({
      method: "post",
      path: `/admin/getListMember/${teamId}`,
    }),
  );
const deleteTournament = (tournamentId) =>
  axios(
    configuration({
      method: "post",
      path: `/admin/deleteTournament/${tournamentId}`,
    }),
  );
  const getTournamentbyMonth = (time) => {
    const path = time ? `/admin/getTournamentbyMonth/${time}` : `/admin/getTournamentbyMonth`; // Nếu time null, không thêm tham số
    return axios(
      configuration({
        method: "get",
        path,
      }),
    );
  };
  
const getTotalTournaments = () =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getTotalTournaments`,
    }),
  );
const getTotalUsers = () =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getTotalUsers`,
    }),
  );
const getTotalUsersActive = () =>
    axios(
      configuration({
        method: "get",
        path: `/admin/getTotalUsersActive`,
      }),
);
const getFundAdmin = () =>
  axios(
    configuration({
      method: "get",
      path: `/admin/getFundAdmin`,
    }),
);
export {
  activateClub,
  deleteTournament,
  getClubById,
  getClubList,
  getClubMembers,
  getCustomerById,
  getCustomerList,
  getListMember,
  getTotalTournaments,
  getTotalUsers,
  getTournamentById,
  getTournamentbyMonth,
  getTournamentList,
  getTournamentMembers,
  outClub,
  searchByNameClub,
  searchByNameUser,
  stopClub,
  updateInfoCustomer,
  getTotalUsersActive,
  getFundAdmin,
  searchByNameTournament  
};
