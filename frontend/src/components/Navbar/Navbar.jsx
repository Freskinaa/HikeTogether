import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faUser } from "@fortawesome/free-solid-svg-icons"; 
import "./Navbar.scss";
import BurgerNav from "./BurgerNav";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const accessToken = useSelector((state) => state.auth.accesstoken);
  const location = useLocation(); 
  const navContainerClasses = ["navContainer"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (scrolled) {
    navContainerClasses.push("scrolled");
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  const loggedInRoutes = [
    { name: "HOME", path: "/" },
    { name: "TRAILS", path: "/trails" },
    { name: "EVENTS", path: "/events" },
  ];

  const normalRoutes = [
    { name: "HOME", path: "/" },
    { name: "TRAILS", path: "/trails" },
    { name: "EVENTS", path: "/events" },
    { name: "LOGIN", path: "/login" },
  ];

  return (
    <div className={navContainerClasses.join(" ")}>
      <BurgerNav scrolled={scrolled} />
      <nav className="navBar">
        <ul>
          <Link
            to="/"
            className="quasi-logo"
            style={{
              color: scrolled ? "#43815c" : "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <p className="kosova-name">HIKE</p>
            <FontAwesomeIcon icon={faTree} style={{ height: "20px" }} />
            <p className="hike-name">TOGETHER</p>
          </Link>
          {!accessToken ? (
            <div
              className="auth-links"
              style={scrolled ? { color: "#566735" } : {}}
            >
              {normalRoutes.map((route, index) => (
                <Link
                  to={route.path}
                  key={index}
                  className={route.className ? route.className : ""}
                  style={{ color: isActive(route.path) ? "#43815c" : "" }}
                >
                  <li>{route.name}</li>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="auth-links"
              id="logged-links"
              style={scrolled ? { color: "#ffffff" } : {}}
            >
              {loggedInRoutes.map((route, index) => (
                <Link
                  to={route.path}
                  key={index}
                  className={route.className ? route.className : ""}
                  style={{ color: isActive(route.path) ? "#43815c" : "" }}
                >
                  <li>{route.name}</li>
                </Link>
              ))}
              <Link
                to="/profile"
                style={{ color: isActive("/profile") ? "#43815c" : "" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
