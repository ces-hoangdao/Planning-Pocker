import React, { useEffect, useState, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import Fireworks from "@fireworks-js/react"
import RoomHeader from "./components/RoomHeader"
import RoomBody from "./components/RoomBody"
import RoomFooter from "./components/RoomFooter"
import { getRoomById } from "../../api/services/roomService"
import { getUserById } from "../../api/services/userService"
import { RoomContext } from "../../context/roomContext"
import { SocketContext } from "../../context/SocketContext"
import { ROOM_DEFAULT_NAME, ROOM_STATUS } from "../../constants/roomConst"
import { UserContext } from "../../context/userContext"
import SOCKET_EVENT from "../../constants/socket_event"
import IssueContextProvider from "../../context/issueContext"
import Issues from "./components/Issues"
import LoginAsGuest from "../LoginAsGuest"
import "./PlanningRoom.css"

const FIREWORK_Z_INDEX_ON = 0
const FIREWORK_Z_INDEX_OFF = -1

function PlanningRoom() {
  const { room, setRoom, setUsers, setSelectedIssue } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [voteResult, setVoteResult] = useState(null)
  const [specMode, setSpecMode] = useState(false)
  const [fireworkIndex, setFireWorkIndex] = useState(FIREWORK_Z_INDEX_OFF)

  const fireworkRef = useRef()
  const { id } = useParams()

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.REVEAL, (data) => {
      setVoteResult(data)
      setRoom((current) => ({ ...current, status: ROOM_STATUS.CONCLUDED }))
    })
    socket.on(SOCKET_EVENT.ROOM.START, (resetIssue) => {
      setRoom((current) => ({ ...current, status: ROOM_STATUS.VOTING }))
      if (resetIssue) setSelectedIssue(null)
    })
  }, [])

  useEffect(() => {
    if (user._id)
      socket.on(SOCKET_EVENT.USER.SPECTATOR_MODE, (data) => {
        if (data.userId === user._id) {
          setSpecMode(data.specMode)
        }
      })
  }, [user])

  useEffect(() => {
    if (room) setIsRevealed(room.status === ROOM_STATUS.CONCLUDED)
  }, [room])

  const getGameName = async () => {
    const res = await getRoomById(id)
    const { voting, currentResults, ...roomData } = res.data
    localStorage.setItem("roomId", res.data._id)
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
    if (room) setIsRevealed(room.status === ROOM_STATUS.CONCLUDED)
  }, [room])

  useEffect(() => {
    if (!fireworkRef.current) return

    if (isRevealed) {
      // @ts-ignore
      if (!fireworkRef.current.isRunning) {
        // @ts-ignore
        fireworkRef.current.start()
      }
      setTimeout(() => fireWorkOff(), 3000)
      setFireWorkIndex(FIREWORK_Z_INDEX_ON)
    } else {
      fireWorkOff()
    }
  }, [isRevealed])

  const fireWorkOff = () => {
    // @ts-ignore
    if (fireworkRef.current.isRunning) {
      // @ts-ignore
      fireworkRef.current.stop()
    }
    setFireWorkIndex(FIREWORK_Z_INDEX_OFF)
  }

  const widthClassName = isOpen ? "room__container--offcanvas" : "w-100"

  return (
    room && (
      <div className="room">
        {!isLoggedIn && <LoginAsGuest isLoggedIn={isLoggedIn} />}
        <div
          className={`room__container vh-100 d-flex flex-column justify-content-between ${widthClassName}`}
        >
          <RoomHeader
            gameName={room.name || ROOM_DEFAULT_NAME}
            toggleOffCanvas={toggleOffCanvas}
          />
          <RoomBody isRevealed={isRevealed} />
          <RoomFooter
            votingSystem={room.votingSystem}
            isRevealed={isRevealed}
            voteResult={voteResult}
            specMode={specMode}
          />
        </div>
        <IssueContextProvider>
          <Issues
            isOpen={isOpen}
            toggleOffCanvas={toggleOffCanvas}
            voteResult={voteResult}
          />
        </IssueContextProvider>
        <Fireworks
          ref={fireworkRef}
          options={{
            opacity: 0.5,
          }}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: fireworkIndex,
            background: "transparent",
          }}
        />
      </div>
    )
  )
}

export default PlanningRoom
