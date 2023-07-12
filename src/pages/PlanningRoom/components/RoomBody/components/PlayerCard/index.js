import React, { useEffect, useState } from "react"

function PlayerCard({ userVoting, isMainPlayer, isRevealed }) {
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
        {isRevealed ? (
          <div
            className={`${
              user.vote ? "player-card-revealed" : "player-card-empty"
            } d-flex align-items-center justify-content-center h3`}
          >
            {isRevealed ? user.vote : ""}
          </div>
        ) : (
          <div
            className={user.vote ? "player-card-voting" : "player-card-empty"}
          ></div>
        )}
        <div className="player-name-container">
          {user.username} {isMainPlayer ? " (You)" : ""}{" "}
        </div>
      </div>
    )
  )
}

export default PlayerCard
