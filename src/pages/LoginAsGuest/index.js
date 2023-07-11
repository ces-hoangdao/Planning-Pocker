import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { UserContext } from "../../context/userContext"
import Login from "../Login"
import SignUp from "../SignUp"
import { guestLogin } from "../../api/services/authService"
import "./LoginAsGuest.css"

function LoginAsGuest({ isLoggedIn }) {
  const [showModal, setShowModal] = useState(!isLoggedIn)
  const [guestName, setGuestName] = useState("")
  const [showError, setShowError] = useState(false)

  const { setUser } = useContext(UserContext)

  const toggle = () => setShowModal(!showModal)

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
        setUser(res.data)
        toggle()
      }
    }
  }

  return (
    <div className="login-as-guest">
      <Modal isOpen={showModal} centered className="modal-guest">
        <ModalHeader>Choose your display name</ModalHeader>
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
          <Login />
          <SignUp />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default LoginAsGuest
