import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
 
const Header = () => {
  const onlineStatus = useOnlineStatus();
  const [btnName, setBtnName] = useState("Login");
  return (
    <>
      <nav className="dummy-header"></nav>
      <nav className="header">
        <div className="logo-container">
          <Link to={"/"}>
            <img className="logo" src={LOGO_URL} />
          </Link>
        </div>
        <div className="nav-items">
          <ul>
            <li style={{ "fontSize": "20px" }}>
              {onlineStatus ? "Online 💚" : "Offline 🔴"}
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* <li>Cart</li> */}
            <button
              className="login-btn"
              onClick={() => {
                if (btnName == "Login") setBtnName("Logout");
                else setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
