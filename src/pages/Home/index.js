import React, { useContext } from "react"
import { UncontrolledDropdown, DropdownToggle, Button, Container } from "reactstrap"
import { Link } from "react-router-dom"
import nameLength from "../../utils/NameLength"
import SignUp from "../SignUp"
import Login from "../Login"
import logo from "../../assets/logo.png"
import steps from "../../constants/homeSteps"
import { UserContext } from "../../context/userContext"
import ChangeProfile from "../ChangeProfile"
import { ROUTES } from "../../constants/routes"
import defaultUserPhoto from "../../assets/user_photo.png"
import "./Home.css"

function Home() {
  const { user } = useContext(UserContext)

  return (
    <div className="home">
      <nav className="nav home-navbar d-flex justify-content-between align-items-center">
        <div className="title_container d-flex">
          <img src={logo} alt="logo" className="logo" />
          <div className="site-title">Planning Poker</div>
        </div>
        <div className="btn_container d-flex justify-content-end align-items-center">
          {user._id ? (
            <UncontrolledDropdown direction="down" className="dropdown-container">
              <DropdownToggle
                color="primary"
                className="btn-dropdown btn-user-dropdown"
              >
                <img src={user.photoURL || defaultUserPhoto} alt="" />
                {nameLength(user.name)}
                <i className="fas fa-chevron-down" />
              </DropdownToggle>
              <ChangeProfile />
            </UncontrolledDropdown>
          ) : (
            <>
              <Login />
              <SignUp />
            </>
          )}
          <Link to={ROUTES.NEW_GAME_PATH}>
            <Button color="primary" className="btn-start-new-game">
              Start new game
            </Button>
          </Link>
        </div>
      </nav>
      <Container className="home-main-container d-flex flex-column justify-content-center">
        <div className="home_title_container d-flex justify-content-center align-items-center">
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
              className="step-container d-flex flex-column justify-content-between align-items-center"
              key={step.title}
            >
              <img src={step.image} alt="step" className="step-image-container" />
              <span className="step-title-container text-center">{step.title}</span>
              <p className="step-subtitle-container text-center">{step.subtitle}</p>
            </div>
          ))}
        </Container>
      </Container>
    </div>
  )
}
export default Home
