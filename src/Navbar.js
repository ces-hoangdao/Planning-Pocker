import { Link, useMatch, useResolvedPath } from "react-router-dom";
import ces from "./assets/ces.png";
import google_icon from "./assets/google_icon.png";
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="title_container">
        <img src={ces} alt="ces" className="ces_logo" />
        <div className="site-title">Planning Poker</div>
      </Link>
      <div className="btn_container">
        <div className="login_btn_container">
          <button className="login_btn">
            <CustomLink to="/login" className="login_btn_content">
              Login with
            </CustomLink>
            <div className="google_icon_container">
                <img
                  src={google_icon}
                  className="google_icon"
                  alt="google_icon"
                />
              </div>
          </button>
        </div>
        <div className="guest_btn_container">
          <button className="guest_btn">
            <CustomLink to="/guest" className="login_btn_content">
              Guest?
            </CustomLink>
          </button>
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
