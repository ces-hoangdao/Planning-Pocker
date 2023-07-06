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
import InvitePlayers from "../../../InvitePlayers"
import ChangeProfile from "../../../ChangeProfile"
import { UserContext } from "../../../../context/userContext"
import { ROUTES } from "../../../../constants/routes"
import defaultUserPhoto from "../../../../assets/user_photo.png"
import logo from "../../../../assets/logo.png"
import "./RoomHeader.css"

function RoomHeader(props) {
  const { gameName, toggleOffCanvas } = props
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
                <img src={user.photoURL || defaultUserPhoto} alt="" />
                {user.name}
                <i className="fas fa-chevron-down" />
              </DropdownToggle>
              <ChangeProfile />
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <InvitePlayers gameUrl={window.location.href} />
          </NavItem>
          <NavItem>
            <Button
              color="primary"
              outline
              className="option-button"
              onClick={toggleOffCanvas}
            >
              <i className="fa fa-list" />
            </Button>
          </NavItem>
        </Nav>
      </div>
    </div>
  )
}

export default RoomHeader
