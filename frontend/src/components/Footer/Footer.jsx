import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import {
  MdOutlineEmail,
  MdLocationPin,
  MdOutlineSmartphone,
} from "react-icons/md";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="middle">
        <div className="first">
          <h3>About</h3>
          <p>
            We believe that every adventurer needs to know where to go, to know
            where they stand, and to be able to share their experiences.
          </p>
        </div>
        <div className="second">
          <h3>Contacts</h3>
          <div className="info">
            <div className="inline">
              <MdLocationPin />
              <p> Prishtine, Kosove</p>
            </div>

            <div className="inline">
              <MdOutlineEmail />
              <p>hello@hiketogether.com</p>
            </div>

            <div className="inline">
              <MdOutlineSmartphone />
              <p>+383 44 111 111</p>
            </div>
          </div>
        </div>
        <div className="third">
          <p>
            Stay connected with us on social media to keep up with the latest
            updates, news, and exclusive content.
          </p>
          <div className="social-medias">
            <div className="icon fb">
              <Link to="/">
                <FaFacebookF />
              </Link>
            </div>
            <div className="icon tw ">
              <Link to="/">
                <FaTwitter />
              </Link>
            </div>
            <div className="icon ig">
              <Link to="/">
                <FaInstagram />
              </Link>
            </div>
            <div className="icon ln">
              <Link to="/">
                <FaLinkedinIn />
              </Link>
            </div>
            <div className="icon yt">
              <Link to="/">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="line"></div>

      <div className="f-bottom">
        <div className="left">
          <p>© 2025 HikeTogether - Hiking & Outdoor</p>
        </div>
        <div className="right">
          <p>Contact Us</p>
          <span>|</span>
          <p>Privacy Policy</p>
          <span>|</span>
          <p>Terms of Use</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
