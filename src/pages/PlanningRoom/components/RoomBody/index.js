import React, { useEffect, useContext, useState } from "react"
import "./RoomBody.css"
import PlayerCard from "./components/PlayerCard"
import ButtonReveal from "./components/ButtonReveal"
import { UserContext } from "../../../../context/userContext"
import { SocketContext } from "../../../../context/SocketContext"
import { RoomContext } from "../../../../context/roomContext"
import SOCKET_EVENT from "../../../../constants/socket_event"

const THIRD_USER_INDEX = 2
const FORTH_USER_INDEX = 3

function RoomBody({ isRevealed }) {
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { users, setUsers } = useContext(RoomContext)

  const [isRevealable, setRevealable] = useState(false)

  const topUserList = users.filter(
    (_user, index) => index % 2 !== 0 && index !== FORTH_USER_INDEX
  )

  const bottomUserList = users.filter(
    (_user, index) => index % 2 === 0 && index !== THIRD_USER_INDEX
  )

  useEffect(() => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].vote) {
        setRevealable(true)
        return
      }
    }
    setRevealable(false)
  }, [users])

  useEffect(() => {
    socket.on(SOCKET_EVENT.USER.JOIN, (_user) => {
      setUsers((current) => [...current, _user])
    })
    socket.on(SOCKET_EVENT.USER.LEAVE, ({ userId }) => {
      setUsers((current) => current.filter((_user) => _user.userId !== userId))
    })
    socket.on(SOCKET_EVENT.USER.VOTE, ({ userId, voteValue }) => {
      setUsers((current) =>
        current.map((_user) => {
          if (_user.userId === userId) return { ..._user, vote: voteValue }
          return _user
        })
      )
    })
    socket.on(SOCKET_EVENT.USER.NAME_CHANGE, ({ userId, name }) => {
      setUsers((current) =>
        current.map((_user) => {
          if (_user.userId === userId) return { ..._user, username: name }
          return _user
        })
      )
    })
  }, [])

  const handleReveal = () => {
    socket.emit(SOCKET_EVENT.ROOM.REVEAL)
  }

  return (
    <div className="room-body top-50 start-50 translate-middle d-flex position-absolute justify-content-center">
      <div className="table-module-wrapper d-flex align-items-center justify-content-center">
        <div className="table-module-container d-inline-grid ">
          <div className="table-module-top d-flex align-items-center justify-content-center">
            {topUserList.map((_user) => (
              <PlayerCard
                userVoting={_user}
                key={_user.userId}
                isMainPlayer={user._id === _user.userId}
                isRevealed={isRevealed}
              />
            ))}
          </div>
          <div className="table-module-left d-flex align-items-center justify-content-center">
            {users[THIRD_USER_INDEX] && (
              <PlayerCard
                userVoting={users[THIRD_USER_INDEX]}
                isMainPlayer={user._id === users[THIRD_USER_INDEX].userId}
                isRevealed={isRevealed}
              />
            )}
          </div>
          <div className="table-module-right d-flex align-items-center justify-content-center">
            {users[FORTH_USER_INDEX] && (
              <PlayerCard
                userVoting={users[FORTH_USER_INDEX]}
                isMainPlayer={user._id === users[FORTH_USER_INDEX].userId}
                isRevealed={isRevealed}
              />
            )}
          </div>
          <div className="table-module-bottom d-flex align-items-center justify-content-center">
            {bottomUserList.map((_user) => (
              <PlayerCard
                userVoting={_user}
                key={_user.userId}
                isMainPlayer={user._id === _user.userId}
                isRevealed={isRevealed}
              />
            ))}
          </div>
          <div className="table-module-center d-flex flex-column align-items-center justify-content-center">
            <ButtonReveal isRevealable={isRevealable} handleReveal={handleReveal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBody
