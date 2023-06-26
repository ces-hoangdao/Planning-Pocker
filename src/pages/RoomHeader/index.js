import { Link } from "react-router-dom"
import React from "react"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  Button,
} from "reactstrap"
import logo from "../../assets/logo.png"
import ROUTES from "../../constants/routes"
import "./RoomHeader.css"

function RoomHeader() {
  return (
    <div className="room">
      <div className="room__container d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center room__header">
          <div className="left-side-header">
            <Link to={ROUTES.HOME_PATH}>
              <img className="site-logo" src={logo} alt="" />
            </Link>
            <UncontrolledDropdown direction="down" className="dropdown-container">
              <DropdownToggle
                color="primary"
                className="btn-dropdown btn-game-dropdown"
              >
                Game&apos;s name
                <i className="fas fa-chevron-down" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="item">
                  <i className="fa fa-gear" />
                  Game settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="item">
                  <i className="fa fa-history" />
                  Voting history
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="right-side-header">
            <Nav className="d-flex justify-content-between align-items-center">
              <NavItem>
                <UncontrolledDropdown
                  direction="down"
                  className="dropdown-container"
                >
                  <DropdownToggle
                    color="primary"
                    className="btn-dropdown btn-user-dropdown"
                  >
                    Username
                    <i className="fas fa-chevron-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="item">
                      <i className="fa fa-user" />
                      My profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="item">
                      <i className="fa fa-sign-out" />
                      Sign out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <Button color="primary" outline className="option-button">
                  <i className="fa fa-user-plus" /> Invite players
                </Button>
              </NavItem>
              <NavItem>
                <Button color="primary" outline className="option-button">
                  <i className="fa fa-list" />
                </Button>
              </NavItem>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomHeader
