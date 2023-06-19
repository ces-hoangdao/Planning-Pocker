import React from "react";
import "../css/Home.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="body">
      <nav className="nav">
        <div to="/home" className="title_container">
          <img src={logo} alt="logo" className="logo" />
          <div className="site-title">Planning Poker</div>
        </div>
        <div className="btn_container">
          <div className="login_btn_container">
            <button className="login_btn">
              <div to="/login" className="login_btn_content">
                Login
              </div>
            </button>
          </div>
          <div className="signup_btn_container">
            <button className="signup_btn">
              <div to="/guest" className="signup_btn_content">
                Sign up
              </div>
            </button>
          </div>
          <div className="guest_btn_container">
            <button className="guest_btn">
              <div to="/guest" className="guest_btn_content">
                Guest?
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className="home_title_container">
        <h1 className="home_title">Press Play on Planning Poker Online</h1>
      </div>
      <div className="home_subtitle_container">
        <h3 className="home_subtitle">
          3 Simple Steps to Start Your Story Estimates
        </h3>
      </div>
      <div className="home_steps_container">
        <div className="step1_container"></div>
        <div className="step2_container"></div>
        <div className="step3_container"></div>
      </div>
    </div>
  );
}
