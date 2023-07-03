import instance from "../apiConfig"

const getUserById = async (id) => {
  const res = await instance.get(`/user/${id}`)
  return res.data
}

export default getUserById
