import React, { createContext, useContext, useEffect, useState } from "react"
import SOCKET_EVENT from "../constants/socket_event"
import { SocketContext } from "./SocketContext"
import { UserContext } from "./userContext"

export const RoomContext = createContext(null)

function RoomContextProvider({ children }) {
  const [room, setRoom] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [voteAverage, setVoteAverage] = useState(null)
  const [voteCount, setVoteCount] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (room && user && room._id && user._id) {
      socket.emit(SOCKET_EVENT.USER.JOIN, {
        userId: user._id,
        username: user.name,
        roomId: room._id,
      })
    }
  }, [room, user])

  return (
    <RoomContext.Provider
      value={{
        room,
        selectedIssue,
        voteAverage,
        voteCount,
        setRoom,
        setSelectedIssue,
        setVoteCount,
        setVoteAverage,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
