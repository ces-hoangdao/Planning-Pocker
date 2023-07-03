import React, { useState } from "react"
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
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import "./Login.css"
import validateEmail from "../../utils/ValidateUtils"
import PASS_LIMIT from "../../constants/authConst"
import googleIcon from "../../assets/google.png"
import BASE_URL from "../../constants/baseURL"
import { ROUTES } from "../../constants/routes"
import { login } from "../../api/services/authService"

const initialState = {
  email: "",
  password: "",
}

function Login() {
  const [userLoginData, setUserLoginData] = useState(initialState)

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  })

  const [loginModal, setLoginModal] = useState(false)
  const toggle = () => setLoginModal(!loginModal)

  function isValidData() {
    return (
      validateEmail(userLoginData.email) &&
      userLoginData.password.length >= PASS_LIMIT
    )
  }

  const errorMessages = {
    emailError: !validateEmail(userLoginData.email) ? "Email is required" : "",
    passwordError:
      userLoginData.password.length < PASS_LIMIT
        ? "Password must be at least 8 characters"
        : "",
  }
  const setErrorsMessage = () => {
    setErrors(errorMessages)
  }
  const successLogin = () => toast.success("Login success!")

  const failLogin = () => toast.error("Login failed!")

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setErrors((prevState) => ({
      ...prevState,
      [`${name}Error`]: "",
    }))
  }
  const handleGoogleLogin = async () => {
    window.open(`${BASE_URL}/auth/google`, "_self")
  }

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (isValidData()) {
      try {
        await login(userLoginData.email, userLoginData.password)
        successLogin()
        toggle()
        setUserLoginData(initialState)
        navigate(ROUTES.NEW_GAME_PATH)
      } catch (err) {
        failLogin()
      }
    } else {
      setErrorsMessage()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrors(errorMessages)
    if (isValidData()) {
      handleLogin()
    } else {
      setErrorsMessage()
    }
  }

  return (
    <div>
      <button type="button" className="btn-login bg-transparent" onClick={toggle}>
        Login
      </button>
      <Modal
        isOpen={loginModal}
        toggle={toggle}
        className="modal-dialog modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <button
            type="button"
            className="btn-google d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="google" className="google-icon" />
            <span>Login with Google</span>
          </button>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userLoginData.email}
                onChange={handleChange}
                // @ts-ignore
                invalid={errorMessages.emailError}
                className="input-login"
              />
            </FormGroup>
            {errors.emailError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.emailError}
              </div>
            )}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={userLoginData.password}
                onChange={handleChange}
                // @ts-ignore
                invalid={errorMessages.passwordError}
                className="input-login"
              />
            </FormGroup>
            {errors.passwordError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.passwordError}
              </div>
            )}
          </Form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-evenly">
          <button
            type="button"
            className="btn-login bg-transparent"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            type="button"
            className="btn-login bg-transparent"
            onClick={toggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Login
