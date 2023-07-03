import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import { createRoom } from "../../api/services/roomService"
import logo from "../../assets/logo.png"
import "./NewGame.css"

function NewGame() {
  const [roomName, setRoomName] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    setRoomName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await createRoom(roomName.trim())
    if (res.success) {
      const roomId = res.data._id
      navigate(`/room/${roomId}`)
    }
  }

  return (
    <div className="new-game">
      <div className="new-game__header">
        <Link to="/">
          <img className="site-logo" src={logo} alt="" />
        </Link>
        <span className="title-new-game">Create game</span>
      </div>
      <div className="new-game__main">
        <span className="subtitle">Choose a name for your game</span>
        <Form className="form-new-game" onSubmit={handleSubmit}>
          <FormGroup>
            <Label size="lg" for="input-game-name" className="label-game-name">
              Game&apos;s name
            </Label>
            <Input
              className="input-game-name"
              bsSize="lg"
              id="input-game-name"
              name="input-game-name"
              placeholder="Enter a game's name"
              value={roomName}
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button
            block
            color="primary"
            size="lg"
            className="btn-create-game"
            onClick={handleSubmit}
          >
            Create game
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default NewGame
