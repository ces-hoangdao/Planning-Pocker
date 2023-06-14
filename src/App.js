import Navbar from "./Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Guest from "./pages/Guest"
import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
