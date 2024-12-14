import axios from "axios";
import configuration from "./config";

const getNotificationList = ({ userId, role }) =>
  axios(
    configuration({
      method: "get",
      path: `/${role}/getMyNoti/${userId}`,
    })
  );

export { getNotificationList };
