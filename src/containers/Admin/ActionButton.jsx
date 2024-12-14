import React from "react";
import PropTypes from "prop-types";

const ActionButton = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`p-4 w-full text-left cursor-pointer ${
        isActive ? "bg-[#C7923E] text-white font-bold" : "bg-transparent text-black"
      } hover:bg-[#C7923E] hover:text-white transition-all`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default ActionButton;
