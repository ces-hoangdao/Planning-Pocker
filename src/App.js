import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginAsGuest from "./pages/LoginAsGuest"
import RoomHeader from "./pages/RoomHeader"
import NewGame from "./pages/NewGame"
import ROUTES from "./constants/routes"
import "./index.css"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
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
