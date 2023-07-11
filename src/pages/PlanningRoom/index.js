import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import RoomHeader from "./components/RoomHeader"
import RoomBody from "./components/RoomBody"
import RoomFooter from "./components/RoomFooter"
import LoginAsGuest from "../LoginAsGuest"
import { getRoomById } from "../../api/services/roomService"
import { getUserById } from "../../api/services/userService"
import { RoomContext } from "../../context/roomContext"
import Issues from "./components/Issues"
import IssueContextProvider from "../../context/issueContext"
import "./PlanningRoom.css"

function PlanningRoom() {
  const { room, setRoom } = useContext(RoomContext)
  const { id } = useParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen)
  }

  const getGameName = async () => {
    const res = await getRoomById(id)
    setRoom(res.data)
  }

  const checkUserLoggedIn = async () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      const res = await getUserById(userId)
      if (res.success) {
        setIsLoggedIn(true)
      }
    }
  }

  useEffect(() => {
    checkUserLoggedIn()
    getGameName()
  }, [id])

  const widthClassName = isOpen ? "room__container--offcanvas" : "w-100"

  return (
    room && (
      <div className="room">
        {!isLoggedIn && <LoginAsGuest isLoggedIn={isLoggedIn} />}
        <div
          className={`room__container position-relative vh-100 d-flex flex-column justify-content-between ${widthClassName}`}
        >
          <RoomHeader
            gameName={room.name || "Planning poker game"}
            toggleOffCanvas={toggleOffCanvas}
          />
          <RoomBody />
          <RoomFooter votingSystem={room.votingSystem} />
        </div>
        <IssueContextProvider>
          <Issues isOpen={isOpen} toggleOffCanvas={toggleOffCanvas} />
        </IssueContextProvider>
      </div>
    )
  )
}

export default PlanningRoom
