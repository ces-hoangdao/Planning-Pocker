import React, { useState } from "react"
import guestLogin from "../../api/services/authService"
import "./LoginAsGuest.css"

function LoginAsGuest() {
  const [guestName, setGuestName] = useState("")
  const [showError, setShowError] = useState(false)

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
      setGuestName(res.data.name)
    }
  }

  return (
    <div className="login-as-guest">
      <h3 className="title">Choose your display name</h3>
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
            {" "}
            <i className="fa fa-warning" /> Please enter a display name.{" "}
          </div>
        )}
        <button
          type="submit"
          className="button button--primary button-continue"
          onClick={handleSubmit}
        >
          Continue to game
        </button>
        <div className="layout--flex bottom-option">
          <span className="option">Login</span>
          <span className="option">Sign Up</span>
        </div>
      </form>
    </div>
  )
}

export default LoginAsGuest
