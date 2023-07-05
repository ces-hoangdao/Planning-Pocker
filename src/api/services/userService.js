import instance from "../apiConfig"

export const getUserById = async (id) => {
  const res = await instance.get(`/user/${id}`)
  return res.data
}

export const updateUserProfile = async (userId, displayName, photoURL) => {
  const res = await instance.patch("/user", {
    userId,
    displayName,
    photoURL,
  })
  return res.data
}
