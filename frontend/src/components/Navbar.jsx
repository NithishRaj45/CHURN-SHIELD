import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🛡️ ChurnShield
      </div>

      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/predict"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Predict
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          History
        </NavLink>

        <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "active-link" : ""
  }
>
  Dashboard
</NavLink>

      </div>

    </nav>
  );
}

export default Navbar;