import React, { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"
import { UserContext } from "../../../context/userContext"
import getUserById from "../../../api/services/userService"

function GoogleLogin() {
  const { setUser } = useContext(UserContext)
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("userId", id)
    const getUser = async () => {
      if (id) {
        const res = await getUserById(id)
        setUser(res.data)
      }
    }
    getUser()
    navigate(ROUTES.NEW_GAME_PATH)
    toast.success("Login success!")
  }, [])

  return <div> </div>
}

export default GoogleLogin
