import React from "react";

function landing({ closeMenu }) {
  return (
    <section className="landing__mainContent ">
      <div className="landing__content">
        <h1>Wear A Mask</h1>
        <div>
          <p>Wearing a mask helps prevent the spread of Covid-19</p>
          <div className="landing__getStartedButton">Get Started</div>
        </div>
      </div>
      <div className="landing__images">
        <img className="peopleImg" src="/mask_models.png"></img>
        <img className="orangeBackgroundImg" src="/orange_background.png"></img>
      </div>
    </section>
  );
}

export default landing;
