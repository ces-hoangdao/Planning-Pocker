import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRoomById } from "../../api/services/roomService"
import RoomHeader from "./components/RoomHeader"
import RoomFooter from "./components/RoomFooter"
import "./PlanningRoom.css"

function PlanningRoom() {
  const [votingSystem, setVotingSystem] = useState([])

  const [gameName, setGameName] = useState("")

  const { roomId } = useParams()

  const getGameName = async () => {
    const res = await getRoomById(roomId.trim())
    setGameName(res.data.name === "" ? "Planning poker game" : res.data.name)
    setVotingSystem(res.data.votingSystem)
  }

  useEffect(() => {
    getGameName()
  }, [roomId])

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
