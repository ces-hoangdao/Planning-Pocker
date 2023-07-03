import React, { useContext, useState } from "react"
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import "./IssueBlock.css"
import { RoomContext } from "../../../../../../context/roomContext"
import { IssueContext } from "../../../../../../context/issueContext"

function IssueBlock({ issue, index }) {
  const [modal, setModal] = useState(false)

  const { selectedIssue, setSelectedIssue } = useContext(RoomContext)
  const { deleteIssue } = useContext(IssueContext)

  const handleConfirmDelete = () => {
    setModal(false)
    deleteIssue(issue)
  }
  return (
    <>
      <Card body className="my-2">
        <CardTitle tag="h6" className="d-flex justify-content-between">
          <span>PP-{index}</span>
          <button
            type="button"
            className="border-0 bg-white"
            onClick={() => setModal(true)}
          >
            <i className="fa-solid fa-trash trash-icon" />
          </button>
        </CardTitle>
        <CardText className="card-text">{issue.name}</CardText>
        <div className="d-flex justify-content-between">
          {selectedIssue && selectedIssue._id === issue._id ? (
            <Button
              className="btn-voting border-0 bg-primary w-50"
              onClick={() => setSelectedIssue(null)}
            >
              Voting now...
            </Button>
          ) : (
            <Button
              className="btn-vote bg-transparent w-50"
              onClick={() => setSelectedIssue(issue)}
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
        <ModalBody className="fs-4 ">This operation is irreversible.</ModalBody>
        <ModalFooter className="d-flex justify-content-between align-content-center">
          <Button
            color="secondary"
            className="me-5 flex-fill"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button className="bg-danger ms-5 flex-fill" onClick={handleConfirmDelete}>
            Delete issue
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default IssueBlock
