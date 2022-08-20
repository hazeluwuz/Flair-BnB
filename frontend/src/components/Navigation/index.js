import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import ProfileButton from "./ProfileButton";
import SignupFormModal from "../SignupFormModal";
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
        <SignupFormModal />
        {/* <NavLink className="signup-button" to="/signup">
          Sign Up
        </NavLink> */}
      </div>
    );
  }

  return (
    <div className="nav-container">
      <div className="nav-bar">
        <NavLink className="home-button" exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
