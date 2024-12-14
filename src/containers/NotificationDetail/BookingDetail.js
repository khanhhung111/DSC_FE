import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getCustomerUnpaidBookingDetail } from "../../utils/booking";
import Descriptions from "../../components/Descriptions";
import {
  amountFormatting,
  dateFormatting,
  dateTimeFormatting,
} from "../../utils/formatHelper";
import BaseButton from "../../components/Button";

function BookingDetail() {
  const { bookingName } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState({});

  useEffect(() => {
    unpaidBookingData();
  }, [bookingName]);

  if (!bookingName) return null;

  const unpaidBookingData = async () => {
    try {
      const res = await getCustomerUnpaidBookingDetail({
        bookingname: bookingName,
      });
      setDetail(res?.data[0] || {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10 pb-32">
      <p className="text-2xl font-bold">Detail</p>

      <div className="mt-6 ml-6 grid grid-cols-2 gap-4">
        <Descriptions title="Company name" content={detail?.companyname} />

        <Descriptions title="Address" content={detail?.address} />

        <Descriptions
          title="Booking date"
          content={dateFormatting(detail?.booking_date)}
        />

        <Descriptions title="Quantity" content={detail?.quantity} />

        <Descriptions title="Service" content={detail?.service} />

        <Descriptions
          title="Total amount"
          content={amountFormatting(detail?.total_amount) + " VND"}
        />

        <Descriptions
          title="Start time"
          content={
            detail?.dataBooking?.length &&
            dateTimeFormatting(
              detail?.dataBooking?.length && detail?.dataBooking[0]?.time_start
            )
          }
        />

        <Descriptions
          title="End time"
          content={dateTimeFormatting(
            detail?.dataBooking?.length &&
              detail?.dataBooking[detail?.dataBooking.length - 1]?.time_end
          )}
        />

        {detail?.status === 0 && (
          <Descriptions
            title="Guard"
            content={detail.guard?.map(
              (g) => g.lastname + " " + g.lastname + ", "
            )}
          />
        )}

        {detail?.status === 0 && <div />}

        <BaseButton
          className="mt-8 flex pb-4 bg-gray-400"
          onClick={() => navigate("/")}
          content={"BACK"}
        />
      </div>
    </div>
  );
}

export default BookingDetail;
