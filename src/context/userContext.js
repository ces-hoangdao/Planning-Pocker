import React, { createContext, useState, useEffect } from "react"
import { getUserById } from "../api/services/userService"

export const UserContext = createContext(null)

function UserContextProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem("userId")
      if (userId) {
        const res = await getUserById(userId)
        setUser(res.data)
      }
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
