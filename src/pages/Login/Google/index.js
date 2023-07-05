import React, { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { useParams, Navigate } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"
import { UserContext } from "../../../context/userContext"
import { getUserById } from "../../../api/services/userService"

function GoogleLogin() {
  const { setUser } = useContext(UserContext)
  const { id } = useParams()

  useEffect(() => {
    localStorage.setItem("userId", id)
    const getUser = async () => {
      if (id) {
        const res = await getUserById(id)
        setUser(res.data)
      }
    }
    getUser()
    toast.success("Login success!")
  }, [])

  return <Navigate to={ROUTES.NEW_GAME_PATH} />
}

export default GoogleLogin
