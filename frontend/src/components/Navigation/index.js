import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="session-links">
        <LoginFormModal />
        <NavLink className="signup-button" to="/signup">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <div className="nav-container">
      <NavLink className="home-button" exact to="/">
        Home
      </NavLink>
      <input className="search-bar"></input>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
