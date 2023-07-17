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
    <div className="spec-mode d-flex align-items-center">
      {specMode ? (
        <i className="fa fa-eye-slash spec-icon ms-3"></i>
      ) : (
        <i className="fa fa-eye spec-icon ms-3"></i>
      )}
      <span className="spec-mode-label ms-2">Spectator Mode</span>
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
    </div>
  )
}

export default React.memo(SpecMode)
