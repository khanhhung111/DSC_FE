import axios from "axios";
import configuration from "./config";

const customerPostReview = ({ data }) =>
  axios(
    configuration({
      method: "post",
      path: `/customer/feedback`,
      data,
    })
  );

const customerGetTopRank = () =>
  axios(
    configuration({
      method: "get",
      path: `/customer/gettoprank`,
    })
  );

export { customerPostReview, customerGetTopRank };
