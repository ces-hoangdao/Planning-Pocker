import React, { useState, useContext, useEffect } from "react"
import {
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ROUTES } from "../../constants/routes"
import { updateUserProfile } from "../../api/services/userService"
import { UserContext } from "../../context/userContext"
import { SocketContext } from "../../context/SocketContext"
import { RoomContext } from "../../context/roomContext"
import defaultUserPhoto from "../../assets/user_photo.png"
import SOCKET_EVENT from "../../constants/socket_event"
import { USER_NAME_LIMIT } from "../../constants/authConst"
import { USERNAME_LENGTH_EXCEEDS_ERROR } from "../../constants/errorMessage"
import "./ChangeProfile.css"
import SpecMode from "../SpecMode"

function ChangeProfile() {
  const { user, setUser } = useContext(UserContext)
  const roomContext = useContext(RoomContext)
  const { socket } = useContext(SocketContext)

  const [errorMessage, setErrorMessage] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photo, setPhoto] = useState("")
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const toggle = () => setModal(!modal)

  const handleInputChange = (event) => {
    setDisplayName(event.target.value)
    setErrorMessage(
      event.target.value.length >= USER_NAME_LIMIT
        ? USERNAME_LENGTH_EXCEEDS_ERROR
        : ""
    )
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Encoded = reader.result.toString()
      setPhoto(base64Encoded)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (event) => {
    event.preventDefault()
    try {
      const res = await updateUserProfile(user._id, displayName, photo)
      if (res.success) {
        setUser(res.data)
        socket.emit(SOCKET_EVENT.USER.NAME_CHANGE, { name: displayName })
        toggle()
      }
    } catch {
      toast.error("Failed to update your profile!")
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("userId")
    setUser({})
    navigate(ROUTES.HOME_PATH)
  }

  useEffect(() => {
    if (user) {
      setDisplayName(user.name)
      setPhoto(user.photoURL)
    }
  }, [user])

  return (
    <div className="change-profile">
      <DropdownMenu className="border-0 mt-3">
        <DropdownItem className="item" onClick={toggle}>
          <i className="fa fa-user" />
          Change profile
        </DropdownItem>
        <DropdownItem divider />
        {roomContext && (
          <>
            <SpecMode />
            <DropdownItem divider />
          </>
        )}
        <DropdownItem className="item" onClick={handleSignOut}>
          <i className="fa fa-sign-out" />
          Sign out
        </DropdownItem>
      </DropdownMenu>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className="modal-change-profile"
      >
        <ModalHeader toggle={toggle} className="modal-title border-0">
          Change your information
        </ModalHeader>
        <ModalBody>
          <Form className="form-change-profile" onSubmit={handleSave}>
            <FormGroup>
              <div className="d-flex align-items-center">
                <img src={photo || defaultUserPhoto} alt="" className="photo" />
                <Label for="input-file" className="label-upload-photo">
                  Upload photo
                </Label>
                <Input
                  type="file"
                  id="input-file"
                  name="input-file"
                  onChange={handleAvatarChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="input-display-name" hidden>
                Your display name
              </Label>
              <Input
                id="input-display-name"
                name="input-display-name"
                value={displayName}
                type="text"
                maxLength={USER_NAME_LIMIT}
                className="input-display-name"
                onChange={handleInputChange}
              />
              {errorMessage && (
                <div className="error-message">
                  <i className="fa fa-warning" /> {errorMessage}
                </div>
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="border-0">
          <Button block color="primary" className="btn-save" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ChangeProfile
