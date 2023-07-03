import React, { useEffect } from "react"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"

function GoogleLogin() {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem("userId", id)
    navigate(ROUTES.NEW_GAME_PATH)
    toast.success("Login success!")
  }, [])
  return <div> </div>
}

export default GoogleLogin
