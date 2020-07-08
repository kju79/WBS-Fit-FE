import React from "react";
import NavbarIcon from "../img/navbar_icon.png";

const Navbar = () => {
  return (
    <>
      <div id="navbar">
        <div>
          <div id="logo">
            <div id="logoName">
              W B S <span>F I T</span>
            </div>
            <div id="logoSlogan">a community based fitness app</div>
          </div>
        </div>
      </div>
      <div id="navBarExtended">
        <img src={NavbarIcon} alt="Navbar Icon" />
      </div>
    </>
  );
};

export default Navbar;
