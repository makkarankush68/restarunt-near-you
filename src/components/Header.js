import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import cartImg from "../static/shopcart.png";
import logoImg from "../static/logo.png";

const Header = () => {
  // const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <>
      <nav className="dummy-header"></nav>
      <nav className="header">
        <div className="logo-container">
          <Link to={"/"}>
            <img className="logo" src={logoImg} />
          </Link>
        </div>
        <div className="nav-items">
          <ul>
            <li>{onlineStatus ? "💚" : "🔴"}</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            {/* <button
              className="login-btn"
              onClick={() => {
                if (btnName == "Login") setBtnName("Logout");
                else setBtnName("Login");
              }}
            >
              {btnName}
            </button> */}
          </ul>
        </div>
        <Link to="/cart">
          <div className="cart-li">
            <img src={cartImg} />
            <span className="cart-num">{cartItems.length}</span>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Header;
