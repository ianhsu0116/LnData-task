import React from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Navbar-top">
        <Link to="/">
          <img
            src="https://www.lndata.com/images/logo/logo_160.png"
            alt="LnDataLogo"
          />
        </Link>

        <IoPersonCircleOutline className="Navbar-avatar" />
      </div>
      <div className="Navbar-bottom">
        <button className="Navbar-bottom-btn">Player List</button>
      </div>
    </div>
  );
};
