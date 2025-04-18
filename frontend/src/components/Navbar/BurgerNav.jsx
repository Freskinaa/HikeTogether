import React, { useState } from "react";
import "./burgerNav.scss";
import { Link } from "react-router-dom";
import { LiaMountainSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const BurgerNav = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth.accesstoken);

  const loggedInRoutes = [
    { name: "TRAILS", path: "/trails" },
    { name: "EVENTS", path: "./events" },
    { name: "PROFILE", path: "/profile" },
  ];
  const normalRoutes = [
    { name: "HOME", path: "/" },
    { name: "TRAILS", path: "/trails" },
    { name: "EVENTS", path: "/events" },
    { name: "LOGIN", path: "/login" },
  ];

  return (
    <div className="hamburgerMenu">
      <input
        className={`${menuOpen ? "checkedMenu" : ""}`}
        id="menuToggle"
        checked={menuOpen}
        type="checkbox"
        onChange={() => setMenuOpen(!menuOpen)}
      />
      <label
        className={scrolled ? "scrolledColor" : "menuBtn"}
        htmlFor="menuToggle"
      >
        <span></span>
      </label>

      <div className="menuBox">
        <div className="logo">
          <Link
            to="/"
            className="quasiLogo"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <LiaMountainSolid fontSize="42px" />
            HikeTogether
          </Link>
        </div>
        <div className="items">
          {!accessToken ? (
            <ul className="navLinks">
              {normalRoutes.map((route, index) => (
                <Link
                  onClick={() => setMenuOpen(!menuOpen)}
                  to={route.path}
                  key={index}
                  className={route.className ? route.className : ""}
                >
                  <li>{route.name}</li>
                </Link>
              ))}
            </ul>
          ) : (
            <ul className="navLinks">
              {loggedInRoutes.map((route, index) => (
                <Link
                  onClick={() => setMenuOpen(!menuOpen)}
                  to={route.path}
                  key={index}
                  className={route.className ? route.className : ""}
                >
                  <li>{route.name}</li>
                </Link>
              ))}
            </ul>
          )}
          <div className="footer">
            <p>Contact us:</p>
            <p>
              <a href="tel:38971 22 22 22">+38971 22 22 22</a>
            </p>
            <p>Pristina Republic of Kosovo</p>
            <p className="mail">hiking@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerNav;
