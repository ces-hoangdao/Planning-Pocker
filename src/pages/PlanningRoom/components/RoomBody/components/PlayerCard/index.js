import React, { useEffect, useState } from "react"

function PlayerCard({ userVoting, isMainPlayer }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(userVoting)
  }, [userVoting])

  return (
    user && (
      <div
        className="player-card-wrapper d-flex flex-column align-items-center justify-content-center"
        key={user.id}
      >
        <div
          className={`${
            user.vote ? "player-card-voting" : "player-card-empty"
          } d-flex align-items-center justify-content-center h3`}
        >
          {isMainPlayer ? "You" : ""}
        </div>
        <div className="player-name-container">{user.username}</div>
      </div>
    )
  )
}

export default PlayerCard
