import { Link } from "react-router-dom"
import React, { useContext, useState, useEffect, useRef } from "react"
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
import VotingHistory from "./components/VotingHistory"
import { UserContext } from "../../../../context/userContext"
import { RoomContext } from "../../../../context/roomContext"
import { SocketContext } from "../../../../context/SocketContext"
import { ROOM_DEFAULT_NAME } from "../../../../constants/roomConst"
import { ROUTES } from "../../../../constants/routes"
import SOCKET_EVENT from "../../../../constants/socket_event"
import defaultUserPhoto from "../../../../assets/user_photo.png"
import logo from "../../../../assets/logo.png"
import { GAME_NAME_LIMIT } from "../../../../constants/authConst"
import "./RoomHeader.css"

function RoomHeader({ gameName, toggleOffCanvas }) {
  const { user } = useContext(UserContext)
  const { room, setRoom, selectedIssue } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)
  const [isEditing, setIsEditing] = useState(false)
  const [roomName, setRoomName] = useState("")
  const inputRef = useRef(null)

  const [modalHistory, setModalHistory] = useState(false)
  const toggleModalHistory = () => setModalHistory((prev) => !prev)

  const handleInputGameNameChange = (event) => {
    setRoomName(event.target.value)
  }

  const handleInputGameNameFocus = () => {
    inputRef.current.focus()
    setIsEditing(true)
  }

  const handleInputGameNameBlur = () => {
    handleSubmit()
    setIsEditing(false)
  }

  const handleSubmit = () => {
    setRoom((current) => ({
      ...current,
      name: roomName,
    }))
    socket.emit(SOCKET_EVENT.ROOM.NAME_CHANGE, { name: roomName })
  }

  useEffect(() => {
    if (room) {
      setRoomName(room.name || ROOM_DEFAULT_NAME)
    }
  }, [room])

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.NAME_CHANGE, (data) => {
      setRoom((current) => ({
        ...current,
        name: data.name,
      }))
    })
  }, [])

  return (
    <div className="d-flex justify-content-between align-items-center room__header">
      <Nav className="d-flex justify-content-start align-items-center left-side-header">
        <NavItem>
          <Link to={ROUTES.HOME_PATH}>
            <img className="site-logo" src={logo} alt="" />
          </Link>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown direction="down" className="dropdown-container">
            <DropdownToggle
              color="primary"
              className="btn-dropdown btn-game-dropdown"
            >
              {gameName}
              <i className="fas fa-chevron-down" />
            </DropdownToggle>
            <DropdownMenu className="border-0 mt-3 p-0">
              <DropdownItem
                className="d-flex justify-content-between align-items-center item-game-name"
                header
              >
                <input
                  id="input-edit-game-name"
                  className="input-edit-game-name"
                  size={roomName.length}
                  ref={inputRef}
                  value={roomName}
                  onChange={handleInputGameNameChange}
                  onFocus={handleInputGameNameFocus}
                  onBlur={handleInputGameNameBlur}
                  maxLength={GAME_NAME_LIMIT}
                />
                {isEditing && (
                  <button
                    type="button"
                    className="btn-done"
                    onClick={handleInputGameNameBlur}
                  >
                    <i className="fa fa-check" />
                  </button>
                )}
                {!isEditing && (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={handleInputGameNameFocus}
                  >
                    <i className="fa-regular fa-pen-to-square" />
                  </button>
                )}
              </DropdownItem>
              <DropdownItem divider className="m-0" />
              <DropdownItem className="item" onClick={toggleModalHistory}>
                <i className="fa fa-history" />
                Voting history
              </DropdownItem>
              <VotingHistory
                modalHistory={modalHistory}
                toggleModalHistory={toggleModalHistory}
              />
            </DropdownMenu>
          </UncontrolledDropdown>
          {selectedIssue && (
            <div className="voting-issue-wrapper">
              <span className="voting-issue-label">Voting: </span>
              <span className="voting-issue-name">{selectedIssue.name}</span>
            </div>
          )}
        </NavItem>
      </Nav>
      <Nav className="d-flex justify-content-end align-items-center right-side-header">
        <NavItem>
          <UncontrolledDropdown direction="down" className="dropdown-container">
            <DropdownToggle
              color="primary"
              className="btn-dropdown btn-user-dropdown"
            >
              <img src={user?.photoURL || defaultUserPhoto} alt="" />
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
  )
}

export default RoomHeader
