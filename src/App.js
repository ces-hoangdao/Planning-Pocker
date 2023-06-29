import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, Zoom } from "react-toastify"
import LoginAsGuest from "./pages/LoginAsGuest"
import RoomHeader from "./pages/RoomHeader"
import NewGame from "./pages/NewGame"
import ROUTES from "./constants/routes"
import "./index.css"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.GUEST_PATH} element={<LoginAsGuest />} />
          <Route path={ROUTES.ROOM_PATH} element={<RoomHeader />} />
          <Route path={ROUTES.HOME_PATH} element={<Home />} />
          <Route path={ROUTES.NEW_GAME_PATH} element={<NewGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
