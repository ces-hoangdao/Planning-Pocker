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
import { ToastContainer, Zoom, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./Login.css"
import validateEmail from "../../utils/ValidateUtils"
import googleIcon from "../../assets/google.png"
import BASE_URL from "../../constants/baseURL"
import { login } from "../../api/services/authService"

function Login() {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  })

  const [Loginmodal, setLoginModal] = useState(false)
  const [showError, setShowError] = useState({
    emailValid: false,
    passwordValid: false,
  })

  const setErrorsMessage = () => {
    setErrors({
      emailError: !validateEmail(userLoginData.email) ? "Email is required" : "",
      passwordError:
        userLoginData.password.length <= 7
          ? "Password must be at least 8 characters"
          : "",
    })
  }

  const successAlert = () =>
    toast.success("Login success !", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })

  const failAlert = () => {
    toast.error("Login failed", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const toggle = () => setLoginModal(!Loginmodal)

  const handleChange = (event, propertyName) => {
    setUserLoginData((prevState) => ({
      ...prevState,
      [propertyName]: event.target.value,
    }))
  }

  const handleLogin = async () => {
    if (validateEmail(userLoginData.email) && userLoginData.password.length > 7)
      try {
        await login(userLoginData.email, userLoginData.password)

        successAlert()
        toggle()
        setUserLoginData({
          email: "",
          password: "",
        })
      } catch (err) {
        failAlert()
      }
    else {
      setShowError({
        emailValid: !validateEmail(userLoginData.email),
        passwordValid: userLoginData.password.length <= 7,
      })
      setErrorsMessage()
    }
  }

  const handleGoogleLogin = async () => {
    window.open(`${BASE_URL}/auth/google`, "_self")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin()
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
        pauseOnHover
        theme="light"
      />
      <button type="button" className="btn-login bg-transparent" onClick={toggle}>
        Login
      </button>
      <Modal
        isOpen={Loginmodal}
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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userLoginData.email}
                onChange={(event) => handleChange(event, "email")}
                invalid={!validateEmail(userLoginData.email)}
                className="input-login"
              />
            </FormGroup>
            {showError.emailValid && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> {errors.emailError}{" "}
              </div>
            )}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={userLoginData.password}
                onChange={(event) => handleChange(event, "password")}
                invalid={userLoginData.password.length <= 7}
                className="input-login"
              />
            </FormGroup>
            {showError.passwordValid && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> {errors.passwordError}{" "}
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
