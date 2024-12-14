import React, { useState } from "react";
import { styles } from './styles';
import { useAuth } from "../../hooks/Auth";
import CustomerList from "./CustomerList";
import ClubList from "./ClubList";
import Statitical from "./Statitical";
import TournamentList from "./TournamentList"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
  const [activeTab, setActiveTab] = useState("statitical");
  const { logout } = useAuth();

  // Mảng các nút và tab tương ứng
  const actionButtons = [
    { label: "Quản lý tài khoản", tab: "customers" },
    { label: "Quản lý câu lạc bộ", tab: "club" },
    { label: "Quản lý giải đấu", tab: "tournament" },
    { label: "Xem thống kê", tab: "statitical" },
    
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const ActionButton = ({ label, onClick, isActive }) => (
    <button
      className={`p-4 w-full text-left cursor-pointer border-2 ${
        isActive ? "bg-[#C7923E] text-white font-bold border-[#C7923E]" : "bg-white text-black border-[#C7923E]"
      } hover:bg-[#C7923E] hover:text-white transition-all rounded-lg`}
      onClick={onClick}
      style={{
        marginBottom: "15px", // Thêm khoảng cách giữa các nút
        borderRadius: "12px", // Bo tròn góc
        borderWidth: "1px", // Đường viền mỏng
        padding: "10px 20px", // Padding cho nút
        textAlign:'center',
        fontSize: '18px'
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen">
      <div className="w-150 flex flex-col">
        <>
          <div className="admin-dashboard flex flex-col flex-grow">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fd8be637f6f79dd0f96ab8b9412a2312f0195ba4a1a6653b8290359fcff3836?placeholderIfAbsent=true&apiKey=64a11f7ccf9c4f09a01cd9aadc1c5dac"
              className="profile-image"
              alt="Admin profile"
            />
            <div className="divider-section">
              <div className="divider-line" />
              <div className="section-title">Admin</div>
            </div>
            <button
              className="logout-chip"
              tabIndex="0"
              role="button"
              onClick={logout}
              style={{marginBottom:'30px',fontSize: '18px'}}
            >
              <div className="chip-content" >Đăng xuất</div>
            </button>
            {actionButtons.map((button, index) => (
              <ActionButton
                key={index}
                label={button.label}
                onClick={() => handleTabClick(button.tab)}
                isActive={activeTab === button.tab}
              />
            ))}
          </div>
          <style jsx>{styles}</style>
        </>
      </div>
      <div className="bg-gray-100 w-full">
      
        {activeTab === "customers" && <CustomerList />}
        {activeTab === "club" && <ClubList />}
        {activeTab === "tournament" && <TournamentList />}
        {activeTab === "statitical" && <Statitical />}
        
        
      </div>
      <ToastContainer 
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
    </div>
  );
};

export default Admin;
