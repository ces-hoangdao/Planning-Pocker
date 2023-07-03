import React, { createContext, useState, useEffect } from "react"
import getUserById from "../api/services/userService"

export const UserContext = createContext(null)

function UserContextProvider({ children }) {
  const userId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null

  const [user, setUser] = useState({
    userId: "",
    username: "",
  })

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const res = await getUserById(userId)
        setUser({
          userId: res.data._id,
          username: res.data.name,
        })
      }
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
