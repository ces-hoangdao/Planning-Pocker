import React, { useContext, useState } from "react"
import {
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import SignUp from "../SignUp"
import validateEmail from "../../utils/ValidateUtils"
import PASS_LIMIT from "../../constants/authConst"
import googleIcon from "../../assets/google.png"
import BASE_URL from "../../constants/baseURL"
import { ROUTES } from "../../constants/routes"
import { login } from "../../api/services/authService"
import { UserContext } from "../../context/userContext"
import "./Login.css"

const initialState = {
  email: "",
  password: "",
}

function Login() {
  const { setUser } = useContext(UserContext)

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
        const res = await login(userLoginData.email, userLoginData.password)
        localStorage.setItem("userId", res.data._id)
        setUser(res.data)
        successLogin()
        toggle()
        setUserLoginData(initialState)
        navigate(ROUTES.HOME_PATH)
      } catch (err) {
        failLogin()
      }
    } else {
      setErrorsMessage()
    }
  }

  const handleSubmit = (event) => {
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
        className="modal-dialog modal-dialog-centered modal-login"
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody className="d-flex flex-column justify-content-evenly mt-3">
          <button
            type="button"
            className="btn-google d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="google" className="google-icon" />
            <span className="fs-3">Login with Google</span>
          </button>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="line"></div>
            <div className="px-3 fs-3">or</div>
            <div className="line"></div>
          </div>
          <Form className="form-login">
            <FormGroup>
              <Label for="email" className="fs-3">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userLoginData.email}
                onChange={handleChange}
                // @ts-ignore
                invalid={userLoginData.email ? errorMessages.emailError : null}
                className="input-login"
              />
            </FormGroup>
            {errors.emailError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.emailError}
              </div>
            )}
            <FormGroup>
              <Label for="password" className="fs-3">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={userLoginData.password}
                onChange={handleChange}
                // @ts-ignore
                invalid={userLoginData.password ? errorMessages.passwordError : null}
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
        <ModalFooter className="d-flex flex-column justify-content-center align-items-center gap-4">
          <Button
            block
            color="primary"
            size="lg"
            className="btn-login fs-3"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="d-flex justify-content-center align-items-center bottom-option--signup">
            <span>Create new account?</span>
            <SignUp />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Login