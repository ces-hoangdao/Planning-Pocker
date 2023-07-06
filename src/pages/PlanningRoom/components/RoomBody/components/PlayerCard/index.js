import React, { useContext } from "react"
import { UserContext } from "../../../../../../context/userContext"

function PlayerCard({ vote }) {
  const { user } = useContext(UserContext)

  return (
    <div className="player-card-wrapper d-flex flex-column align-items-center justify-content-center">
      <div
        className={vote.voteValue ? "player-card-voting" : "player-card-empty"}
      ></div>
      <div className="player-name-container" id={user.id}>
        {user.name}
      </div>
    </div>
  )
}

export default PlayerCard
