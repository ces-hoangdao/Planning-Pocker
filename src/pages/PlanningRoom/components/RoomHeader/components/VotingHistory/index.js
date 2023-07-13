import React, { useContext, useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap"
import { getVotingHistory } from "../../../../../../api/services/roomService"
import { RoomContext } from "../../../../../../context/roomContext"
import "./VotingHistory.css"

function VotingHistory({ modalHistory, toggleModalHistory }) {
  const { room } = useContext(RoomContext)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (room) {
      getHistory()
    }
  }, [room])

  const getHistory = async () => {
    const res = await getVotingHistory(room._id)
    setHistory(res.data)
  }

  return (
    <Modal
      className="history-modal"
      isOpen={modalHistory}
      toggle={toggleModalHistory}
      centered
    >
      <ModalHeader toggle={toggleModalHistory}>Voting history</ModalHeader>
      <ModalBody>
        <Table className="history-modal__body-table">
          <thead className="history-modal__body-header table-secondary">
            <tr>
              <th>Issue name</th>
              <th>Result</th>
              <th>Date</th>
              <th>Vote/total</th>
              <th>Player results</th>
            </tr>
          </thead>
          <tbody className="history-table-body">
            {history.map((vote) => {
              const date = new Date(vote.date)
              const showDate = date.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
                hourCycle: "h24",
              })
              return (
                <tr>
                  <th>{vote.issueName}</th>
                  <td>{vote.results}</td>
                  <td>{showDate}</td>
                  <td>{vote.voteOnTotal}</td>
                  <td>{vote.playerResults}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  )
}

export default VotingHistory
