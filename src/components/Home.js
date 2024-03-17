import React from "react";
import heroImg from "../static/heroImg.png";
import sideDish from "../static/side-dish.png";
import arrowImg from "../static/arrow.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-container">
      <img className="right-img" src={heroImg}></img>
      <img className="side-img" src={sideDish}></img>
      <img className="img-arrow" src={arrowImg} />
      <div className="left-info">
        <div className="heading">
          <span className="main-heading">Order Food</span>
          <br />
          <span className="second-heading">From Nearest Restaurant</span>
        </div>
        <div className="intro">
          🍔 Dive into tasty adventures with our site, where nearby restaurants
          are just a click away, serving up delicious dishes to satisfy your
          hunger. Join us in exploring the flavors of your neighborhood! 🌟
        </div>
        <Link to="/restaurants" className="restaurants-btn">
          See All Restaurants
        </Link>
      </div>
    </div>
  );
}

export default Home;
