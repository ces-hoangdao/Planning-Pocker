import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getRoomById } from "../../api/services/roomService"
import RoomHeader from "./components/RoomHeader"
import RoomFooter from "./components/RoomFooter"
import { SocketContext } from "../../context/SocketContext"
import SOCKET_EVENT from "../../constants/socket_event"
import "./PlanningRoom.css"
import { UserContext } from "../../context/userContext"

function PlanningRoom() {
  const [votingSystem, setVotingSystem] = useState([])
  const { user } = useContext(UserContext)
  const { socket } = useContext(SocketContext)

  const [gameName, setGameName] = useState("")

  const { id } = useParams()

  const getGameName = async () => {
    const res = await getRoomById(id)
    setGameName(res.data.name === "" ? "Planning poker game" : res.data.name)
    setVotingSystem(res.data.votingSystem)
  }

  useEffect(() => {
    getGameName()
    if (id) {
      socket.emit(SOCKET_EVENT.USER.JOIN, {
        userId: user._id,
        username: user.name,
        roomId: id,
      })
    }
  }, [id])

  return (
    <div className="room">
      <div className="room__container position-relative vh-100 w-100 d-flex flex-column justify-content-between">
        <RoomHeader gameName={gameName} />
        <RoomFooter votingSystem={votingSystem} />
      </div>
    </div>
  )
}

export default PlanningRoom
