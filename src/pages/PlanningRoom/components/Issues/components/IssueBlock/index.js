import React, { useState } from "react"
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Form,
} from "reactstrap"
import "./IssueBlock.css"

function IssueBlock({
  issue,
  index,
  selectedIssue,
  emitSelectedIssue,
  deleteIssue,
  updateIssue,
}) {
  const [modal, setModal] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [editing, setEditing] = useState(false)
  const [newIssueName, setNewIssueName] = useState(issue.name)

  const toggle = () => setDropdown((prev) => !prev)

  const handleConfirmDelete = () => {
    setModal(false)
    deleteIssue(issue)
  }

  const handleUpdateIssue = () => {
    setEditing(false)
    if (newIssueName.length > 0) {
      updateIssue({ _id: issue._id, name: newIssueName })
    }
  }

  const handleCancelEdit = () => {
    setEditing(false)
  }

  return (
    <>
      <Card body className="my-2">
        <CardTitle tag="h5" className="d-flex justify-content-between">
          PP-{index}
          <Dropdown isOpen={dropdown} toggle={toggle}>
            <DropdownToggle className="dot-menu">
              <i className="fa-solid fa-ellipsis-vertical fa-rotate-90" />
            </DropdownToggle>
            <DropdownMenu className="menu">
              <DropdownItem className="menu-option" onClick={() => setEditing(true)}>
                <i className="fa-solid fa-pencil edit-icon" />
                <span className="option-text">Edit</span>
              </DropdownItem>
              <DropdownItem className="menu-option" onClick={() => setModal(true)}>
                <i className="fa-solid fa-trash trash-icon" />
                <span className="option-text">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardTitle>
        <CardText className="card-text">{issue.name}</CardText>
        <div className="d-flex justify-content-between">
          {selectedIssue && selectedIssue._id === issue._id ? (
            <Button
              id="vote"
              className="btn-voting border-0 w-50"
              onClick={() => emitSelectedIssue(null)}
            >
              Voting now...
            </Button>
          ) : (
            <Button
              id="vote"
              className="btn-vote bg-transparent w-50"
              onClick={() => emitSelectedIssue(issue)}
            >
              Vote this issue
            </Button>
          )}
        </div>
      </Card>
      <Modal isOpen={modal} centered>
        <h2 className="align-self-center">
          Are you sure you want to delete this issue?
        </h2>
        <ModalBody className="fs-4">This operation is irreversible.</ModalBody>
        <ModalFooter className="d-flex justify-content-between align-content-center">
          <Button
            size="lg"
            color="secondary"
            className="me-5 flex-fill"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="bg-danger border-0 ms-5 flex-fill"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editing} centered>
        <Form
          onSubmit={handleUpdateIssue}
          className="d-flex justify-content-center flex-column mb-1"
        >
          <Input
            type="textarea"
            className="issue-edit"
            placeholder="Enter a title for the issue"
            autoFocus
            value={newIssueName}
            onChange={(e) => setNewIssueName(e.target.value)}
          />
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              id="cancel"
              className="w-50 me-3 btn-cancel"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-50 ms-3 btn-save"
              onClick={handleUpdateIssue}
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default IssueBlock
