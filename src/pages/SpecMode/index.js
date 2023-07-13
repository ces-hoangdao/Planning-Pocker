import React, { useContext } from "react"
import { Switch } from "@mui/material"
import { SocketContext } from "../../context/SocketContext"
import SOCKET_EVENT from "../../constants/socket_event"
import { RoomContext } from "../../context/roomContext"
import "./SpecMode.css"

function SpecMode() {
  const { socket } = useContext(SocketContext)
  const { specMode, setSpecMode } = useContext(RoomContext)

  const handleSpecMode = () => {
    setSpecMode(!specMode)
    socket.emit(SOCKET_EVENT.USER.SPECTATOR_MODE, { specMode: !specMode })
  }

  return (
    <div className="spec-mode">
      {!specMode ? (
        <i className="fa fa-eye"></i>
      ) : (
        <i className="fa fa-eye-slash"></i>
      )}
      <span className="spec-mode-label">Spectator Mode</span>
      <Switch checked={specMode} onChange={handleSpecMode} color="primary" />
    </div>
  )
}

export default React.memo(SpecMode)
