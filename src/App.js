import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import LoginAsGuest from "./pages/LoginAsGuest"
import ROUTES from "./constants/routes"
import "./index.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.GUEST_PATH} element={<LoginAsGuest />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
