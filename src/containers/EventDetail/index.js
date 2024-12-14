import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import moment from "moment";
import Popup from "reactjs-popup";

import {
  attendance,
  customerCancelBooking,
  getDetailBookingOneDay,
  requestChangeGuard,
} from "../../utils/booking";
import {
  amountFormatting,
  dateFormatting,
  dateFullTimeFormatting,
} from "../../utils/formatHelper";
import BaseButton from "../../components/Button";
import TimeRangeDataBooking from "../../components/TimeRangeDataBooking/TimeRangeDataBooking";
import Review from "../../components/Review/Review";
import GuardDetails from "./GuardDetails";

export default function EventDetail() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const companyName = localStorage.getItem("companyName");
  const customerIdOfBooking = localStorage.getItem("customerIdOfBooking");
  const start = localStorage.getItem("start");
  const end = localStorage.getItem("end");

  const navigate = useNavigate();

  const { userId, role } = userData;

  const rolePosition = role === 2 ? "customer" : role === 3 && "guard";

  const bookingName = `${
    role === 2 ? userId : role === 3 && customerIdOfBooking
  }${companyName}`;

  const [bookingDetail, setBookingDetail] = useState({});
  const [guardStatus, setGuardStatus] = useState("");
  const [guardId, setGuardId] = useState("");
  const [swal, setSwal] = useState({});
  const [isDisplayPopup, setDisplayPopup] = useState(false);
  const [isToggleGuardDetailPopup, setToggleGuardDetailPopup] = useState(false);
  const [guardIdSelected, setGuardIdSelected] = useState("");

  useEffect(() => {
    const params = {
      bookingname: bookingName,
      time_start: new Date(start.toString()).toISOString(),
      time_end: new Date(end.toString()).toISOString(),
    };

    getDetailBookingOneDay({ params, role: rolePosition })
      .then((res) => {
        if (res?.data && res?.data.length > 0) {
          setBookingDetail(res?.data[0]);
          setGuardStatus(res?.data[0]?.guard?.map((g) => g.status));
          setGuardId(res?.data[0]?.guard?.map((g) => g.guard_id));
        }
      })
      .catch((err) => console.error("ERROR: ", err));
  }, []);

  const handleChangeStatus = (e, index) => {
    const guardStatusTmp = [...guardStatus];
    guardStatusTmp[index] = Number(e.target.value);

    setGuardStatus(guardStatusTmp);
  };

  const handleRating = async () => {
    setDisplayPopup(true);
  };

  const handleChangeGuard = async () => {
    const data = {
      bookingname: bookingName,
      guard_id: userId,
    };

    requestChangeGuard({ data });
  };

  const Descriptions = ({ title, content, className }) => (
    <div className={className}>
      <div className="font-medium">{title}</div>
      <div className="text-gray-500 mt-1">{content}</div>
    </div>
  );

  const handleAttendance = () => {
    const guard = guardStatus.map((status, index) => ({
      guard_id: guardId[index],
      status: status === null ? 0 : status,
    }));

    const data = {
      customer_id: userId,
      bookingName,
      dataBooking: {
        time_start: new Date(start.toString()).toISOString(),
        time_end: new Date(end.toString()).toISOString(),
      },
      guard,
    };

    attendance({ data })
      .then((res) =>
        setSwal({
          show: true,
          text: res.data || "",
          icon: "success",
          didClose: () => navigate("../user-my-calendar"),
        })
      )
      .catch((err) =>
        setSwal({
          show: true,
          text: err.response.data.message || "",
          icon: "error",
        })
      );
  };

  const handleCancelBooking = () => {
    customerCancelBooking({ bookingname: bookingName })
      .then((res) =>
        setSwal({
          show: true,
          text: res.data || "",
          icon: "success",
          didClose: () => navigate("../user-my-calendar"),
        })
      )
      .catch((err) =>
        setSwal({
          show: true,
          text: err.response.data.message || "",
          icon: "error",
        })
      );
  };

  const handleToggleGuardDetail = (id) => {
    setGuardIdSelected(id);
    setToggleGuardDetailPopup(true);
  };

  return (
    <div class="w-full my-10 px-10">
      <div className="flex items-center">
        <div className="font-medium">{companyName}</div>
        <Link
          className="rounded-full bg-gray-500 py-2 px-3 ml-5 text-white font-medium"
          to="../user-my-calendar"
        >
          View calendar
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-lg px-5 py-6 mt-5">
        <Descriptions title="Service" content={bookingDetail.service} />

        <Descriptions
          title="Address"
          content={bookingDetail.address}
          className="mt-4"
        />

        <Descriptions
          title="Country"
          content={bookingDetail.country}
          className="mt-4"
        />

        <Descriptions
          title="Booking date"
          content={dateFormatting(bookingDetail.booking_date)}
          className="mt-4"
        />

        {role === 2 && (
          <>
            <Descriptions
              title="Payment status"
              content={bookingDetail.status === "1" ? "Unpaid" : "Paid"}
              className="mt-4"
            />

            <Descriptions
              title="Total amount"
              content={amountFormatting(bookingDetail.total_amount)}
              className="mt-4"
            />
          </>
        )}

        <Descriptions
          title="Start"
          content={dateFullTimeFormatting(
            bookingDetail?.dataBooking?.time_start
          )}
          className="mt-4"
        />

        <Descriptions
          title="End"
          content={dateFullTimeFormatting(bookingDetail?.dataBooking?.time_end)}
          className="mt-4"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg px-5 py-6 mt-5">
        <div className="bg-green-300 w-24 py-1 flex justify-center font-medium rounded-2xl">
          {bookingDetail.quantity} Guard{bookingDetail.quantity > 1 && "s"}
        </div>
        {/* <Descriptions
          title="Do Quang Duy"
          content="Security"
          className="mt-4"
        />
        <Descriptions
          title="Do Quang Duy"
          content="Security"
          className="mt-4"
        /> */}
      </div>

      <div className="flex justify-center mt-20">
        {role === 2 && (
          <div className="w-full flex-col">
            <div className="flex justify-center">
              <div class="grid grid-cols-6 gap-5 w-4/5 h-26">
                <div className="flex justify-center font-medium bg-gray-300">
                  Image
                </div>
                <div className="flex justify-center font-medium bg-gray-300">
                  First Name
                </div>
                <div className="flex justify-center font-medium bg-gray-300">
                  Last Name
                </div>
                <div className="flex justify-center font-medium bg-gray-300 w-48">
                  Attendance
                </div>
                <div className="flex justify-center w-28" />
                <div className="flex justify-center w-28" />

                {bookingDetail?.guard?.map((guard, index) => (
                  <>
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          guard?.img
                            ? guard?.img
                            : "https://t4.ftcdn.net/jpg/02/83/34/87/360_F_283348729_wcG8rvBF5f1VfPGKy916pIcmgGk0PK7B.jpg"
                        }
                        alt="User avatar"
                      />
                    </div>
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                    >
                      {guard.firstname}
                    </div>
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                    >
                      {guard.lastname}
                    </div>
                    <div className="flex justify-around items-center w-48 mb-2 cursor-pointer">
                      <input
                        type="radio"
                        value={1}
                        checked={guardStatus[index] === 1}
                        onChange={(e) => handleChangeStatus(e, index)}
                      />
                      <label className="text-sm">Present</label>
                      <br />
                      <input
                        type="radio"
                        value={0}
                        checked={
                          guardStatus[index] === null ||
                          guardStatus[index] === 0
                        }
                        onChange={(e) => handleChangeStatus(e, index)}
                      />
                      <label className="text-sm">Absent</label>
                      <br />
                    </div>

                    <div>
                      {moment(end).isBefore(new Date()) && (
                        <div className="flex">
                          <BaseButton
                            content="Rating"
                            className="bg-blue-500 ml-4 text-sm"
                            onClick={handleRating}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {moment(end).isBefore(new Date()) && (
                        <div className="flex">
                          <BaseButton
                            content="Change"
                            className="bg-green-400 ml-8 text-sm"
                            onClick={handleChangeGuard}
                          />
                        </div>
                      )}
                    </div>

                    <Popup
                      open={isDisplayPopup}
                      onClose={() => isDisplayPopup && setDisplayPopup(false)}
                      modal
                      {...{
                        contentStyle: {
                          width: "60%",
                          borderRadius: 4,
                          padding: 20,
                        },
                      }}
                    >
                      <div className="content">
                        <Review
                          guard={guard}
                          customerId={userId}
                          bookingName={bookingName}
                          setDisplayPopup={setDisplayPopup}
                          setSwal={setSwal}
                        />
                      </div>
                    </Popup>
                  </>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              {bookingDetail?.status === 4 && (
                <BaseButton
                  content="Cancel"
                  className="bg-gray-700"
                  onClick={handleCancelBooking}
                />
              )}

              {bookingDetail?.guard?.length > 0 && (
                <BaseButton
                  content="Save"
                  className="bg-[#C7923E] ml-8"
                  onClick={handleAttendance}
                />
              )}
            </div>
          </div>
        )}

        {role === 3 && (
          <div className="flex w-full">
            <div class="grid grid-cols-4 gap-5 w-4/5 h-26">
              <div className="flex justify-center font-medium bg-gray-300">
                Image
              </div>
              <div className="flex justify-center font-medium bg-gray-300">
                First Name
              </div>
              <div className="flex justify-center font-medium bg-gray-300">
                Last Name
              </div>
              <div className="flex justify-center font-medium bg-gray-300 w-48">
                Attendance
              </div>

              {bookingDetail?.guard?.map((guard, index) => (
                <>
                  <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        guard?.img
                          ? guard?.img
                          : "https://t4.ftcdn.net/jpg/02/83/34/87/360_F_283348729_wcG8rvBF5f1VfPGKy916pIcmgGk0PK7B.jpg"
                      }
                      alt="User avatar"
                    />
                  </div>

                  <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                  >
                    {guard.firstname}
                  </div>

                  <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => handleToggleGuardDetail(guard?.guard_id)}
                  >
                    {guard.lastname}
                  </div>

                  <div className="flex justify-around items-center w-48 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      value={1}
                      checked={guardStatus[index] === 1}
                      disabled={true}
                    />
                    <label className="text-sm">Present</label>
                    <br />
                    <input
                      type="radio"
                      value={0}
                      checked={
                        guardStatus[index] === null || guardStatus[index] === 0
                      }
                      disabled={true}
                    />
                    <label className="text-sm">Absent</label>
                    <br />
                  </div>

                  <Popup
                    open={isDisplayPopup}
                    onClose={() => isDisplayPopup && setDisplayPopup(false)}
                    modal
                    {...{
                      contentStyle: {
                        width: "60%",
                        borderRadius: 4,
                        padding: 20,
                      },
                    }}
                  >
                    <div className="content">
                      <Review
                        guard={guard}
                        customerId={userId}
                        bookingName={bookingName}
                        setDisplayPopup={setDisplayPopup}
                        setSwal={setSwal}
                      />
                    </div>
                  </Popup>
                </>
              ))}
            </div>
          </div>
        )}
      </div>

      <SweetAlert2
        didClose={() => setSwal({ ...swal, show: false })}
        {...swal}
      />

      <Popup
        open={isToggleGuardDetailPopup}
        onClose={() =>
          isToggleGuardDetailPopup && setToggleGuardDetailPopup(false)
        }
        modal
        {...{
          contentStyle: { width: "80%", borderRadius: 4, padding: 20 },
        }}
      >
        <div>
          <div className="content">
            <GuardDetails guardId={guardIdSelected} />
          </div>
          <div className="w-full flex justify-center mt-10">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-sm mr-10"
              onClick={() => setToggleGuardDetailPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
