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
import "react-toastify/dist/ReactToastify.css"
import "./SignUp.css"
import validateEmail from "../../utils/ValidateUtils"
import PASS_LIMIT from "../../constants/authConst"
import { signUp } from "../../api/services/authService"

function SignUp() {
  const [userSignUpData, setUserSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    userNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  })

  const [signupmodal, setSignUpModal] = useState(false)
  const toggle = () => setSignUpModal(!signupmodal)

  const errorMessages = {
    userNameError:
      userSignUpData.userName.length === 0 ? "Username is required" : "",
    emailError: !validateEmail(userSignUpData.email) ? "Email is required" : "",
    passwordError:
      userSignUpData.password.length < PASS_LIMIT
        ? "Password must be at least 8 characters"
        : "",
    confirmPasswordError:
      userSignUpData.confirmPassword !== userSignUpData.password
        ? "Confirm password is invalid"
        : "",
  }

  const setErrorsMessage = () => {
    setErrors(errorMessages)
  }
  const successSignUp = () => toast.success("Created user!")

  const failSignUp = () => {
    toast.error("Create user failed")
  }

  const handleChange = (event, propertyName) => {
    setUserSignUpData((prevState) => ({
      ...prevState,
      [propertyName]: event.target.value,
    }))
    setErrors((prevState) => ({
      ...prevState,
      [`${propertyName}Error`]: "",
    }))
  }
  const handleSignUp = async () => {
    try {
      await signUp(
        userSignUpData.userName,
        userSignUpData.email,
        userSignUpData.password
      )
      setUserSignUpData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      toggle()
      successSignUp()
    } catch (err) {
      failSignUp()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      userSignUpData.userName &&
      validateEmail(userSignUpData.email) &&
      userSignUpData.password.length >= PASS_LIMIT &&
      userSignUpData.confirmPassword === userSignUpData.password
    ) {
      handleSignUp()
    } else {
      setErrorsMessage()
    }
  }

  return (
    <div>
      <button type="button" className="btn-signup bg-transparent" onClick={toggle}>
        Sign Up
      </button>
      <Modal
        isOpen={signupmodal}
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
                value={userSignUpData.userName}
                onChange={(event) => handleChange(event, "userName")}
                // @ts-ignore
                invalid={errorMessages.userNameError}
              />
            </FormGroup>
            {errors.userNameError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.userNameError}
              </div>
            )}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userSignUpData.email}
                onChange={(event) => handleChange(event, "email")}
                // @ts-ignore
                invalid={errorMessages.emailError}
                className="input-signup"
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
                value={userSignUpData.password}
                onChange={(event) => handleChange(event, "password")}
                // @ts-ignore
                invalid={errorMessages.passwordError}
                className="input-signup"
              />
            </FormGroup>
            {errors.passwordError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.passwordError}
              </div>
            )}
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userSignUpData.confirmPassword}
                onChange={(event) => handleChange(event, "confirmPassword")}
                // @ts-ignore
                invalid={errorMessages.confirmPasswordError}
                className="input-signup"
              />
            </FormGroup>
            {errors.confirmPasswordError && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errors.confirmPasswordError}
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
