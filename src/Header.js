import "./index.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <div className="Header">
      <header className="nav">
        <h1>LATEST DEV.to POSTS</h1>
        <div className="nav_right">
          <div className="btn_home">
            <NavLink to="/">HOME 🏠</NavLink>
          </div>
          <div className="btn_about">
            <NavLink to="/About">ABOUT 👨‍💻</NavLink>
          </div>
          <button className="switch-button" onClick={props.handleThemeChange}>
            Switch to {props.theme === "light" ? "🫥" : "💡"} Theme
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
