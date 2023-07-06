import React, { useEffect, useContext, useState } from "react"
import "./RoomBody.css"
import PlayerCard from "./components/PlayerCard"
import ButtonReveal from "./components/ButtonReveal"
import { SocketContext } from "../../../../context/SocketContext"
import SOCKET_EVENT from "../../../../constants/socket_event"

function RoomBody() {
  const { socket } = useContext(SocketContext)

  const [voteValue, setVoteValue] = useState("")

  useEffect(() => {
    socket.on(SOCKET_EVENT.USER.VOTE, (data) => {
      setVoteValue(data)
    })
    socket.on(SOCKET_EVENT.ROOM.REVEAL, (data) => {
      console.log(data)
    })
  }, [])

  const handleReveal = () => {
    socket.emit(SOCKET_EVENT.ROOM.REVEAL)
    console.log(voteValue)
  }

  return (
    <div className="room-body top-50 start-50 translate-middle d-flex position-absolute justify-content-center">
      <div className="table-module-wrapper d-flex align-items-center justify-content-center">
        <div className="table-module-container d-inline-grid">
          <div className="table-module-top d-flex align-items-center justify-content-center"></div>
          <div className="table-module-left d-flex align-items-center justify-content-center"></div>
          <div className="table-module-right d-flex align-items-center justify-content-center"></div>
          <div className="table-module-bottom d-flex align-items-center justify-content-center">
            <PlayerCard vote={voteValue} />
          </div>
          <div className="table-module-center d-flex flex-column align-items-center justify-content-center">
            <ButtonReveal vote={voteValue} handleReveal={handleReveal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBody
