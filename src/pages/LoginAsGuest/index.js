import { useState } from 'react';
import './LoginAsGuest.css';

const LoginAsGuest = () => {
  const [ guestName, setGuestName ] = useState('');
  const [ showError, setShowError ] = useState(false);

  const handleClick = () => {
    setShowError(guestName.trim() === "");
  }

  const handleInputChange = (e) => {
    setGuestName(e.target.value);
    setShowError(false);
  }
  
  return (
    <div className="login-as-guest">
      <h3 className="title">Choose your display name</h3>
      <form action="" className="form-login-as-guest">
        <input
          type="text"
          required
          className="input-guest-name"
          placeholder="Your display name"
          value={ guestName }
          onChange={ handleInputChange }
        />
        {showError && ( <div className="error-message"> <i className="fa fa-warning"></i> Please enter a display name. </div> )}
        <button className="button button--primary button-continue" onClick={ handleClick }>Continue to game</button>
        <div className="layout--flex bottom-option">
          <span className="option">Login</span>
          <span className="option">Sign Up</span>
        </div>
      </form>
    </div>
  );
};

export default LoginAsGuest;

