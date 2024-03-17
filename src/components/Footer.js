import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="dummy-footer"></div>
      <div className="footer-container">
        Made with 💕
        <Link to="/about">@makkarankush</Link>
      </div>
    </>
  );
}

export default Footer;
