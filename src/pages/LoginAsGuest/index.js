import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import SignUp from "../SignUp"
import { guestLogin } from "../../api/services/authService"
import { ROUTES } from "../../constants/routes"
import "./LoginAsGuest.css"
import { UserContext } from "../../context/userContext"

function LoginAsGuest() {
  const [modal, setModal] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [showError, setShowError] = useState(false)

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const toggle = () => setModal(!modal)

  const handleInputChange = (event) => {
    setGuestName(event.target.value)
    setShowError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (guestName.trim() === "") {
      setShowError(true)
    } else {
      const res = await guestLogin(guestName)
      if (res.success) {
        localStorage.setItem("userId", res.data._id)
        setUser({
          userId: res.data._id,
          username: res.data.name,
        })
        navigate(`${ROUTES.NEW_GAME_PATH}`)
      }
    }
  }

  return (
    <div className="login-as-guest">
      <Button color="primary" className="btn-start-new-game" onClick={toggle}>
        Start new game
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered className="modal-guest">
        <ModalHeader toggle={toggle}>Choose your display name</ModalHeader>
        <ModalBody>
          <form className="form-login-as-guest" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className="input-guest-name"
              placeholder="Your display name"
              value={guestName}
              onChange={handleInputChange}
            />
            {showError && (
              <div className="error-message">
                <i className="fa fa-warning" /> Please enter a display name
              </div>
            )}
            <Button
              block
              color="primary"
              size="lg"
              className="btn-continue"
              onClick={handleSubmit}
            >
              Continue to game
            </Button>
          </form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between align-items-center">
          <Button outline color="primary" className="option" onClick={toggle}>
            Login
          </Button>
          <SignUp />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default LoginAsGuest
