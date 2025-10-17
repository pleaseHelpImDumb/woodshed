import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/library">Song Library</NavLink>
      <NavLink to="/completed">Completed</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default Navigation;
