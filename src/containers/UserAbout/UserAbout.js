// import { useEffect, useState } from "react";
// import { Rating } from "@material-tailwind/react";

// import { customerGetTopRank } from "../../utils/reviewFetching";

// import tryStaffBanner from "../../assets/tryStaffBanner.png";
// import PartyTip from "../../assets/PartyTip.png";
// import Rectangle6 from "../../assets/Rectangle6.png";
// import Rectangle8 from "../../assets/Rectangle8.png";
// import Rectangle9 from "../../assets/Rectangle9.png";
// import guardAv from "../../assets/guardAv.png";
// import SecuritySolutions from "../../assets/SecuritySolutions.png";
// import experience from "../../assets/experience.png";
// import multiLocations from "../../assets/multiLocations.png";
// import { getTop4New } from "../../utils/admin";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { DEFAULT_AVA } from "../../utils/tournament";

// function truncateHtml(content) {
//   const truncatedContent = content?.replace(/<[^>]*>?/gm, "").slice(0, 200);
//   return `${truncatedContent}...`;
// }

// const IntroCard = ({ srcImg, time, title, content }) => (
//   <div className="bg-white flex-col gap-6 flex">
//     <img className="object-cover w-80 h-[300px]" src={srcImg} />
//     <div className="flex">
//       <div className="w-[131.98px] opacity-60 text-black text-sm font-normal">
//         INTERNET
//       </div>
//       <div className="w-[131.98px] opacity-60 text-black text-sm font-normal">
//         {moment(time).format("DD/MM/YYYY")}
//       </div>
//     </div>

//     <div className="h-60 flex-col justify-start items-start gap-6 flex">
//       <div className="w-[387.29px] h-[40px] text-black text-2xl font-normal leading-[38px] mb-7">
//         {title}
//       </div>
//       <div
//         className="w-[384.43px] h-[104.85px] text-black text-base font-normal leading-7"
//         dangerouslySetInnerHTML={{ __html: truncateHtml(content) }}
//       />
//     </div>
//   </div>
// );

// const GuardCard = ({ srcImg, name, ranking, start, className = "" }) => {
//   const rakingTitle =
//     ranking === "1" ? "Champion" : ranking === "2" ? " Top 2" : "Top 3";
//   return (
//     <div
//       className={`${className} w-1/4 h-[685.11px] px-3 py-3.5 bg-neutral-300 flex-col justify-end inline-flex`}
//     >
//       <div className="justify-center items-center gap-2 inline-flex">
//         <div
//           className={`text-right ${
//             ranking === "1" && "text-red-800"
//           } text-[32px] font-normal leading-[100px] tracking-wider`}
//         >
//           {rakingTitle}
//         </div>
//       </div>
//       <img className={`${ranking === "1" ? "my-14" : "my-4"}`} src={srcImg} />
//       <div className="w-[360px] flex-col flex">
//         <div className="h-[28.11px] text-black text-[26px]">{name}</div>
//         <div className="mt-6 flex justify-between items-center">
//           <div className="h-[38.15px] px-6 py-[18px] bg-[#C7923E] rounded-[5px] justify-center items-center inline-flex">
//             <div className="text-center text-white text-base font-normal leading-tight tracking-tight">
//               Top {ranking}
//             </div>
//           </div>
//           <div className="w-1/2 h-[46px] flex-col flex">
//             <div className="w-full h-[17.45px] text-neutral-600 text-sm font-semibold leading-[18.20px] tracking-tight">
//               Start From
//             </div>
//             <div className="h-[20.30px]">
//               <Rating value={start} readonly />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function User() {
//   const [postList4, setPostList4] = useState([]);
//   const [postList1, setPostList1] = useState([]);
//   const [postList3, setPostList3] = useState([]);

//   useEffect(() => {
//     // Call the API and set the data into postList4 when the component is rendered
//     getTop4New()
//       .then((response) => {
//         setPostList4(response.data);
//         setPostList1(response.data.slice(0, 1));
//         setPostList3(response.data.slice(1));
//       })
//       .catch((error) => {
//         console.error("Error fetching news data:", error);
//       });
//   }, []);

//   function extractFirstImageSrc(htmlContent) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, "text/html");

//     const imgElements = doc.querySelectorAll("img");

//     if (imgElements.length > 0) {
//       // Lấy src của ảnh đầu tiên
//       const firstImageSrc = imgElements[0].getAttribute("src");
//       return firstImageSrc;
//     } else {
//       // Trả về null nếu không có ảnh
//       return null;
//     }
//   }
//   // console.log('postList 1', postList1);
//   // console.log('postList 3', postList3);
//   // console.log('postList 4', postList4);
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   const [topRank, setTopRank] = useState([]);

//   useEffect(() => {
//     getTopRank();
//   }, []);

//   const getTopRank = async () => {
//     try {
//       const res = await customerGetTopRank();
//       setTopRank(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // console.log('postList1', postList1[0]);

//   return (
//     <div className="w-full mx-auto max-w-screen-xl">
//       <div className="mx-auto relative">
//         <img className="w-screen h-auto" src={tryStaffBanner} alt="Banner" />
//         <div className="w-102 h-48 absolute  top-10 left-24 px-12 py-2">
//           <div className="w-96 h-20 text-white text-[62px] font-light ">
//             Welcome
//             <br />
//             Back,
//           </div>
//         </div>
//       </div>
//       {postList1[0] !== undefined ? (
//         <div className="p-4 md:flex md:items-center md:justify-between mt-16 gap-3">
//           <Link to={`/news/${postList1[0]?.id}`}>
//             <img
//               className="object-cover h-96 mt-10 md:mt-0"
//               src={extractFirstImageSrc(postList1[0]?.content)}
//               alt={postList1[0]?.title}
//             />
//           </Link>
//           <div className="flex-col justify-start items-start inline-flex">
//             <div className="flex-col justify-start items-start flex">
//               <p className="opacity-60 text-black text-sm ">
//                 {moment(postList1[0]?.publish_date).format("DD/MM/YYYY")}
//               </p>
//               <Link to={`/news/${postList1[0]?.id}`}>
//                 <div className="w-[616px] h-[85.52px] text-black text-2xl font-normal leading-[38px] mt-4">
//                   {postList1[0]?.title}
//                 </div>
//               </Link>
//               <Link to={`/news/${postList1[0]?.id}`}>
//                 <div
//                   className="w-[564.88px] h-[221.76px] text-black text-base font-normal leading-7 mt-8"
//                   dangerouslySetInnerHTML={{
//                     __html: truncateHtml(postList1[0]?.content),
//                   }}
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           role="status"
//           class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center mt-20"
//         >
//           <div class="flex items-center justify-center w-full h-56 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
//             <svg
//               class="w-10 h-10 text-gray-200 dark:text-gray-600"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 18"
//             >
//               <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
//             </svg>
//           </div>
//           <div class="w-full">
//             <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//             <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
//             <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//             <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
//             <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
//             <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//           </div>
//           <span class="sr-only">Loading...</span>
//         </div>
//       )}
//       <div className="mx-auto flex items-center justify-center gap-10 my-20">
//         {postList3[0] !== undefined ? (
//           <Link to={`/news/${postList3[0]?.id}`}>
//             <IntroCard
//               srcImg={extractFirstImageSrc(postList3[0]?.content)}
//               time={postList3[0]?.publish_date}
//               title={postList3[0]?.title}
//               content={postList3[0]?.content}
//             />
//           </Link>
//         ) : (
//           <div
//             role="status"
//             class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-[31%]"
//           >
//             <div class="flex items-center justify-center h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
//               <svg
//                 class="w-10 h-10 text-gray-200 dark:text-gray-600"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 18"
//               >
//                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
//               </svg>
//             </div>
//             <div class="w-full">
//               <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//             </div>
//             <span class="sr-only">Loading...</span>
//           </div>
//         )}
//         {postList3[1] !== undefined ? (
//           <Link to={`/news/${postList3[1]?.id}`}>
//             <IntroCard
//               srcImg={extractFirstImageSrc(postList3[1]?.content)}
//               time={postList3[1]?.publish_date}
//               title={postList3[1]?.title}
//               content={postList3[1]?.content}
//             />
//           </Link>
//         ) : (
//           <div
//             role="status"
//             class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-[31%]"
//           >
//             <div class="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
//               <svg
//                 class="w-10 h-10 text-gray-200 dark:text-gray-600"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 18"
//               >
//                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
//               </svg>
//             </div>
//             <div class="w-full">
//               <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//             </div>
//             <span class="sr-only">Loading...</span>
//           </div>
//         )}
//         {postList3[2] !== undefined ? (
//           <Link to={`/news/${postList3[2]?.id}`}>
//             <IntroCard
//               srcImg={extractFirstImageSrc(postList3[2]?.content)}
//               time={postList3[2]?.publish_date}
//               title={postList3[2]?.title}
//               content={postList3[2]?.content}
//             />
//           </Link>
//         ) : (
//           <div
//             role="status"
//             class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-[31%]"
//           >
//             <div class="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
//               <svg
//                 class="w-10 h-10 text-gray-200 dark:text-gray-600"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 18"
//               >
//                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
//               </svg>
//             </div>
//             <div class="w-full">
//               <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
//               <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//             </div>
//             <span class="sr-only">Loading...</span>
//           </div>
//         )}
//       </div>

//       {userData && userData.role === 2 && topRank.length > 0 && (
//         <div className="w-full">
//           <div className="max-w-screen-xl text-center text-zinc-800 text-5xl leading-[52.80px] mt-10">
//             Top Ranking
//           </div>
//           <div className="flex w-full gap-5 justify-around mt-20">
//             <>
//               {topRank[1] && (
//                 <GuardCard
//                   srcImg={topRank[1]?.img || DEFAULT_AVA}
//                   name={topRank[1].firstname + " " + topRank[1].lastname}
//                   ranking="2"
//                   start={Number(topRank[1].avgrating)}
//                   className="h-[581px]"
//                 />
//               )}

//               {topRank[0] && (
//                 <GuardCard
//                   srcImg={topRank[0]?.img || DEFAULT_AVA}
//                   name={topRank[0].firstname + " " + topRank[0].lastname}
//                   ranking="1"
//                   start={Number(topRank[0].avgrating)}
//                   className="h-[581px]"
//                 />
//               )}

//               {topRank[2] && (
//                 <GuardCard
//                   srcImg={topRank[2]?.img || DEFAULT_AVA}
//                   name={topRank[2].firstname + " " + topRank[2].lastname}
//                   ranking="3"
//                   start={Number(topRank[2].avgrating)}
//                   className="h-[581px]"
//                 />
//               )}
//             </>
//           </div>
//         </div>
//       )}

//       <div class="h-[876px] bg-gray-500 relative my-40">
//         <div class="w-full h-[736px] top-[37px] absolute flex justify-center">
//           <div class="w-[888.80px] h-[321.24px] top-0 absolute">
//             <div class="w-[515px] h-[61px] left-[187.40px] top-0 absolute bg-[#C7923E] justify-center items-center gap-2.5 inline-flex">
//               <div class="text-center text-white text-5xl font-bold capitalize leading-[27px] tracking-[9px]">
//                 Our Services
//               </div>
//             </div>
//             <div class="w-[822.14px] h-[130.15px] left-[33.77px] top-[77.20px] absolute text-center text-white text-[40px] font-normal uppercase leading-[64px] tracking-wide">
//               We offer the Best Solutions for Your Security Needs
//             </div>
//             <div class="w-[888.80px] h-[97.61px] left-0 top-[223.62px] absolute text-center text-white text-xl font-normal leading-loose">
//               Give us a call today for a FREE estimate for your private event or
//               occasion. Our team is eager to have a comprehensive discussion
//               with you, addressing any inquiries you might have. We offer
//               top-notch security guard services at competitive rates to ensure
//               the safety and success of your event
//             </div>
//           </div>
//           <div class="h-[391px] left-0 top-[345px] absolute"></div>
//         </div>
//         <div class="w-full h-[441px] left-[115.98px] top-[399px] absolute">
//           <div class="w-[319.02px] h-[440px] left-0 top-0 absolute">
//             <div class="w-[282px] h-[440px] left-[0.02px] top-0 absolute rounded-lg flex-col justify-center items-center inline-flex">
//               <div class="w-[282px] h-[440px] bg-black rounded-[5px] shadow"></div>
//             </div>
//             <img
//               class="w-[281.79px] h-[227.30px] left-0 top-0 absolute rounded-tl-[5px] rounded-tr-[5px]"
//               src={SecuritySolutions}
//             />
//             <div class="w-[295px] h-6 left-[24.02px] top-[249px] absolute text-white text-2xl font-normal leading-relaxed tracking-widest">
//               Security Solutions :<br />
//             </div>
//             <div class="w-[219.34px] h-[104.78px] left-[24.37px] top-[285.33px] absolute text-white text-[15px] font-normal leading-relaxed">
//               Customized Security Services
//               <br />
//               Peace of Mind Assurance
//               <br />
//               Professional Protection
//             </div>
//             <div class="w-[113px] h-5 left-[15.02px] top-[410px] absolute text-center text-white text-sm font-normal leading-relaxed">
//               READ MORE
//             </div>
//           </div>
//           <div class="w-[282.15px] h-[440px] left-[330.02px] top-0 absolute">
//             <div class="w-[282px] h-[440px] left-0 top-0 absolute rounded-[5px] flex-col justify-center items-center inline-flex">
//               <div class="w-[282px] h-[440px] bg-black rounded-[5px] shadow"></div>
//             </div>
//             <img
//               class="w-[281.79px] h-[225.46px] left-[0.36px] top-0 absolute rounded-tl-[5px] rounded-tr-[5px]"
//               src={experience}
//             />
//             <div class="w-[231px] h-6 left-[25px] top-[247px] absolute text-white text-2xl font-normal leading-relaxed tracking-widest">
//               Experience :
//             </div>
//             <div class="w-[219.34px] h-[72.04px] left-[24.73px] top-[285.33px] absolute text-white text-[15px] font-normal leading-relaxed">
//               Extensive Management Experience
//               <br />
//               Tailored Security Services
//               <br />
//               Asset Protection Assurance
//             </div>
//           </div>
//           <div class="w-[653px] h-[441px] left-[337.02px] top-[-0px] absolute">
//             <div class="w-[281.79px] h-[440px] left-[323.75px] top-0 absolute flex-col justify-center items-center inline-flex">
//               <div class="w-[281.79px] h-[440px] bg-black rounded-[5px] shadow"></div>
//             </div>
//             <img
//               class="w-[281.79px] h-[236.17px] left-[323.75px] top-0 absolute rounded-tl-[5px] rounded-tr-[5px]"
//               src={multiLocations}
//             />
//             <div class="w-[309px] h-[25.14px] left-[344px] top-[257.68px] absolute text-white text-2xl font-normal leading-relaxed tracking-widest">
//               Multiple Locations :
//             </div>
//             <div class="w-[239.14px] h-[75.46px] left-[348.12px] top-[298.89px] absolute text-white text-[15px] font-normal leading-relaxed">
//               Extensive Geographic <br />
//               Multi-State Solutions
//               <br />
//               Comprehensive Security Services
//             </div>
//             <div class="w-[118px] h-[31px] left-[337px] top-[410px] absolute text-center text-white text-sm font-normal leading-relaxed">
//               READ MORE
//             </div>
//             <div class="w-[118px] h-[31px] left-0 top-[407px] absolute text-center text-white text-sm font-normal leading-relaxed">
//               READ MORE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;
