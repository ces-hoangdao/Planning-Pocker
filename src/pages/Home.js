import React from "react";
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png";
import Popup from "reactjs-popup";
import Login from "../form/LoginForm";
import step1 from "../assets/step1.svg";
import step2 from "../assets/step2.svg";
import step3 from "../assets/step3.svg";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="body">
      <nav className="nav">
        <div to="/" className="title_container">
          <img src={logo} alt="logo" className="logo" />
          <div className="site-title">Planning Poker</div>
        </div>
        <div className="btn_container">
          <div className="login_btn_container">
            <Popup
              modal
              trigger={
                <button className="login_btn">
                  <div to="/login" className="login_btn_content">
                    Login
                  </div>
                </button>
              }
            >
              {(close) => <Login close={close} />}
            </Popup>
          </div>
          <div className="signup_btn_container">
            <button className="signup_btn">
              <div className="signup_btn_content">
                Sign up
              </div>
            </button>
          </div>
          <div className="guest_btn_container">
            <button className="guest_btn">
              <Link to='login-as-guest' className="guest_btn_content">
                Guest?
              </Link>
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
        <div className="step1_container">
          <img src={step1} alt="step1" className="step1_img" />
        </div>
        <div className="step2_container">
          <img src={step2} alt="step2" className="step2_img" />
        </div>
        <div className="step3_container">
          <img src={step3} alt="step3" className="step3_img" />
        </div>
      </div>
      <div className="home_steps_title_container">
        <div className="step1_title_container">
          <h1>Step 1: Initiate a New Game</h1>
        </div>
        <div className="step2_title_container">
          <h1>Step 2: Invite Your Agile Development Team</h1>
        </div>
        <div className="step3_title_container">
          <h1>Step 3: Vote!</h1>
        </div>
      </div>
      <div className="home_steps_subtitle_container">
        <div className="step1_subtitle_content">
          <p>Start new game with the option to add your issues right off the bat.</p>
        </div>
        <div className="step2_subtitle_content">
          <p>Send your new game URL to your people and let the game begin.</p>
        </div>
        <div className="step3_subtitle_content">
          <p>Enjoy every aspect of our online scrum planning poker – and have fun while being productive!</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
