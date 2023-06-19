import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import LoginAsGuest from './pages/LoginAsGuest';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="login-as-guest" element={ <LoginAsGuest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
