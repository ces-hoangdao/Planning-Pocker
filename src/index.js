import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.css"
import SocketContextProvider from "./context/SocketContext"
import App from "./App"
import UserContextProvider from "./context/userContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
