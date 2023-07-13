import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import RoomHeader from "./components/RoomHeader"
import RoomBody from "./components/RoomBody"
import RoomFooter from "./components/RoomFooter"
import LoginAsGuest from "../LoginAsGuest"
import { getRoomById } from "../../api/services/roomService"
import { getUserById } from "../../api/services/userService"
import { RoomContext } from "../../context/roomContext"
import { SocketContext } from "../../context/SocketContext"
import SOCKET_EVENT from "../../constants/socket_event"
import IssueContextProvider from "../../context/issueContext"
import Issues from "./components/Issues"
import "./PlanningRoom.css"

function PlanningRoom() {
  const { room, setRoom, setUsers } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [voteResult, setVoteResult] = useState(null)
  const [specMode, setSpecMode] = useState(false)

  const { id } = useParams()

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.REVEAL, (data) => {
      setVoteResult(data)
      setIsRevealed(true)
    })
    socket.on(SOCKET_EVENT.ROOM.START, () => {
      setIsRevealed(false)
    })
    socket.on(SOCKET_EVENT.USER.SPECTATOR_MODE, (data) => {
      setSpecMode(data.specMode)
    })
  }, [])

  const getGameName = async () => {
    const res = await getRoomById(id)
    const { voting, currentResults, ...roomData } = res.data
    setRoom(roomData)
    setUsers(voting)
    setVoteResult(currentResults)
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

  useEffect(() => {
    if (room) setIsRevealed(room.status === "concluded")
  }, [room])

  const widthClassName = isOpen ? "room__container--offcanvas" : "w-100"

  return (
    room && (
      <div className="room">
        {!isLoggedIn && <LoginAsGuest isLoggedIn={isLoggedIn} />}
        <div
          className={`room__container vh-100 d-flex flex-column justify-content-between ${widthClassName}`}
        >
          <RoomHeader
            gameName={room.name || "Planning poker game"}
            toggleOffCanvas={toggleOffCanvas}
          />
          <RoomBody isRevealed={isRevealed} specMode={specMode} />
          <RoomFooter
            votingSystem={room.votingSystem}
            isRevealed={isRevealed}
            voteResult={voteResult}
            specMode={specMode}
          />
        </div>
        <IssueContextProvider>
          <Issues isOpen={isOpen} toggleOffCanvas={toggleOffCanvas} />
        </IssueContextProvider>
      </div>
    )
  )
}

export default PlanningRoom
