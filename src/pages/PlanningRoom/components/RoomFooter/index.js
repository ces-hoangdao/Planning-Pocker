import React, { useState } from "react"
import { Button } from "reactstrap"
import iconHandDown from "../../../../assets/icon_hand_down.png"
import "./RoomFooter.css"

function RoomFooter(props) {
  const { votingSystem } = props
  const [pickedCard, setPickedCard] = useState()

  const handlePickCard = (card) => {
    setPickedCard(card !== pickedCard ? card : "")
  }

  return (
    <div className="position-absolute d-flex flex-column room__footer">
      <div className="choose-your-card">
        <span>Choose your card below</span>
        <img src={iconHandDown} alt="" className="icon-hand-down" />
      </div>
      <div className="card-lists-container">
        <ul className="d-flex justify-content-evenly align-items-center card-lists">
          {votingSystem.map((card) => (
            <li className="card-item" key={card}>
              <Button
                color="primary"
                outline
                className={
                  pickedCard === card ? "card-button--picked" : "card-button"
                }
                onClick={() => handlePickCard(card)}
              >
                {card === "coffee" ? (
                  <i className="fa fa-coffee" />
                ) : (
                  <span>{card}</span>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RoomFooter
