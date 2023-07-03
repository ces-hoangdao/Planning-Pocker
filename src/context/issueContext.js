import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
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

  const addIssue = async (issueAdd) => {
    try {
      const res = await createIssue(issueAdd, room._id)
      socket.emit(SOCKET_EVENT.ISSUE.NEW, res.data)
    } catch {
      toastUnknownError()
    }
  }

  const deleteIssue = async (issueDelete) => {
    try {
      const res = await deleteIssueById(issueDelete._id)
      if (res.success) {
        const newIssueList = issueList.filter(
          (issue) => issue._id !== issueDelete._id
        )
        setIssueList(newIssueList)
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

  useEffect(() => {
    socket.on(SOCKET_EVENT.ISSUE.NEW, (issue) => {
      const newIssueList = [...issueList, issue]
      setIssueList(newIssueList)
      setSelectedIssue(issue)
    })
  }, [])

  useEffect(() => {
    if (room._id) loadIssues()
  }, [room])

  const args = useMemo(
    () => ({ issueList, deleteIssue, addIssue }),
    [issueList, deleteIssue, addIssue]
  )
  return <IssueContext.Provider value={args}>{children}</IssueContext.Provider>
}

export default IssueContextProvider
