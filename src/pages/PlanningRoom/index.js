import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import RoomHeader from "./components/RoomHeader"
import RoomBody from "./components/RoomBody"
import RoomFooter from "./components/RoomFooter"
import "./PlanningRoom.css"
import { getRoomById } from "../../api/services/roomService"
import { RoomContext } from "../../context/roomContext"
import Issues from "./components/Issues"
import IssueContextProvider from "../../context/issueContext"

function PlanningRoom() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen)
  }

  const [votingSystem, setVotingSystem] = useState([])
  const { setRoom } = useContext(RoomContext)

  const [gameName, setGameName] = useState("")

  const { id } = useParams()

  const getGameName = async () => {
    const res = await getRoomById(id)
    setGameName(res.data.name === "" ? "Planning poker game" : res.data.name)
    setVotingSystem(res.data.votingSystem)
    setRoom(res.data)
  }
  useEffect(() => {
    getGameName()
  }, [id])

  const widthClassName = isOpen ? "room__container--offcanvas" : "w-100"

  return (
    <div className="room">
      <div
        className={`room__container position-relative vh-100 d-flex flex-column justify-content-between ${widthClassName}`}
      >
        <RoomHeader gameName={gameName} toggleOffCanvas={toggleOffCanvas} />
        <RoomBody />
        <RoomFooter votingSystem={votingSystem} />
      </div>
      <IssueContextProvider>
        <Issues isOpen={isOpen} toggleOffCanvas={toggleOffCanvas} />
      </IssueContextProvider>
    </div>
  )
}

export default PlanningRoom
