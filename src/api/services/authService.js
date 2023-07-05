import instance from "../apiConfig"

export const guestLogin = async (username) => {
  const res = await instance.post("/auth/guest/login", {
    username,
  })
  return res.data
}

export const signUp = async (username, email, password) => {
  await instance.post("/auth/signup", {
    username,
    email,
    password,
  })
}

export const login = async (email, password) => {
  const res = await instance.post("/auth/email/login", {
    email,
    password,
  })
  return res.data
}
