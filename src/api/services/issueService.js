import instance from "../apiConfig"

export const createIssue = async (issue, roomId) => {
  const res = await instance.post("/issue", {
    name: issue.name,
    room: roomId,
  })
  return res.data
}

export const deleteIssueById = async (issueId) => {
  const res = await instance.delete(`/issue/${issueId}`)
  return res.data
}

export const getIssuesInRoom = async (roomId) => {
  const res = await instance.get(`/issue/room/${roomId}`)
  return res.data
}
