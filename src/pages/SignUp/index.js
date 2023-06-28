import React, { useEffect, useState } from "react"
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
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/ValidateUtils"
import { signUp } from "../../api/services/authService"

function SignUp() {
  const [userSignUpData, setUserSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [validData, setValidData] = useState({
    userNameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
  })

  const [errors, setErrors] = useState({
    userNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  })

  const setErrorsMessage = () => {
    setErrors({
      userNameError: !validData.userNameValid ? "Username is required" : "",
      emailError: !validData.emailValid ? "Email is required" : "",
      passwordError: !validData.passwordValid
        ? "Password must be at least 8 characters"
        : "",
      confirmPasswordError: !validData.confirmPasswordValid
        ? "Confirm password is invalid"
        : "",
    })
  }

  const [SignUpmodal, setSignUpModal] = useState(false)
  const [showError, setShowError] = useState({
    userNameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
  })

  const toggle = () => setSignUpModal(!SignUpmodal)

  useEffect(() => {
    setValidData({
      ...validData,
      userNameValid: validateUserName(userSignUpData.userName),
      emailValid: validateEmail(userSignUpData.email),
      passwordValid: validatePassword(userSignUpData.password),
      confirmPasswordValid: validateConfirmPassword(
        userSignUpData.confirmPassword,
        userSignUpData.password
      ),
    })
  }, [userSignUpData])

  const handleChange = (event, propertyName) => {
    setUserSignUpData((prevState) => ({
      ...prevState,
      [propertyName]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      validData.userNameValid &&
      validData.emailValid &&
      validData.passwordValid &&
      validData.confirmPasswordValid
    ) {
      try {
        await signUp(
          userSignUpData.userName,
          userSignUpData.email,
          userSignUpData.password
        )

        alert("User created successfully")
        toggle()
      } catch (err) {
        alert("Failed to create user")
      }
    } else {
      setShowError({
        userNameValid: !validData.userNameValid,
        emailValid: !validData.emailValid,
        passwordValid: !validData.passwordValid,
        confirmPasswordValid: !validData.confirmPasswordValid,
      })
      setErrorsMessage()
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
                value={userSignUpData.userName}
                onChange={(event) => handleChange(event, "userName")}
                invalid={!validData.userNameValid}
              />
            </FormGroup>
            {showError.userNameValid && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> {errors.userNameError}{" "}
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
                invalid={!validData.emailValid}
                className="input-signup"
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
                value={userSignUpData.password}
                onChange={(event) => handleChange(event, "password")}
                invalid={!validData.passwordValid}
                className="input-signup"
              />
            </FormGroup>
            {showError.passwordValid && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> {errors.passwordError}{" "}
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
                invalid={!validData.confirmPasswordValid}
                className="input-signup"
              />
            </FormGroup>
            {showError.confirmPasswordValid && (
              <div className="error-message">
                {" "}
                <i className="fa fa-warning" /> {errors.confirmPasswordError}{" "}
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
