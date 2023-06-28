import React from "react"
import { Link } from "react-router-dom"
import { Button, Container } from "reactstrap"
import ROUTES from "../../constants/routes"
import logo from "../../assets/logo.png"
import steps from "../../constants/homeSteps"
import "./Home.css"
import SignUp from "../SignUp"

function Home() {
  return (
    <div className="home">
      <nav className="nav home-navbar d-flex justify-content-between">
        <div className="title_container d-flex">
          <img src={logo} alt="logo" className="logo" />
          <div className="site-title">Planning Poker</div>
        </div>
        <div className="btn_container d-flex justify-content-evenly align-items-center">
          <SignUp />
          <Link to={ROUTES.GUEST_PATH}>
            <Button color="primary" size="lg" className="btn-login-as-guest">
              Guest?
            </Button>
          </Link>
        </div>
      </nav>
      <Container className="home-main-container d-flex flex-column justify-content-evenly">
        <div className="home_title_container d-flex justify-content-center">
          <span className="home_title">Press Play on Planning Poker Online</span>
        </div>
        <div className="home_subtitle_container d-flex justify-content-center">
          <span className="home_subtitle ">
            3 Simple Steps to Start Your Story Estimates
          </span>
        </div>
        <Container className="home-steps-container d-flex justify-content-evenly align-items-center">
          {steps.map((step) => (
            <div
              className="step-container d-flex justify-content-evenly align-items-center flex-column"
              key={step.title}
            >
              <img src={step.image} alt="step" className="step-image-container" />
              <span className="step-title-container">{step.title}</span>
              <p className="step-subtitle-container text-center">{step.subtitle}</p>
            </div>
          ))}
        </Container>
      </Container>
    </div>
  )
}
export default Home
