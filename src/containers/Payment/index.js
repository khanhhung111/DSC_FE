// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import SweetAlert2 from "react-sweetalert2";

// import BaseButton from "../../components/Button";
// import BaseInput from "../../components/Input/Input";

// const userData = JSON.parse(localStorage.getItem("userData"));

// function Payment() {
//   const navigate = useNavigate();
//   const { companyNameForPayment } = useParams();

//   const [cardNumber, setCardNumber] = useState("");
//   const [releaseTime, setReleaseTime] = useState("");
//   const [cardholder, setCardholder] = useState("");
//   const [err, setErr] = useState("");
//   const [swal, setSwal] = useState({});

//   const errorCardNumber = () => {
//     if (String(cardNumber).length < 12 && cardNumber !== "")
//       return "Length is 12";

//     return null;
//   };

//   const handleSubmit = async () => {
//     if (cardholder.length === 0) setErr("Please fill the Cardholder name");

//     if (cardholder.length) {
//       const data = {
//         bookingname: `${userData?.userId}${companyNameForPayment}`,
//         // cardholder,
//         // cardNumber,
//         // releaseTime,
//       };

//       try {
//         // const res = await payment({ data });

//         setSwal({
//           ...swal,
//           show: true,
//           text: res.data || "",
//           icon: "success",
//           didClose: () => navigate("../../user-my-calendar"),
//         });
//       } catch (error) {
//         setSwal({
//           ...swal,
//           show: true,
//           text: error || "",
//           icon: "error",
//         });
//       }
//     }
//   };

//   return (
//     <div className="p-10">
//       <p className="font-medium text-3xl text-blue-800">Payment</p>
//       <div className="w-full md:w-2/5 px-8 bg-white lg:ml-4 mt-10">
//         <div className="rounded shadow p-6">
//           <BaseInput
//             label="Card number"
//             value={cardNumber}
//             classExtend="w-full"
//             type="number"
//             placeholder="XXXX XXXX XXXX XXXX"
//             onChange={(e) =>
//               e.target.value.trim().length < 13 &&
//               setCardNumber(Number(e.target.value.trim()))
//             }
//           />

//           {errorCardNumber() && (
//             <div className="text-red-400 mt-4">{errorCardNumber()}</div>
//           )}

//           <BaseInput
//             label="Release time"
//             classExtend="w-full mt-2"
//             placeholder="MM-YYYY"
//             value={releaseTime}
//             onChange={(e) =>
//               e.target.value.trim().length < 8 &&
//               setReleaseTime(e.target.value.trim())
//             }
//           />

//           <BaseInput
//             label="Cardholder name (words without accents)"
//             classExtend="w-full mt-2"
//             type="string"
//             placeholder="NGUYEN VAN A"
//             onChange={(e) => setCardholder(e.target.value)}
//           />

//           {err && <div className="text-red-400 mt-4">{err}</div>}
//         </div>

//         <BaseButton
//           className="mt-8 flex pb-4 bg-gray-400"
//           onClick={() => navigate(-1)}
//           onBlur={() =>
//             cardholder.length === 0 && setErr("Please fill the Cardholder name")
//           }
//           content={"Cancel"}
//         />

//         <BaseButton
//           className="mt-8 flex pb-4 bg-[#C7923E] ml-6"
//           onClick={handleSubmit}
//           onBlur={() =>
//             cardholder.length === 0 && setErr("Please fill the Cardholder name")
//           }
//           content={"Submit"}
//         />
//       </div>

//       <SweetAlert2
//         didClose={() => setSwal({ ...swal, show: false })}
//         {...swal}
//       />
//     </div>
//   );
// }

// export default Payment;
