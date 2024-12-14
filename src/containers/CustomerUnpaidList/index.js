import { useEffect, useState } from "react";
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

import { amountFormatting, dateFormatting } from "../../utils/formatHelper";

import { TrashIcon } from "@heroicons/react/24/outline";
import {
  customerCancelBooking,
  getCustomerUnpaidBooking,
  setPayment
} from "../../utils/booking";

import UnpaidBookingDetail from "./UnpaidBookingDetail";
import SweetAlert2 from "react-sweetalert2";

const UnpaidBookingItem = ({
  companyName,
  bookingDate,
  totalAmount,
  handleToggleDetail,
  handleDelete,
}) => (
  <Card className="w-[700px] my-2 mt-4">
    <List>
      <ListItem>
        <ListItem
          className="hover:bg-yellow-200"
          onClick={() => handleToggleDetail(companyName)}
        >
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 break-all"
            >
              {companyName}
            </Typography>
            {amountFormatting(totalAmount)} VND
          </div>

          <ListItemSuffix>
            <Chip
              value={dateFormatting(bookingDate)}
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

        <TrashIcon
          className="h-6 w-6 ml-4 text-red-600"
          onClick={() => handleDelete(companyName)}
        />
      </ListItem>
    </List>
  </Card>
);

function CustomerUnpaidList() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [unpaidList, setUnpaidList] = useState([]);
  const [isDisplayPopup, setDisplayPopup] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [params, setParams] = useState("");
  // setParams(window.location.search);
  const [swal, setSwal] = useState({});
  const [hasSetPaymentCalled, setHasSetPaymentCalled] = useState(false);


  useEffect(() => {
    (userData?.role === 2 || userData?.userId) && unpaidBookingData();
  }, []);

  useEffect(() => {
    setParams(window.location.search);
  }, []);

  const callNetPayment = async () => {
    try {
      if (params && !hasSetPaymentCalled) {
        await setPayment(params); // Thực hiện gọi API ở đây
        setHasSetPaymentCalled(true);
        setParams(''); // Bạn có chắc rằng bạn muốn xóa params sau khi đã gọi setPayment?
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  
  useEffect(() => {
    callNetPayment();
  }, [params]);
  
  const unpaidBookingData = async () => {
    try {
      const res = await getCustomerUnpaidBooking({
        customerId: userData?.userId,
      });
      setUnpaidList(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (companyName) => {
    try {
      const res = await customerCancelBooking({
        bookingname: userData?.userId + companyName,
      });

      setSwal({
        ...swal,
        show: true,
        text: res.data || "",
        icon: "success",
        didClose: () => unpaidBookingData(),
      });
    } catch (error) {
      setSwal({
        ...swal,
        show: true,
        text: error.response.data || "",
        icon: "error",
      });
    }
  };

  if (userData?.role !== 2 || !userData?.userId) {
    return null;
  }

  const handleToggleDetail = (companyName) => {
    // setDisplayPopup(true);
    setBookingName();
    setCompanyName(companyName);

    navigate(`../../contract/${userData?.userId + companyName}`);
  };
    // console.log('ussssee', searchParams);
  
  return (
    <div className="flex justify-center w-full">
      <div className="p-10">
        <p className="text-2xl font-bold">Unpaid bookings</p>

        {unpaidList.length &&
          unpaidList.map((booking) => (
            <UnpaidBookingItem
              companyName={booking.companyname}
              bookingDate={booking.booking_date}
              totalAmount={booking.total_amount}
              handleToggleDetail={handleToggleDetail}
              handleDelete={handleDelete}
            />
          ))}

        {unpaidList.length < 3 && <div className="h-72" />}

        <Popup
          open={isDisplayPopup}
          onClose={() => isDisplayPopup && setDisplayPopup(false)}
          modal
          {...{
            contentStyle: { width: "80%", borderRadius: 4, padding: 20 },
          }}
        >
          <div>
            <div className="content">
              <UnpaidBookingDetail
                bookingName={bookingName}
                companyName={companyName}
              />
            </div>
            <div className="w-full flex justify-center mt-10">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded-sm mr-10"
                onClick={() => setDisplayPopup(false)}
              >
                CANCEL
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-sm"
                onClick={() =>
                  navigate(
                    `../user-my-calendar/new-booking/payment/${companyName}`
                  )
                }
              >
                PAYMENT
              </button>
            </div>
          </div>
        </Popup>
      </div>

      <SweetAlert2
        didClose={() => setSwal({ ...swal, show: false })}
        {...swal}
      />
    </div>
  );
}

export default CustomerUnpaidList;
