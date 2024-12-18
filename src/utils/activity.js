import axios from "axios";
import configuration from "./config";
const getAllActivity = (userId) =>
    axios(
      configuration({
        method: "get",
        path: "/Activity/getAllActivity",
        params: { userId },
      })
    );
    const getAllActivityClub = (clubId) =>
      axios(
        configuration({
          method: "get",
          path: "/Activity/getAllActivityClub",
          params: { clubId },
        })
      );
      const getDetailActivityClub = (activityclubId) =>
        axios(
          configuration({
            method: "get",
            path: `/Activity/getActivityDetailsClub/${activityclubId}`,
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
const getDetailActivity = (activityId) =>
      axios(
        configuration({
          method: "get",
          path: `/Activity/getActivityDetails/${activityId}`,
        })
      );
const getMyActivity = (userId) =>
  axios(
    configuration({
      method: "get",
      path: `/Activity/getMyActivity`,
      params: { userId },
    })
  );      
const getMemberActivity = (activityId) =>
        axios(
          configuration({
            method: "get",
            path: `/Activity/getMemberActivity/${activityId}`,
          })
        );
        const getMemberActivityClub = (activityclubId) =>
          axios(
            configuration({
              method: "get",
              path: `/Activity/getMemberActivityClub/${activityclubId}`,
            })
          );
        
const getrequestJoinActivity = (activityId) =>
  axios(
    configuration({
      method: "get",
      path: `/Activity/getrequestJoinActivity/${activityId}`,
    })
  );
  const acceptrequestJoinActivity = (RequestJoinActivityId, UserId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/acceptrequestJoinActivity",
        data: {
          RequestJoinActivityId, UserId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const cancelrequestJoinActivity = (RequestJoinActivityId, UserId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/cancelrequestJoinActivity",
        data: {
          RequestJoinActivityId, UserId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const createActivity = (eventData) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/createActivity",
        data:
          eventData,
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const createActivityClub = (eventData) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/createActivityClub",
        data:
          eventData,
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const uppdateActivity = (eventData) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/uppdateActivity",
        data:
          eventData,
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const uppdateActivityClub = (eventData) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/uppdateActivityClub",
        data:
          eventData,
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const requestJoinActivity = (userId, activityId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/requestJoinActivity",
        data: {
          userId, activityId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const JoinActivityClub = (userId, clubId, activityclubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/joinActivityClub",
        data: {
          userId, clubId, activityclubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const getInforJoinned = (userId, clubId, activityclubId) => {
    return axios(
      configuration({
        method: "POST",
        path: "/Activity/getInforJoinned",
        data: {
          userId, clubId, activityclubId
        },
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };
  const getNameActivity = () =>{
    return axios(
      configuration({
        method: "get",
        path: "/Activity/getNameActivity",
      })
    )
      .then((result) => result)
      .catch((error) => error);
  };

  
export {
    getAllActivity,
    getDetailActivity,
    getMemberActivity,
    getActivityJoined,
    getMyActivity,
    getrequestJoinActivity,
    acceptrequestJoinActivity,
    cancelrequestJoinActivity,
    createActivity,
    uppdateActivity,
    requestJoinActivity,
    getAllActivityClub,
    getDetailActivityClub,
    uppdateActivityClub,
    getMemberActivityClub,
    createActivityClub,
    JoinActivityClub,
    getInforJoinned,
    getNameActivity
  };