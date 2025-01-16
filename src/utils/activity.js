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
  const createActivity = async ({eventData, file}) => {
    try {
      const formData = new FormData();
  
      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Activity/createActivity`,
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
  const createActivityClub = async ({eventData, file}) => {
    try {
      const formData = new FormData();
  
      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Activity/createActivityClub`,
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
  const uppdateActivity = async ({ eventData, file }) => {
    try {
      const formData = new FormData();
  
      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Activity/uppdateActivity`,
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
  const uppdateActivityClub = async ({ eventData, file }) => {
    try {
      const formData = new FormData();
  
      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });
  
      if (file) {
        formData.append("file", file);
      }
  
      const response = await axios(configuration({
        method: "POST",
        path: `/Activity/uppdateActivityClub`,
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
const GetResults = (activityId) => {
  return axios(
    configuration({
      method: "get",
      path: `/Activity/GetResults/${activityId}`,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const GetResultsClub = (activityClubId) => {
  return axios(
    configuration({
      method: "get",
      path: `/Activity/GetResultsClub/${activityClubId}`,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const UpdateScore = (payload) => {
  return axios(
    configuration({
      method: "put",
      path: `/Activity/UpdateResults`,
      data: payload,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const UpdateScoreClub = (payload) => {
  return axios(
    configuration({
      method: "put",
      path: `/Activity/UpdateResultsClub`,
      data: payload,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const GetComments = (activityId) => {
  return axios(
    configuration({
      method: "get",
      path: `/Activity/GetComments/${activityId}`,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const GetCommentsClub = (activityClubId) => {
  return axios(
    configuration({
      method: "get",
      path: `/Activity/GetCommentsClub/${activityClubId}`,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const AddComment = async (commentData) => {
  return axios(
    configuration({
      method: "put",
      path: `/Activity/AddComment`,
      data: commentData,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const AddCommentClub = async (commentData) => {
  return axios(
    configuration({
      method: "put",
      path: `/Activity/AddCommentClub`,
      data: commentData,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const DeleteComment = (commentId) => {
  return axios(
    configuration({
      method: "delete",
      path: `/Activity/DeleteComment/${commentId}`,
    })
  )
    .then((result) => result)
    .catch((error) => error);
};
const DeleteCommentClub = (commentId) => {
  return axios(
    configuration({
      method: "delete",
      path: `/Activity/DeleteCommentClub/${commentId}`,
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
    getNameActivity,
    GetResults,
    UpdateScore ,
    GetComments,
    AddComment,
    DeleteComment,
    GetResultsClub,
    GetCommentsClub,
    AddCommentClub,
    DeleteCommentClub,
    UpdateScoreClub
  };