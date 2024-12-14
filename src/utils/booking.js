import axios from "axios";
import configuration from "./config";

const createNewBooking = ({ data, userId }) =>
  axios(
    configuration({
      method: "post",
      path: `/customer/createBooking/${userId}`,
      data,
    })
  );
const vnPayMent = ( data ) =>
  axios(
    configuration({
      method: 'post',
      path: `/order/create_payment_url`,
      data,
    })
  );

const getBooking = ({ userId, role }) =>
  axios(
    configuration({
      method: "get",
      path: `/${role}/getmyBooking/${userId}`,
    })
  );

const getDetailBookingOneDay = ({ params, role }) =>
  axios(
    configuration({
      method: "get",
      path: `/${role}/getDetailBookingOneDay`,
      params,
    })
  );

const customerCancelBooking = ({ bookingname }) =>
  axios(
    configuration({
      method: "post",
      path: `/customer/CancelBooking/${bookingname}`,
    })
  );

const attendance = ({ data }) =>
  axios(
    configuration({
      method: "post",
      path: "/customer/editattendence",
      data,
    })
  );


const getCustomerUnpaidBooking = ({ customerId }) =>
  axios(
    configuration({
      method: "get",
      path: `/customer/getBookingNotPayment/${customerId}`,
    })
  );

const getCustomerUnpaidBookingDetail = ({ bookingname }) =>
  axios(
    configuration({
      method: "get",
      path: `/customer/getDetailBooking/${bookingname}`,
    })
  );
const setPayment = (params) =>
  axios(
    configuration({
      method: 'get',
      path: `/order/vnpay_ipn/${params}`,
    })
  );

const getGuardDetailById = ({ guardId }) =>
  axios(
    configuration({
      method: "get",
      path: `/customer/getInfoGuardbyID/${guardId}`,
    })
  );

const requestChangeGuard = ({ data }) =>
  axios(
    configuration({
      method: "post",
      path: `/customer/RequestChangeGuard`,
      data,
    })
  );

export {
  createNewBooking,
  getBooking,
  getDetailBookingOneDay,
  attendance,
  getCustomerUnpaidBooking,
  getCustomerUnpaidBookingDetail,
  customerCancelBooking,
  getGuardDetailById,
  requestChangeGuard,
  vnPayMent,
  setPayment,
};
