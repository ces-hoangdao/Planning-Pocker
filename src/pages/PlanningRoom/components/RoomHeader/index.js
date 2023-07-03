import { Link } from "react-router-dom"
import React, { useContext } from "react"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  Button,
} from "reactstrap"
import { UserContext } from "../../../../context/userContext"
import { ROUTES } from "../../../../constants/routes"
import logo from "../../../../assets/logo.png"
import "./RoomHeader.css"

function RoomHeader(props) {
  const { gameName } = props
  const { user } = useContext(UserContext)

  return (
    <div className="position-absolute d-flex justify-content-between align-items-center room__header">
      <div className="left-side-header">
        <Link to={ROUTES.HOME_PATH}>
          <img className="site-logo" src={logo} alt="" />
        </Link>
        <UncontrolledDropdown direction="down" className="dropdown-container">
          <DropdownToggle color="primary" className="btn-dropdown btn-game-dropdown">
            {gameName}
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
            <UncontrolledDropdown direction="down" className="dropdown-container">
              <DropdownToggle
                color="primary"
                className="btn-dropdown btn-user-dropdown"
              >
                {user.username}
                <i className="fas fa-chevron-down" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="item">
                  <i className="fa fa-user" />
                  Change profile
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
  )
}

export default RoomHeader
