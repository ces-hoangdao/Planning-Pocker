import React, { useState } from "react"
import { Form, Input } from "reactstrap"
import "./IssueInput.css"

function IssueInput({ closeAddingIssue, addIssue }) {
  const [issueName, setIssueName] = useState("")

  const handleAddIssue = () => {
    addIssue({ name: issueName })
    closeAddingIssue()
  }
  return (
    <Form
      onSubmit={handleAddIssue}
      className="d-flex justify-content-center flex-column"
    >
      <Input
        type="textarea"
        className="issue-input"
        placeholder="Enter a title for the issue"
        autoFocus
        value={issueName}
        onChange={(e) => setIssueName(e.target.value)}
      />
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="w-50 me-3 btn-cancel"
          onClick={closeAddingIssue}
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-50 ms-3 btn-save"
          onClick={handleAddIssue}
        >
          Save
        </button>
      </div>
    </Form>
  )
}

export default IssueInput
