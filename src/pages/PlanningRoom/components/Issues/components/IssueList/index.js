import React from "react"
import IssueBlock from "../IssueBlock"

function IssueList({ issueList, deleteIssue, emitSelectedIssue, selectedIssue }) {
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
          />
        ))}
      </div>
    )
  )
}

export default IssueList
