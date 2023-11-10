import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authContext from "../../store/authContext";
import Button from "../UI/Button/Button";

function Header() {
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    e.preventDefault();

    ctx.setUser({ user: "", token: "" });
    ctx.setMessage({ heading: "success", msg: "Logout Successfully" });
    navigate("/login");
  };
  const ctx = useContext(authContext);
  return (
    <div className={classes.header}>
      <label className={classes.logo}>Brewery Search</label>
      <nav className={classes.nav}>
        <ul>
          <li>{<NavLink to="/search">Search</NavLink>}</li>
          <li>{ctx.user && <NavLink to="/profile">Profile</NavLink>}</li>
          <li>{!ctx.user && <NavLink to="/signup">Signup</NavLink>}</li>
          <li>{!ctx.user && <NavLink to="/login">Login</NavLink>}</li>
        </ul>
      </nav>
      {ctx.user && (
        <div>
          <p>{ctx.user.fullName}</p>
          <Button
            style={{
              padding: "0.1rem",
              margin: "0.2rem 0",
              boxShadow: "0 0 0 black",
              borderRadius: "0.5rem",
            }}
            className={classes.button}
            onClick={onClickHandler}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
