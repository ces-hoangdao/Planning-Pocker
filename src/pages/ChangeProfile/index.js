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
import defaultUserPhoto from "../../assets/user_photo.png"
import "./ChangeProfile.css"

function ChangeProfile() {
  const { user, setUser } = useContext(UserContext)
  const [displayName, setDisplayName] = useState("")
  const [photo, setPhoto] = useState("")
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const toggle = () => setModal(!modal)

  const handleInputChange = (event) => {
    setDisplayName(event.target.value)
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
        toggle()
      }
    } catch {
      toast.error("Failed to update your profile!")
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("userId")
    navigate(ROUTES.HOME_PATH)
  }

  useEffect(() => {
    setDisplayName(user.name)
    setPhoto(user.photoURL)
  }, [user])

  return (
    <div className="change-profile">
      <DropdownMenu>
        <DropdownItem className="item" onClick={toggle}>
          <i className="fa fa-user" />
          Change profile
        </DropdownItem>
        <DropdownItem divider />
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
        <ModalHeader toggle={toggle} className="modal-title">
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
                className="input-display-name"
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="change-profile-footer">
          <Button block color="primary" className="btn-save" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ChangeProfile
