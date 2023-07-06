import React, { createContext, useContext, useEffect, useState } from "react"
import {
  createIssue,
  getIssuesInRoom,
  deleteIssueById,
} from "../api/services/issueService"
import { RoomContext } from "./roomContext"
import { SocketContext } from "./SocketContext"
import SOCKET_EVENT from "../constants/socket_event"
import { toastUnknownError } from "../utils/ToastUtils"

export const IssueContext = createContext(null)

function IssueContextProvider({ children }) {
  const { room, setSelectedIssue } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)

  const [issueList, setIssueList] = useState([])

  useEffect(() => {
    socket.on(SOCKET_EVENT.ISSUE.NEW, (issue) => {
      onAddIssue(issue)
    })
    socket.on(SOCKET_EVENT.ISSUE.REMOVE, (issue) => {
      onDeleteIssue(issue)
    })
    socket.on(SOCKET_EVENT.ISSUE.SELECT, (issue) => {
      setSelectedIssue(issue)
    })
  }, [])

  useEffect(() => {
    if (room && room._id) {
      loadIssues()
    }
  }, [room])

  const onAddIssue = (issue) => {
    setIssueList((prevList) => [...prevList, issue])
    setSelectedIssue(issue)
  }

  const onDeleteIssue = (issue) => {
    setSelectedIssue((oldSelectedIssue) =>
      oldSelectedIssue._id === issue._id ? null : oldSelectedIssue
    )
    setIssueList((oldIssueList) =>
      oldIssueList.filter((_issue) => _issue._id !== issue._id)
    )
  }

  const addIssue = async (issueAdd) => {
    try {
      const res = await createIssue(issueAdd, room._id)
      const newIssue = res.data
      onAddIssue(newIssue)
      socket.emit(SOCKET_EVENT.ISSUE.NEW, newIssue)
    } catch {
      toastUnknownError()
    }
  }

  const deleteIssue = async (issueDelete) => {
    try {
      const res = await deleteIssueById(issueDelete._id)
      if (res.success) {
        onDeleteIssue(issueDelete)
        socket.emit(SOCKET_EVENT.ISSUE.REMOVE, issueDelete)
      }
    } catch {
      toastUnknownError()
    }
  }

  const loadIssues = async () => {
    try {
      const res = await getIssuesInRoom(room._id)
      if (res.success) {
        setIssueList(res.data)
      }
    } catch {
      toastUnknownError()
    }
  }

  const emitSelectedIssue = (issue) => {
    setSelectedIssue(issue)
    socket.emit(SOCKET_EVENT.ISSUE.SELECT, issue)
  }

  return (
    <IssueContext.Provider
      value={{ issueList, deleteIssue, addIssue, emitSelectedIssue }}
    >
      {children}
    </IssueContext.Provider>
  )
}

export default IssueContextProvider
