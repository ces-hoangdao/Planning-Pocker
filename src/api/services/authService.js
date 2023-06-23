import instance from "../apiConfig"

const guestLogin = async (username) => {
  const res = await instance.post("/auth/guest/login", {
    username,
  })
  return res.data
}

export default guestLogin
