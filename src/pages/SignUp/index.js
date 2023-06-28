import React, { useState, useEffect } from "react"
import {
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import "./SignUp.css"
import { signUp } from "../../api/services/authService"

function SignUp() {
  const [SignUpmodal, setSignUpModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false)
  const [showPassError, setShowPassError] = useState(false)
  const [showPassConfirmError, setShowPassConfirmError] = useState(false)
  const [userName, setUserName] = useState("")
  const [userNameValid, setUserNameValid] = useState(false)
  const [showUsernameError, setShowUserNameError] = useState(false)

  const toggle = () => setSignUpModal(!SignUpmodal)

  const validateUserName = () => userName.length > 0

  const validateEmail = () => {
    const regex = /^\S+@\S+\.\S+$/
    return regex.test(email)
  }

  const validatePassword = () => password.length > 7

  const validateConfirmPassword = () => confirmPassword === password

  useEffect(() => {
    setUserNameValid(validateUserName())
    setEmailValid(validateEmail())
    validateConfirmPassword()
    setPasswordValid(validatePassword())
    setConfirmPasswordValid(validateConfirmPassword())
  }, [email, password, confirmPassword])

  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setShowPassError(false)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setShowPassConfirmError(false)
  }

  const handleSubmit = async (event) => {
    // console.log and alert are for debugging and testing purposes only
    event.preventDefault()
    if (userNameValid && emailValid && passwordValid && confirmPasswordValid) {
      let res
      try {
        res = await signUp(userName, email, password)
        console.log(res)
        alert("User created successfully")
        toggle()
      } catch (error) {
        console.error(error)
        alert("Failed to create user")
      }
    } else {
      setShowUserNameError(!userNameValid)
      setShowEmailError(!emailValid)
      setShowPassError(!passwordValid)
      setShowPassConfirmError(!confirmPasswordValid)
    }
  }

  return (
    <div>
      <button type="button" className="btn-signup bg-transparent" onClick={toggle}>
        Sign Up
      </button>
      <Modal
        isOpen={SignUpmodal}
        toggle={toggle}
        className="modal-dialog modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userName">Username</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                className="input-signup"
                onChange={handleUserNameChange}
                invalid={!userNameValid}
              />
            </FormGroup>
            {showUsernameError && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> Please enter a username.{" "}
              </div>
            )}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                invalid={!emailValid}
                className="input-signup"
              />
            </FormGroup>
            {showEmailError && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> Please enter a correct email.{" "}
              </div>
            )}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                invalid={!passwordValid}
                className="input-signup"
              />
            </FormGroup>
            {showPassError && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> Please enter a password.{" "}
              </div>
            )}
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                invalid={!confirmPasswordValid}
                className="input-signup"
              />
            </FormGroup>
            {showPassConfirmError && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> Please enter password again.{" "}
              </div>
            )}
          </Form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-evenly">
          <button
            type="button"
            className="btn-signup bg-transparent"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="btn-signup bg-transparent"
            onClick={toggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default SignUp
