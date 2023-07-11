import React from "react"
import IssueBlock from "../IssueBlock"

function IssueList({
  issueList,
  deleteIssue,
  emitSelectedIssue,
  selectedIssue,
  updateIssue,
}) {
  return (
    issueList && (
      <div>
        {issueList.map((issue) => (
          <IssueBlock
            key={issue.id}
            issue={issue}
            index={issueList.indexOf(issue)}
            deleteIssue={deleteIssue}
            emitSelectedIssue={emitSelectedIssue}
            selectedIssue={selectedIssue}
            updateIssue={updateIssue}
          />
        ))}
      </div>
    )
  )
}

export default IssueList
