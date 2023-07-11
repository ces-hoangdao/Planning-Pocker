import React, { useContext, useState } from "react"
import { Offcanvas, OffcanvasBody, Button, OffcanvasHeader } from "reactstrap"
import IssueInput from "./components/IssueInput"
import IssueList from "./components/IssueList"
import { IssueContext } from "../../../../context/issueContext"
import "./Issue.css"
import { RoomContext } from "../../../../context/roomContext"

function Issues({ isOpen, toggleOffCanvas }) {
  const [isAddingIssue, setIsAddingIssue] = useState(false)

  const { issueList, deleteIssue, emitSelectedIssue, addIssue, updateIssue } =
    useContext(IssueContext)
  const { selectedIssue } = useContext(RoomContext)

  const closeAddingIssue = () => setIsAddingIssue(false)

  return (
    <Offcanvas
      backdrop={false}
      direction="end"
      isOpen={isOpen}
      toggle={toggleOffCanvas}
      className="canvas-issue"
    >
      <OffcanvasHeader toggle={toggleOffCanvas}>Issues</OffcanvasHeader>
      <OffcanvasBody>
        <IssueList
          issueList={issueList}
          deleteIssue={deleteIssue}
          emitSelectedIssue={emitSelectedIssue}
          selectedIssue={selectedIssue}
          updateIssue={updateIssue}
        />
        {isAddingIssue ? (
          <IssueInput closeAddingIssue={closeAddingIssue} addIssue={addIssue} />
        ) : (
          <Button
            block
            color="primary"
            outline
            className="option-button"
            onClick={() => setIsAddingIssue(true)}
          >
            <i className="fa fa-plus" /> Add an issue
          </Button>
        )}
      </OffcanvasBody>
    </Offcanvas>
  )
}

export default Issues
