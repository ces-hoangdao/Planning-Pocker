import React, { useContext } from "react"
import { Form, FormGroup, Input } from "reactstrap"
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
    <div className="spec-mode d-flex">
      {specMode ? (
        <i className="fa fa-eye-slash spec-icon ms-3 mt-1"></i>
      ) : (
        <i className="fa fa-eye spec-icon ms-3 mt-1"></i>
      )}
      <Form className="switch-container d-flex">
        <FormGroup switch>
          <Input
            type="switch"
            role="switch"
            onClick={handleSpecMode}
            checked={specMode}
          />
        </FormGroup>
      </Form>
      <span className="spec-mode-label">Spectator Mode</span>
    </div>
  )
}

export default React.memo(SpecMode)
