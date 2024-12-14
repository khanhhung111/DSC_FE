import moment, { isMoment } from "moment";

// 1000000 --> 1.000.000
export const amountFormatting = (amount) =>
  new Intl.NumberFormat().format(amount);

export const dateFormatting = (dateTime) =>
  moment(dateTime).format("DD-MM-YYYY");

export const dateTimeFormatting = (dateTime) =>
  moment(dateTime).format("DD-MM-YYYY HH:mm");

export const dateFullTimeFormatting = (dateTime) =>
  moment(dateTime).format("DD-MM-YYYY HH:mm:ss");

// Company name to RGB
const hashCode = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i) => {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const stringToRGB = (str) => intToRGB(hashCode(str));

export const valueToLabelGender = (value) => (value ? "Male" : "Female");

export const valueToLabelGuardStatus = (value) =>
  value === 0 ? "Busy" : value === 1 && "Free";

// MM-DD-YYYY --> DD-MM-YYYY
const convertDate = (input) => {
  const datePart = input.match(/\d+/g);
  const month = datePart[0], // get only two digits
    day = datePart[1],
    year = datePart[2];

  return day + "/" + month + "/" + year;
};

export const isDateValidFormat = (dateStr) => {
  if (moment.isMoment(dateStr)) return dateFormatting(dateStr);
  if (dateStr.match(/\d+/g)) return false;
  return !isNaN(new Date(dateStr));
};
