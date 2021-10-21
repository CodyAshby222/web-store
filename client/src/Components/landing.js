import React from "react";
import { Link } from "react-router-dom";

function landing({ closeMenu }) {
  return (
    <section className="landing__mainContent ">
      <div className="landing__content">
        <h1>Wear</h1>
        <h1>A Mask</h1>
        <div>
          <p>Wearing a mask helps prevent the spread of Covid-19</p>
        </div>
        <div className="landing__buttonContainer">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <div className="landing__getStartedButton">Get Started</div>
          </Link>
        </div>
      </div>
      <div className="landing__images">
        <img className="orangeBackgroundImg" src="/models_with_bg.png"></img>
      </div>
    </section>
  );
}

export default landing;
