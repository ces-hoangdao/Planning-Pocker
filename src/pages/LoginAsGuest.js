import "../css/LoginAsGuest.css";

const LoginAsGuest = () => {
  return (
    <div className="login-as-guest">
      <h3 className="title">Choose your display name</h3>
      <form action="" className="form-login-as-guest">
        <input
          type="text"
          className="input-guest-name"
          placeholder="Your display name"
          required
        />
        <div className="spectator-mode">
          <div class="btn-spectator-mode">
            <input
              type="checkbox"
              className="input-spectator-mode"
              id="input-spectator-mode"
            />
            <label
              htmlFor="input-spectator-mode"
              className="label-spectator-mode"
            >
              <div class="spin-spectator-mode"></div>
            </label>
          </div>
          <label className="label-join-as-spectator">Join as spectator</label>
        </div>
        <button className="btn-continue">Continue to game</button>
        <div className="bottom-option">
          <span className="option-login">Login</span>
          <span className="option-signup">Sign Up</span>
        </div>
      </form>
    </div>
  );
};

export default LoginAsGuest;
