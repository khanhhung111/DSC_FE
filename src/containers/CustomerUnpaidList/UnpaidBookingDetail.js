import { useEffect, useState } from "react";

import { getCustomerUnpaidBookingDetail } from "../../utils/booking";

import Descriptions from "../../components/Descriptions";
import {
  amountFormatting,
  dateFormatting,
  dateTimeFormatting,
} from "../../utils/formatHelper";

function BookingDetail({ bookingName, companyName }) {
  const [detail, setDetail] = useState({});

  useEffect(() => {
    unpaidBookingData();
  }, []);

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
    <div className="grid grid-cols-2 gap-4">
      <Descriptions title="Company name" content={companyName} />

      <Descriptions title="Address" content={detail.address} />

      <Descriptions
        title="Booking date"
        content={dateFormatting(detail.booking_date)}
      />

      <Descriptions title="Quantity" content={detail.quantity} />

      <Descriptions title="Service" content={detail.service} />

      <Descriptions
        title="Total amount"
        content={amountFormatting(detail.total_amount) + " VND"}
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
    </div>
  );
}

export default BookingDetail;
