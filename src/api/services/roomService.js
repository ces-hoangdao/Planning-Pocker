import instance from "../apiConfig"

const createRoom = async (roomName) => {
  const res = await instance.post("/room", {
    roomName,
  })
  return res
}

export default createRoom
